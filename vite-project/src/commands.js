export const terminalCommands = [
    { command: "node --version", meaning: "Shows the installed Node.js version", group: "Node.js" },
    { command: "node src/report.js", meaning: "Runs a JavaScript file with Node.js", group: "Node.js" },
    { command: "npm --version", meaning: "Shows the installed npm version", group: "npm" },
    { command: "npm init -y", meaning: "Creates a package.json with the default answers", group: "npm" },
    { command: "npm install dayjs", meaning: "Installs a package and adds it to dependencies", group: "npm" },
    { command: "npm install --save-dev vite", meaning: "Installs a package and adds it to devDependencies", group: "npm" },
    { command: "npm uninstall dayjs", meaning: "Removes a package from node_modules and package.json", group: "npm" },
    { command: "npm run build", meaning: "Runs the build script from package.json", group: "npm" },
    { command: "npx vite --version", meaning: "Runs a command that npm finds in node_modules, or downloads when it is missing", group: "npm" },
    { command: "npm run dev", meaning: "Starts the Vite development server", group: "Vite" },
    { command: "npm run preview", meaning: "Serves the files of the dist folder", group: "Vite" },
    { command: "cd vite-project", meaning: "Moves into a folder", group: "Terminal" },
    { command: "dir", meaning: "Lists the files of the current folder", group: "Terminal" },
    { command: "mkdir my-folder", meaning: "Creates a folder", group: "Terminal" },
    { command: "Remove-Item node_modules -Recurse", meaning: "Deletes a folder and everything inside it", group: "Terminal" }
];