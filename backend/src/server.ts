import express from "express";
import type {Request, Response} from "express";
import cors from 'cors';
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json()); // Allows your server to parse incoming JSON data

// 1. GET ROUTE: Fetches all visitors from PostgreSQL
app.get('/api/visitors', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM visitors ORDER BY checked_in_at DESC;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 2. POST ROUTE: Adds a new visitor to PostgreSQL
app.post('/api/visitors', async (req: Request, res: Response) => {
  const { name, email, purpose } = req.body;
  try {
    const result = await pool.query(
      // PGSQL Parameterized ($1,$2..) to prevent SQL injection; RETURNING * returns the value inserted
      'INSERT INTO visitors (name, email, purpose) VALUES ($1, $2, $3) RETURNING *;',
      [name, email, purpose]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

const PORT = process.env.PORT ?? 5001; // falls back to 5001 if no PORT env var is set at runtime
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
