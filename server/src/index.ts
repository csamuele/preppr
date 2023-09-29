import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});