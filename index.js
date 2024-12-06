#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

// Чтение аргументов
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Error: You must provide a project name.");
  process.exit(1);
}

const projectName = args[0];
const projectDir = path.resolve(projectName);

// Функция для выполнения команды
function runCommand(command) {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: "inherit" }); // Включает передачу вывода в консоль
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1); // Завершает процесс с ошибкой
  }
}

// Список команд
const commands = [
  `yarn create vite ${projectName} --template react`,
  `cd ${projectName}`,
  "yarn add react@18.2.0 react-dom@18.2.0",
  "yarn add rimraf --dev",
  "corepack enable",
  "yarn set version stable",
  "yarn config set nodeLinker node-modules",
  "yarn",
  "yarn add react-router-dom@5.2.0",
  "yarn add stylelint",
  /*дальше ошибки */
  `npx rimraf ./public/*`,
  `npx rimraf ./src/assets/*`,
  'echo "" > .srcApp.css',
  'echo "" > .srcindex.css',
  'echo "" > .srcApp.jsx',
  'echo "" > .srcApp.css',
  'echo "" > flow.md',
  'Set-Content -Path .srcApp.jsx -Value "function App() {return <div>Hi</div>;} export default App;" -Encoding UTF8',
  "yarn dev",
  'echo "command executed"',
];

// Создание папки и выполнение команд
runCommand(`mkdir ${projectName}`);
// Выполнение команд
commands.forEach(runCommand);
