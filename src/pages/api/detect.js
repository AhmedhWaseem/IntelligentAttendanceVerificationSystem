const fs = require("fs");
const { compare } = require("image-ssim");

import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPath = "students.db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Base64 representations of the images
    let base64Images = [];

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Retrieve all students from the "Students" table
    const students = await db.all(
      "SELECT * FROM Students WHERE studentId IN (1,2)"
    );

    for (let s of students) {
      console.log(s.studentId);
      base64Images.push(s.image);
    }

    await db.close();

  

    return res.status(200).json({ students });
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}

// // Convert base64 strings to buffer
