const fs = require("fs");
const path = require("path");
const stdin = process.stdin;
const stdout = process.stdout;
const exit = process.exit;
const output = fs.createWriteStream(path.join(__dirname, "text.txt"));

stdout.write("Hello, my friend! Enter text.\n");

stdin.on('data', (data) => {
  if (data.toString().includes("Exit")) {
    exit();
  }
  output.write(data);
});

process.on('exit', () => {
  console.log("Thank you! Good bye!");
});

process.on('SIGINT', () => exit());