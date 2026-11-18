import { groupBy, sumBy } from "lodash-es";
import { buildReport } from "./tasks.js";

const reportTitle = process.env.REPORT_TITLE ?? "Study report";
const limitText = process.argv[2];
const limit = limitText === undefined ? Infinity : Number(limitText);

if (Number.isNaN(limit) || limit < 0) {
    console.error(`"${limitText}" is not a valid number of days. Example: npm run report -- 3`);
    process.exit(1);
}

const report = buildReport();
const shown = report.tasks.filter((task) => task.daysLeft <= limit);
const subjects = Object.entries(groupBy(shown, "subject")).map(([subject, items]) => ({
    subject,
    tasks: items.length,
    hours: sumBy(items, "hours")
}));

console.log(reportTitle);
console.log(`Today is ${report.today}.`);
console.log(`Running on Node.js ${process.version} (${process.platform}).`);
console.table(shown.map(({ id, title, subject, hours, due, daysLeft }) => ({ id, title, subject, hours, due, daysLeft })));
console.table(subjects);
console.log(`Tasks shown: ${shown.length} of ${report.tasks.length}`);
console.log(`Hours in the tasks shown: ${sumBy(shown, "hours")}`);