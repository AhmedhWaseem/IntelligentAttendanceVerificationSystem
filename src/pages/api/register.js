import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
const fs = require("fs");

const dbPath = 'students.db'; // Replace with the actual path to your SQLite database file

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { studentId, image } = req.body;

    if (!studentId || !image) {
      return res.status(400).json({ error: 'Student ID and image are required.' });
    }

    try {

      const filePath = "uploads/" + studentId+'.png';

      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

      const buffer = Buffer.from(base64Data, 'base64');

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error('Error saving the image:', err);
        } else {
          console.log('Image saved successfully.');
        }
      });

      // Open the SQLite database
      const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });

      // Create the "Students" table if it doesn't exist
      await db.exec(`
        CREATE TABLE IF NOT EXISTS Students (
          id INTEGER PRIMARY KEY,
          studentId TEXT,
          imagePath TEXT
        )
      `);

      // Insert the student ID and image into the "Students" table
      await db.run('INSERT INTO Students (studentId, imagePath) VALUES (?, ?)', [studentId, filePath]);

      await db.close();

      return res.status(200).json({ message: 'Data received and saved successfully.' });
    } catch (error) {
      console.error('Error saving data to the database:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
