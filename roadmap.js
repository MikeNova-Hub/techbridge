// ==========================================
// TechBridge Interactive Internship Roadmap
// ==========================================

// ARRAYS + OBJECTS: each track is an object that holds an array of task objects
const tracks = {
    data: {
        name: "Data Analytics",
        tagline: "Working with data and extracting insights",
        tasks: [
            {
                number: 1,
                title: "Data Cleaning Basics",
                day: 1,
                description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
                difficulty: "Beginner"
            },
            {
                number: 2,
                title: "Formulas & Pivot Tables",
                day: 4,
                description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
                difficulty: "Beginner"
            },
            {
                number: 3,
                title: "Data Visualization",
                day: 8,
                description: "Create charts and a simple dashboard that communicate useful insights from a dataset.",
                difficulty: "Beginner → Intermediate"
            },
            {
                number: 4,
                title: "Introduction to SQL",
                day: 11,
                description: "Practice basic SQL queries and use them to answer real-world questions about data.",
                difficulty: "Beginner → Intermediate"
            },
            {
                number: 5,
                title: "SQL Joins & Aggregations",
                day: 15,
                description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
                difficulty: "Intermediate"
            },
            {
                number: 6,
                title: "Lookup Functions & Data Wrangling",
                day: 19,
                description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
                difficulty: "Intermediate"
            },
            {
                number: 7,
                title: "Mini Analysis Project",
                day: 22,
                description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
                difficulty: "Intermediate"
            },
            {
                number: 8,
                title: "Capstone Project",
                day: 26,
                description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
                difficulty: "Intermediate"
            }
        ]
    },

    web: {
        name: "Web Development",
        tagline: "Designing and building websites and web applications",
        tasks: [
            {
                number: 1,
                title: "Build the TechBridge Homepage",
                day: 1,
                description: "Create the first version of the TechBridge website using HTML and CSS.",
                difficulty: "Beginner"
            },
            {
                number: 2,
                title: "Build the TechBridge Programs Experience",
                day: 4,
                description: "Create a Programs experience presenting TechBridge's available learning programs.",
                difficulty: "Beginner"
            },
            {
                number: 3,
                title: "Build the Internship Tasks Experience",
                day: 8,
                description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
                difficulty: "Beginner → Intermediate"
            },
            {
                number: 4,
                title: "Build an Interactive Internship Roadmap",
                day: 11,
                description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
                difficulty: "Beginner → Intermediate"
            },
            {
                number: 5,
                title: "Build the Intern Registration Experience",
                day: 15,
                description: "Create a professional registration and onboarding interface for TechBridge interns.",
                difficulty: "Intermediate"
            },
            {
                number: 6,
                title: "Build the Task Submission System",
                day: 19,
                description: "Create an interface through which interns can prepare and submit their task work.",
                difficulty: "Intermediate"
            },
            {
                number: 7,
                title: "Build the Intern Dashboard",
                day: 22,
                description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
                difficulty: "Intermediate"
            },
            {
                number: 8,
                title: "Build the Complete TechBridge Internship Platform",
                day: 26,
                description: "Combine the different components created during the internship into a complete TechBridge platform.",
                difficulty: "Intermediate"
            }
        ]
    }
};

// OBJECT: turns a difficulty label into a number of filled meter bars
const difficultyLevels = {
    "Beginner": 1,
    "Beginner → Intermediate": 2,
    "Intermediate": 3
};

// VARIABLE: remembers which track is selected right now
let currentTrack = "web";

// Elements on the page
const roadmapSection = document.getElementById("roadmap");
const taskList = document.getElementById("taskList");
const viewingName = document.getElementById("viewingName");
const viewingText = document.getElementById("viewingText");
const trackButtons = document.querySelectorAll(".track-btn");


// FUNCTION: makes "1" into "01"
function padNumber(number) {
    return String(number).padStart(2, "0");
}

// FUNCTION: builds the HTML for ONE task object
function createTaskCard(task) {
    const level = difficultyLevels[task.difficulty] || 1;

    return `
        <li class="task">
            <div class="task-day">
                <small>DAY</small>
                <strong>${task.day}</strong>
            </div>

            <article class="task-card">
                <div class="task-top">
                    <span class="task-number">TASK ${padNumber(task.number)}</span>
                    <span class="day-pill">Day ${task.day}</span>
                </div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="task-meta">
                    <span class="difficulty" data-level="${level}">
                        <span class="meter"><i></i><i></i><i></i><i></i></span>
                        ${task.difficulty}
                    </span>
                </div>
            </article>
        </li>
    `;
}

// FUNCTION: shows the selected track on the page
function showTrack(trackKey) {

    // CONDITIONAL LOGIC: ignore anything that is not a real track
    if (!tracks[trackKey]) {
        return;
    }

    currentTrack = trackKey;
    const track = tracks[trackKey];

    // DOM MANIPULATION
    roadmapSection.dataset.track = trackKey;
    viewingName.textContent = track.name.toUpperCase();
    viewingText.textContent = track.tagline;
    taskList.setAttribute("aria-label", track.name + " internship tasks");
    taskList.innerHTML = track.tasks.map(createTaskCard).join("");

    // Highlight the selected button
    trackButtons.forEach(function (button) {
        const isSelected = button.dataset.track === trackKey;
        button.setAttribute("aria-selected", isSelected);
        button.tabIndex = isSelected ? 0 : -1;
    });
}


// EVENT LISTENERS: click on a track button
trackButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        showTrack(button.dataset.track);
    });
});

// EVENT LISTENER: left and right arrow keys also switch tracks
document.querySelector(".track-switch").addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const next = currentTrack === "web" ? "data" : "web";
        showTrack(next);
        document.getElementById("tab-" + next).focus();
    }
});


// Show the first track when the page loads
showTrack(currentTrack);