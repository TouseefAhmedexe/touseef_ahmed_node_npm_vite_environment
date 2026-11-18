# Node.js, npm and Vite Environment

Practice for the Bloomrix internship task FE01: Node.js, npm and the frontend development
environment. The repository has two projects. No framework is used.

## Folders
- npm-project - built by hand. A study planner that uses the npm packages dayjs and lodash-es.
  It runs in Node.js as a terminal report, and in the browser through the Vite development
  server.
- vite-project - created with npm create vite@latest (vanilla JavaScript template) and then
  changed. It shows the environment values and compares the development server with the
  production build.

## Requirements
- Node.js v24.12.0 was used. .nvmrc says 24, and package.json has engines >=22.12.0.
- Every command below is run in the folder of the project.

## npm-project scripts
| Command | Does |
| --- | --- |
| npm start | Runs src/report.js with Node.js |
| npm run report | The same, after loading the variables of the .env file |
| npm run report -- 3 | The same, showing only the tasks due within 3 days |
| npm run dev | Starts the Vite development server |
| npm run build | Creates the production files in the dist folder |
| npm run preview | Serves the dist folder |

To use the .env file: copy .env.example to .env. The .env file is ignored by Git.

## vite-project scripts
npm run dev, npm run build and npm run preview, as in the table above.
Run npm install first.

## Packages
- dayjs (dependency): formats dates and calculates the days left
- lodash-es (dependency): orderBy, groupBy and sumBy. Vite keeps only the functions that are
  used, so the build is much smaller than the package.
- vite (devDependency): the development server and the build tool. It is not part of the
  program itself.

Version ranges with a caret, such as ^1.11.0, allow new minor and patch versions but not a
new major version. package-lock.json records the exact versions that were installed, and it is
committed so that npm install gives the same result for everyone.

## Environment variables
- npm-project: Node.js reads REPORT_TITLE from .env with node --env-file=.env. If the variable
  is missing, the script uses a default title.
- vite-project: .env.development and .env.production hold public labels that start with
  VITE_. Vite writes these values into the page code, so they must never be secrets.
  A variable without the VITE_ prefix is not included. .env.local is ignored by Git and has a
  higher priority than the other files.

## What is ignored by Git
node_modules, dist, .env, .env.local, .env.*.local, log files and operating system files.

## Generated files that I inspected
- node_modules: the packages, including the packages that my packages need. It can be created
  again with npm install.
- dist: index.html plus an assets folder with minified JavaScript and CSS files whose names
  contain a hash. Files from public are copied without changes.
- Opening dist/index.html by double-clicking does not work because the paths start with a
  slash. npm run preview serves it correctly.

## Limits
- The task dates are counted from today, so the dates on the page change every day.
- Exact versions, hashes and file sizes depend on the day the packages are installed