// ==========================================
// TechBridge Challenge Hub
// ==========================================

// ARRAY of OBJECTS: one object for every challenge.
// To add a new challenge, copy one object and change its details.
const challenges = [
    {
        id: 1,
        name: "Sales Analysis",
        track: "data",
        difficulty: "Beginner",
        description: "Clean and analyze a small monthly sales dataset to find which products and months perform best.",
        outcome: "A one-page summary of top products, best months and key sales trends.",
        objective: "Explore a small sales dataset and identify which products and months bring in the most revenue.",
        skills: ["Data cleaning", "Spreadsheet formulas", "Pivot Tables"],
        tools: ["Google Sheets", "Microsoft Excel"],
        produce: [
            "A cleaned version of the dataset",
            "A Pivot Table showing sales by product and month",
            "A short list of three insights from the data"
        ],
        time: "3–4 hours"
    },
    {
        id: 2,
        name: "Expense Analysis",
        track: "data",
        difficulty: "Beginner",
        description: "Organize a month of business expenses into categories and find where the money is going.",
        outcome: "A categorized expense sheet with a chart showing spending by category.",
        objective: "Group expenses into categories and spot the biggest costs a small business has.",
        skills: ["Data cleaning", "Spreadsheet formulas", "Basic charts"],
        tools: ["Google Sheets", "Microsoft Excel"],
        produce: [
            "A categorized expense sheet",
            "Total spending for each category",
            "One chart that compares spending by category"
        ],
        time: "2–3 hours"
    },
    {
        id: 3,
        name: "Customer Analysis",
        track: "data",
        difficulty: "Intermediate",
        description: "Use SQL to answer questions about customers and their orders across two related tables.",
        outcome: "A set of SQL queries and a short report on top customers and ordering patterns.",
        objective: "Combine customer and order data to find who buys the most and how often they order.",
        skills: ["SQL SELECT and filtering", "JOIN", "GROUP BY", "COUNT, SUM and AVG"],
        tools: ["SQLite or MySQL", "Google Sheets for the report"],
        produce: [
            "At least five SQL queries",
            "A table of the top customers",
            "A short written summary of what you found"
        ],
        time: "4–5 hours"
    },
    {
        id: 4,
        name: "Business Dashboard",
        track: "data",
        difficulty: "Advanced",
        description: "Build a dashboard that presents a company's monthly sales performance to a manager.",
        outcome: "A dashboard showing monthly sales performance, with clear written recommendations.",
        objective: "Turn cleaned data into a dashboard that a manager could understand in under a minute.",
        skills: ["Data cleaning", "Pivot Tables", "Data visualization", "Business-focused analysis"],
        tools: ["Microsoft Excel", "Google Sheets"],
        produce: [
            "A cleaned dataset",
            "Pivot Tables behind each chart",
            "A dashboard with at least three charts",
            "Three written business recommendations"
        ],
        time: "6–8 hours"
    },
    {
        id: 5,
        name: "Responsive Landing Page",
        track: "web",
        difficulty: "Beginner",
        description: "Build a one-page landing page for a small business that looks good on both phone and desktop.",
        outcome: "A responsive landing page with a hero section, services section and call-to-action.",
        objective: "Practise HTML structure and CSS layout by turning a simple brief into a clean page.",
        skills: ["HTML", "CSS", "Flexbox or Grid", "Media queries"],
        tools: ["VS Code", "A web browser", "Git/GitHub"],
        produce: [
            "A landing page with hero, features and footer sections",
            "A layout that adapts to mobile screens",
            "A GitHub repository with your code"
        ],
        time: "3–4 hours"
    },
    {
        id: 6,
        name: "Contact Form",
        track: "web",
        difficulty: "Intermediate",
        description: "Create a styled contact form that checks the visitor's input before it can be sent.",
        outcome: "A contact form that shows clear messages when a field is empty or invalid.",
        objective: "Combine good form design with JavaScript validation to guide the visitor.",
        skills: ["HTML forms", "CSS", "JavaScript events", "Conditional logic"],
        tools: ["VS Code", "A web browser"],
        produce: [
            "A form with name, email and message fields",
            "Error messages for missing or invalid input",
            "A success message when the form is filled in correctly"
        ],
        time: "3–4 hours"
    },
    {
        id: 7,
        name: "Portfolio Website",
        track: "web",
        difficulty: "Intermediate",
        description: "Design a multi-section personal portfolio that presents your skills and projects.",
        outcome: "A responsive portfolio with about, projects and contact sections.",
        objective: "Present yourself professionally, with a consistent design across several sections.",
        skills: ["HTML", "CSS", "Responsive design", "Git/GitHub"],
        tools: ["VS Code", "A web browser", "GitHub Pages"],
        produce: [
            "A portfolio with at least three sections",
            "Project cards with links",
            "A live website link"
        ],
        time: "5–6 hours"
    },
    {
        id: 8,
        name: "Interactive Product Page",
        track: "web",
        difficulty: "Advanced",
        description: "Build a product page with an image gallery and an add-to-cart counter that updates without a page refresh.",
        outcome: "A product page where visitors change images, choose options and see the cart count update.",
        objective: "Use JavaScript to build interface features that respond to what the visitor does.",
        skills: ["HTML", "CSS", "JavaScript DOM manipulation", "Event listeners", "Arrays and objects"],
        tools: ["VS Code", "A web browser", "Git/GitHub"],
        produce: [
            "A product gallery that changes the main image",
            "Option selectors such as size or colour",
            "A cart counter that updates when the visitor adds an item"
        ],
        time: "6–8 hours"
    }
];

// OBJECTS: display names and difficulty levels
const trackNames = {
    data: "Data Analytics",
    web: "Web Development"
};

const difficultyLevels = {
    "Beginner": 1,
    "Intermediate": 2,
    "Advanced": 3
};

// VARIABLE: remembers what the visitor has selected
let filters = {
    track: "all",
    difficulty: "all",
    search: ""
};

let lastFocused = null;

// Elements on the page
const hubGrid = document.getElementById("hubGrid");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");


// ---------- Small helper functions ----------

// Builds the little difficulty meter
function difficultyHTML(difficulty) {
    const level = difficultyLevels[difficulty] || 1;
    return `
        <span class="difficulty" data-level="${level}">
            <span class="meter"><i></i><i></i><i></i></span>
            ${difficulty}
        </span>`;
}

// Builds the HTML for ONE challenge card
function createCard(challenge) {
    return `
        <article class="challenge-card" data-track="${challenge.track}">
            <div class="card-top">
                <span class="track-tag ${challenge.track}">${trackNames[challenge.track]}</span>
                ${difficultyHTML(challenge.difficulty)}
            </div>

            <h3>${challenge.name}</h3>
            <p>${challenge.description}</p>

            <div class="outcome">
                <small>EXPECTED OUTCOME</small>
                <span>${challenge.outcome}</span>
            </div>

            <div class="card-bottom">
                <span class="card-time"><i class="fa-regular fa-clock"></i>${challenge.time}</span>
                <button class="view-btn" type="button" data-id="${challenge.id}">
                    View Challenge <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </article>
    `;
}

// Turns an array into <li> items
function listHTML(items) {
    return items.map(function (item) {
        return "<li>" + item + "</li>";
    }).join("");
}


// ---------- Filtering and showing the cards ----------

function getFilteredChallenges() {
    const searchWord = filters.search.trim().toLowerCase();

    return challenges.filter(function (challenge) {
        // CONDITIONAL LOGIC: a challenge must pass all three checks
        const matchesTrack = filters.track === "all" || challenge.track === filters.track;
        const matchesDifficulty = filters.difficulty === "all" || challenge.difficulty === filters.difficulty;
        const matchesSearch = challenge.name.toLowerCase().includes(searchWord);

        return matchesTrack && matchesDifficulty && matchesSearch;
    });
}

function render() {
    const visible = getFilteredChallenges();

    // DOM MANIPULATION
    hubGrid.innerHTML = visible.map(createCard).join("");
    noResults.hidden = visible.length > 0;
    resultCount.textContent = "Showing " + visible.length + " of " + challenges.length + " challenges";
}

// Highlights the chosen filter buttons
function updateChips() {
    chips.forEach(function (chip) {
        const isActive = filters[chip.dataset.group] === chip.dataset.value;
        chip.classList.toggle("active", isActive);
        chip.setAttribute("aria-pressed", isActive);
    });
}

function resetFilters() {
    filters = { track: "all", difficulty: "all", search: "" };
    searchInput.value = "";
    updateChips();
    render();
}


// ---------- The details popup ----------

function openChallenge(id) {
    const challenge = challenges.find(function (item) {
        return item.id === id;
    });

    // CONDITIONAL LOGIC: stop if the challenge does not exist
    if (!challenge) {
        return;
    }

    lastFocused = document.activeElement;

    const trackTag = document.getElementById("modalTrack");
    trackTag.textContent = trackNames[challenge.track];
    trackTag.className = "track-tag " + challenge.track;

    document.getElementById("modalDifficulty").outerHTML =
        '<span class="difficulty" id="modalDifficulty" data-level="' +
        (difficultyLevels[challenge.difficulty] || 1) +
        '"><span class="meter"><i></i><i></i><i></i></span>' +
        challenge.difficulty + "</span>";

    document.getElementById("modalTitle").textContent = challenge.name;
    document.getElementById("modalObjective").textContent = challenge.objective;
    document.getElementById("modalSkills").innerHTML = listHTML(challenge.skills);
    document.getElementById("modalTools").innerHTML = listHTML(challenge.tools);
    document.getElementById("modalProduce").innerHTML = listHTML(challenge.produce);
    document.getElementById("modalTime").textContent = challenge.time;
    document.getElementById("modalResult").textContent = challenge.outcome;

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
}

function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");

    // Put the visitor back where they were
    if (lastFocused) {
        lastFocused.focus();
    }
}


// ---------- EVENT LISTENERS ----------

// Track and difficulty filter buttons
chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
        filters[chip.dataset.group] = chip.dataset.value;
        updateChips();
        render();
    });
});

// Search box
searchInput.addEventListener("input", function () {
    filters.search = searchInput.value;
    render();
});

// Reset buttons
document.getElementById("resetBtn").addEventListener("click", resetFilters);
document.getElementById("noResultsReset").addEventListener("click", resetFilters);

// "View Challenge" buttons (one listener handles every card)
hubGrid.addEventListener("click", function (event) {
    const button = event.target.closest(".view-btn");
    if (button) {
        openChallenge(Number(button.dataset.id));
    }
});

// Close the popup
modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (modal.hidden) {
        return;
    }

    if (event.key === "Escape") {
        closeModal();
    }

    // Keep the Tab key inside the popup while it is open
    if (event.key === "Tab") {
        const focusable = modal.querySelectorAll("button, a[href]");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});


// ---------- Start ----------
document.getElementById("statTotal").textContent = challenges.length;
render();