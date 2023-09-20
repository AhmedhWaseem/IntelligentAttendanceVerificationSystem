// pages/api/getStudents.js

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPath = 'students.db'; // Replace with the actual path to your SQLite database file

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Open the SQLite database
      const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });

      // Retrieve all events from the "Students" table
      const events = await db.all('SELECT * FROM Events');

      await db.close();

      return res.status(200).json(events);
    } catch (error) {
      console.error('Error retrieving data from the database:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
