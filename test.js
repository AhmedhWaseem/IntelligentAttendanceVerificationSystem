const fs = require("fs");
const compare = require("image-ssim");

const sqlite3 = require("sqlite3");
const open = require("sqlite");

const dbPath = "students.db";

async function runAsync() {
  // Base64 representations of the images
  let base64Images = [];

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  const sqlQuery = `
        SELECT studentId, image
        FROM Students
        WHERE studentId IN (1, 2)
      `;

  // Execute the SQL query
  db.all(sqlQuery, (err, rows) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return;
    }

    // Process the retrieved data
    rows.forEach((row) => {
      const studentId = row.studentId;
      const base64Image = row.image;

      console.log(`Student ID: ${studentId}`);
      console.log("Base64 Image:", base64Image);

      base64Images.push[base64Image];
    });

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err);
      }
    });
  });
}

runAsync();

// // Convert base64 strings to buffer
// const bufferImage1 = Buffer.from(base64Images[0], 'base64');
// const bufferImage2 = Buffer.from(base64Images[1], 'base64');

// // Calculate SSIM (Structural Similarity Index)
// compare(bufferImage1, bufferImage2, (err, result) => {
//   if (err) {
//     console.error('Error comparing images:', err);
//     return;
//   }

//   const { ssim } = result;

//   // Calculate match percentage (convert SSIM to a percentage)
//   const matchPercentage = (ssim + 1) / 2 * 100;

//   console.log(`SSIM: ${ssim}`);
//   console.log(`Match Percentage: ${matchPercentage.toFixed(2)}%`);
// });
