import dayjs from "dayjs";
import { groupBy, orderBy, sumBy } from "lodash-es";

export const studyTasks = [
    { id: 1, title: "Install Node.js and check the version", subject: "Node.js", hours: 1, dueInDays: 0 },
    { id: 2, title: "Read about the V8 engine and the runtime", subject: "Node.js", hours: 2, dueInDays: 1 },
    { id: 3, title: "Create a project with npm init", subject: "npm", hours: 1, dueInDays: 1 },
    { id: 4, title: "Install and remove packages", subject: "npm", hours: 2, dueInDays: 2 },
    { id: 5, title: "Write the npm scripts", subject: "npm", hours: 1.5, dueInDays: 3 },
    { id: 6, title: "Scaffold a project with Vite", subject: "Vite", hours: 2, dueInDays: 4 },
    { id: 7, title: "Compare the dev server and the build", subject: "Vite", hours: 2.5, dueInDays: 5 },
    { id: 8, title: "Push the work to GitHub", subject: "Git", hours: 1, dueInDays: 6 }
];

export function buildReport(today = dayjs()) {
    const start = today.startOf("day");
    const tasks = orderBy(
        studyTasks.map((task) => {
            const due = start.add(task.dueInDays, "day");

            return { ...task, due: due.format("ddd D MMM YYYY"), daysLeft: due.diff(start, "day") };
        }),
        ["daysLeft", "title"],
        ["asc", "asc"]
    );

    return {
        today: start.format("dddd D MMMM YYYY"),
        tasks,
        bySubject: groupBy(tasks, "subject"),
        totalHours: sumBy(tasks, "hours")
    };
}