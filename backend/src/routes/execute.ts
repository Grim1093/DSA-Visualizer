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
  language: 'python' | 'javascript' | 'cpp';
}

router.post('/', async (req, res) => {
  const { code, language } = req.body as ExecuteRequest;

  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required.' });
  }

  const fileId = uuidv4();
  let fileName = '';
  let dockerImage = '';
  let runCommand = '';

  // Setup based on language
  switch (language) {
    case 'python':
      fileName = `${fileId}.py`;
      dockerImage = 'python:3.9-slim';
      runCommand = `python /app/${fileName}`;
      break;
    case 'javascript':
      fileName = `${fileId}.js`;
      dockerImage = 'node:18-alpine';
      runCommand = `node /app/${fileName}`;
      break;
    case 'cpp':
      fileName = `${fileId}.cpp`;
      dockerImage = 'gcc:latest';
      // Compile and run for C++
      runCommand = `g++ /app/${fileName} -o /app/out && /app/out`;
      break;
    default:
      return res.status(400).json({ error: 'Unsupported language.' });
  }

  const filePath = path.join(TEMP_DIR, fileName);

  try {
    // 1. Write the code to a temporary file
    fs.writeFileSync(filePath, code);

    // 2. Build the Docker run command
    // --rm: Remove container after it exits
    // -v: Mount the temp directory to /app in the container
    // --network none: Disable network access for security
    // --memory: Limit memory
    const dockerCmd = `docker run --rm -v "${TEMP_DIR}:/app" --network none --memory 256m ${dockerImage} sh -c "${runCommand}"`;

    // 3. Execute the command (timeout after 10 seconds to prevent infinite loops)
    const { stdout, stderr } = await execPromise(dockerCmd, { timeout: 10000 });

    res.json({ output: stdout, error: stderr });
  } catch (error: any) {
    // Check if it was a timeout
    if (error.killed) {
      res.json({ output: '', error: 'Execution Timed Out (Limit: 10s)' });
    } else {
      res.json({ output: error.stdout || '', error: error.stderr || error.message });
    }
  } finally {
    // 4. Cleanup the temporary file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    // Also cleanup C++ out file if it exists
    if (language === 'cpp') {
      const outPath = path.join(TEMP_DIR, 'out');
      if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    }
  }
});

export default router;
