import sqlite3 from "sqlite3";
import { open } from "sqlite";
const fs = require("fs");
import path from "path";
const readline = require("readline");

const dbPath = "students.db"; // Replace with the actual path to your SQLite database file

const verify_path = path.join(process.cwd(), "verify_results", "result.log");

// Create a function to check if a line starts with the target line prefix
const lineStartsWithTargetLine = (line, targetLinePrefix) => {
  return line.trim().startsWith(targetLinePrefix);
};

// Create a function to check if a line ends with ":True"
const lineEndsWithTrue = (line) => {
  return line.trim().endsWith(":True");
};

const logEvent = async (studentId, result) => {
        // Open the SQLite database
        const db = await open({
          filename: dbPath,
          driver: sqlite3.Database,
        });
  
        // Create the "Students" table if it doesn't exist
        await db.exec(`
          CREATE TABLE IF NOT EXISTS Events (
            id INTEGER PRIMARY KEY,
            timeStamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            studentId TEXT,
            result BOOLEAN
          )
        `);
  
        // Insert the student ID and image into the "Students" table
        await db.run('INSERT INTO Events (studentId, result) VALUES (?, ?)', [studentId, result]);
  
        await db.close();
}

const getResponse =  (filePath, studentId) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async function () {
      try {
        const fileContent = fs.readFileSync(verify_path, "utf-8"); // Read the entire file

        // Check each line in the file
        const lines = fileContent.split("\n");
        for (const line of lines) {
          if (lineStartsWithTargetLine(line, filePath)) {
            console.log("Found a line matching the target:", line);
            if (lineEndsWithTrue(line)) {
              console.log('Line ends with ":True". Returning success.');
              await logEvent(studentId, true);
              resolve({ content: "True" });
            } else {
              console.log('Line does not end with ":True".');
              await logEvent(studentId, false);
              resolve({ content: "False" });
            }
            return; // Exit the function after processing the file
          }
        }
        // If the line was not found, resolve with "False" by default
        await logEvent(studentId, false);
        resolve({ content: "False", message: "Line not found!" });
      } catch (error) {
        console.error('Error reading file:', error);
        await logEvent(studentId, false);
        reject(error);
      }
    }, 10000);
  });
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { studentId, image } = req.body;

    if (!studentId || !image) {
      return res
        .status(400)
        .json({ error: "Student ID and image are required." });
    }

    try {
      const makeId = (length) => {
        let result = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
          counter += 1;
        }
        return result;
      };

      const filePath =
        "verification_dumps/" + studentId + "_verify_" + makeId(10) + ".png";

      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

      const buffer = Buffer.from(base64Data, "base64");

      fs.writeFileSync(filePath, buffer, (err) => {
        if (err) {
          console.error("Error saving the image:", err);
        } else {
          console.log("Image saved successfully.");
          //verify image
        }
      });

      const spawn = require("child_process").spawn;
      spawn("python", [
        "verify.py",
        `uploads/${studentId}.png`,
        filePath,
        studentId,
      ]);

      let resp = await getResponse(filePath, studentId);

      res.status(200).json(resp);

      //const fileContent = await waitForFile(verify_path);
      //res.status(200).json({ content: fileContent });
    } catch (error) {
      console.error("Error saving data to the database:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}
