import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const router = Router();

const TEMP_DIR = path.join(__dirname, '../../temp');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

interface ExecuteRequest {
  code: string;
  language: 'python' | 'javascript' | 'cpp' | 'java' | 'go' | 'kotlin';
}

router.post('/', async (req, res) => {
  const { code, language } = req.body as ExecuteRequest;

  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required.' });
  }

  const fileId = uuidv4();
  // Create an isolated directory for this execution to prevent concurrency issues
  const runDir = path.join(TEMP_DIR, fileId);
  fs.mkdirSync(runDir, { recursive: true });

  let fileName = '';
  let dockerImage = '';
  let runCommand = '';

  // Setup based on language
  switch (language) {
    case 'python':
      fileName = `main.py`;
      dockerImage = 'python:3.9-slim';
      runCommand = `python /app/${fileName}`;
      break;
    case 'javascript':
      fileName = `main.js`;
      dockerImage = 'node:18-alpine';
      runCommand = `node /app/${fileName}`;
      break;
    case 'cpp':
      fileName = `main.cpp`;
      dockerImage = 'gcc:latest';
      runCommand = `g++ /app/${fileName} -o /app/out && /app/out`;
      break;
    case 'java':
      fileName = `Main.java`;
      dockerImage = 'eclipse-temurin:17-jdk';
      runCommand = `javac /app/${fileName} && java -cp /app Main`;
      break;
    case 'go':
      fileName = `main.go`;
      dockerImage = 'golang:latest';
      runCommand = `cd /app && go run ${fileName}`;
      break;
    case 'kotlin':
      fileName = `main.kt`;
      dockerImage = 'zenika/kotlin:latest';
      runCommand = `kotlinc /app/${fileName} -d /app/main.jar && java -cp /app/main.jar:/usr/lib/kotlinc/lib/kotlin-stdlib.jar MainKt`;
      break;
    default:
      fs.rmSync(runDir, { recursive: true, force: true });
      return res.status(400).json({ error: 'Unsupported language.' });
  }

  const filePath = path.join(runDir, fileName);

  try {
    // 1. Write the code to the temporary file
    fs.writeFileSync(filePath, code);

    // 2. Build the Docker run command
    // We put "timeout 20" inside the container so infinite loops die quickly, 
    // but the node timeout is longer to allow docker to pull the image if it's not downloaded yet.
    // Memory bumped to 512m because the Kotlin compiler is a heavy JVM process.
    const dockerCmd = `docker run --rm -v "${runDir}:/app" --network none --memory 512m ${dockerImage} timeout 20 sh -c "${runCommand}"`;

    // 3. Execute the command
    const { stdout, stderr } = await execPromise(dockerCmd, { timeout: 120000 });

    res.json({ output: stdout, error: stderr });
  } catch (error: any) {
    if (error.killed || error.code === 124) { // 124 is the exit code for 'timeout' command in linux
      res.json({ output: '', error: 'Execution Timed Out (Limit: 10s)' });
    } else {
      res.json({ output: error.stdout || '', error: error.stderr || error.message });
    }
  } finally {
    // 4. Cleanup the temporary directory entirely
    if (fs.existsSync(runDir)) {
      fs.rmSync(runDir, { recursive: true, force: true });
    }
  }
});

export default router;
