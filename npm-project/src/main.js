import { sumBy } from "lodash-es";
import { buildReport } from "./tasks.js";
import "./style.css";

const ALL_SUBJECTS = "all";

function getElement(id) {
    const element = document.getElementById(id);

    if (element === null) {
        throw new Error(`The element #${id} is missing from the page.`);
    }

    return element;
}

function makeElement(tag, text = "") {
    const element = document.createElement(tag);

    element.textContent = text;
    return element;
}

function pluralize(count, word) {
    return `${count} ${word}${count === 1 ? "" : "s"}`;
}

const report = buildReport();
const todayText = getElement("today-text");
const subjectSummary = getElement("subject-summary");
const subjectFilter = getElement("subject-filter");
const taskBody = getElement("task-body");
const taskCount = getElement("task-count");
const environmentList = getElement("environment-list");

function renderSummary() {
    Object.entries(report.bySubject).forEach(([subject, items]) => {
        const tasks = pluralize(items.length, "task");
        const hours = pluralize(sumBy(items, "hours"), "hour");

        subjectSummary.append(makeElement("li", `${subject}: ${tasks}, ${hours}`));
    });
}

function renderFilter() {
    [ALL_SUBJECTS, ...Object.keys(report.bySubject)].forEach((subject) => {
        const option = makeElement("option", subject === ALL_SUBJECTS ? "All subjects" : subject);

        option.value = subject;
        subjectFilter.append(option);
    });
}

function renderTasks(subject) {
    const shown = subject === ALL_SUBJECTS ? report.tasks : (report.bySubject[subject] ?? []);

    taskBody.textContent = "";
    shown.forEach((task) => {
        const row = makeElement("tr");

        row.append(
            makeElement("td", task.title),
            makeElement("td", task.subject),
            makeElement("td", task.due),
            makeElement("td", task.daysLeft === 0 ? "Today" : pluralize(task.daysLeft, "day")),
            makeElement("td", String(task.hours))
        );
        taskBody.append(row);
    });

    taskCount.textContent = `Showing ${shown.length} of ${report.tasks.length} tasks, ${pluralize(sumBy(shown, "hours"), "hour")}.`;
}

function renderEnvironment() {
    const rows = [
        ["typeof window", typeof window],
        ["typeof document", typeof document],
        ["typeof process", typeof process]
    ];

    rows.forEach(([label, value]) => {
        environmentList.append(makeElement("dt", label), makeElement("dd", value));
    });
}

todayText.textContent = `Today is ${report.today}.`;
renderSummary();
renderFilter();
renderTasks(ALL_SUBJECTS);
renderEnvironment();
subjectFilter.addEventListener("change", () => renderTasks(subjectFilter.value));