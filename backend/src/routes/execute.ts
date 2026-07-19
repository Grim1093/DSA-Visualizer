import { Router } from 'express';
import crypto from 'crypto';
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

  const fileId = crypto.randomUUID();
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
      runCommand = `python3 ${runDir}/${fileName}`;
      break;
    case 'javascript':
      fileName = `main.js`;
      runCommand = `node ${runDir}/${fileName}`;
      break;
    case 'cpp':
      fileName = `main.cpp`;
      runCommand = `g++ ${runDir}/${fileName} -o ${runDir}/out && ${runDir}/out`;
      break;
    case 'java':
      fileName = `Main.java`;
      runCommand = `javac ${runDir}/${fileName} && cd ${runDir} && java Main`;
      break;
    case 'go':
      fileName = `main.go`;
      runCommand = `cd ${runDir} && go run ${fileName}`;
      break;
    case 'kotlin':
      fileName = `main.kt`;
      runCommand = `kotlinc ${runDir}/${fileName} -d ${runDir}/main.jar && java -cp ${runDir}/main.jar:/opt/kotlinc/lib/kotlin-stdlib.jar MainKt`;
      break;
    default:
      fs.rmSync(runDir, { recursive: true, force: true });
      return res.status(400).json({ error: 'Unsupported language.' });
  }

  const filePath = path.join(runDir, fileName);

  try {
    // 1. Write the code to the temporary file
    fs.writeFileSync(filePath, code);

    // 2. Execute the command directly on the host (with timeout)
    const { stdout, stderr } = await execPromise(`timeout 10 sh -c "${runCommand}"`, { timeout: 15000 });

    res.json({ output: stdout, error: stderr });
  } catch (error: any) {
    if (error.killed || error.code === 124 || error.code === 143) { // 124/143 are timeout codes
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
