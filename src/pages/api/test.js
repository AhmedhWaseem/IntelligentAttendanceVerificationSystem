export default async function handler(req, res) {

    const spawn = require("child_process").spawn;
    const pythonProcess = spawn("python", [
      "test.py",
      `arg1`,
      'arg2',
    ]);

    pythonProcess.stdout.on("data", (data) => {
        console.log(data.toString());
        res.end(data.toString());
    });
}
