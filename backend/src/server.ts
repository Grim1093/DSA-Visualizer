import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import executeRouter from './routes/execute';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/execute', executeRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'DSA Visualizer Execution Engine is running.' });
});

app.listen(PORT, () => {
  console.log(`Execution Engine running on http://localhost:${PORT}`);
});
