/* =========================================
   AI STUDYMATE
   JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const navItems =
    document.querySelectorAll(".nav-item[data-section]");

const sections =
    document.querySelectorAll(".page-section");

const themeButton =
    document.getElementById("themeButton");

const themeIcon =
    document.getElementById("themeIcon");

const themeText =
    document.getElementById("themeText");

const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.getElementById("sidebar");

const overlay =
    document.getElementById("overlay");


/* =========================================
   NAVIGATION
========================================= */

function showSection(sectionId) {

    sections.forEach(section => {

        section.classList.remove("active-section");

    });


    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.classList.add("active-section");

    }


    navItems.forEach(item => {

        item.classList.remove("active");

        if (item.dataset.section === sectionId) {

            item.classList.add("active");

        }

    });


    // Close mobile sidebar

    sidebar.classList.remove("open");

    overlay.classList.remove("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


navItems.forEach(item => {

    item.addEventListener("click", () => {

        showSection(item.dataset.section);

    });

});


/* =========================================
   VIEW ALL BUTTON
========================================= */

document
    .querySelectorAll("[data-section-target]")
    .forEach(button => {

        button.addEventListener("click", () => {

            showSection(button.dataset.sectionTarget);

        });

    });


/* =========================================
   MOBILE SIDEBAR
========================================= */

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

    overlay.classList.toggle("active");

});


overlay.addEventListener("click", () => {

    sidebar.classList.remove("open");

    overlay.classList.remove("active");

});


/* =========================================
   DARK MODE
========================================= */

let darkMode =
    localStorage.getItem("studyMateDarkMode") === "true";


function updateTheme() {

    document.body.classList.toggle(
        "dark",
        darkMode
    );


    if (darkMode) {

        themeIcon.textContent = "☀";

        themeText.textContent = "Light Mode";

    } else {

        themeIcon.textContent = "☾";

        themeText.textContent = "Dark Mode";

    }

}


updateTheme();


themeButton.addEventListener("click", () => {

    darkMode = !darkMode;

    localStorage.setItem(
        "studyMateDarkMode",
        darkMode
    );

    updateTheme();

});


/* =========================================
   AI QUESTION DATABASE
========================================= */

const aiAnswers = {

    "karatsuba":
        `
        <strong>Karatsuba Algorithm</strong><br><br>

        Karatsuba is a divide-and-conquer algorithm
        used to multiply large numbers faster than
        traditional multiplication.

        <br><br>

        Instead of performing many individual
        multiplications, it divides each number into
        smaller parts.

        <br><br>

        <strong>Time Complexity:</strong>
        O(n<sup>log₂3</sup>) ≈ O(n<sup>1.585</sup>).
        `,

    "knapsack":
        `
        <strong>Knapsack Problem</strong><br><br>

        The Knapsack Problem asks us to select items
        with maximum total value while keeping the
        total weight within a given capacity.

        <br><br>

        Common approaches include:

        <br>
        • Brute Force<br>
        • Dynamic Programming<br>
        • Greedy method for specific variants
        `,

    "master theorem":
        `
        <strong>Master Theorem</strong><br><br>

        The Master Theorem is used to solve recurrence
        relations that commonly occur in divide-and-
        conquer algorithms.

        <br><br>

        A common form is:

        <br>

        T(n) = aT(n/b) + f(n)

        <br><br>

        It helps determine the asymptotic time
        complexity of recursive algorithms.
        `,

    "machine learning":
        `
        <strong>Machine Learning</strong><br><br>

        Machine Learning is a field where algorithms
        learn patterns from data and use those patterns
        to make predictions or decisions.

        <br><br>

        Common categories include:

        <br>
        • Supervised Learning<br>
        • Unsupervised Learning<br>
        • Reinforcement Learning
        `,

    "binary search":
        `
        <strong>Binary Search</strong><br><br>

        Binary Search finds an element in a sorted
        collection by repeatedly dividing the search
        range into two halves.

        <br><br>

        <strong>Time Complexity:</strong>
        O(log n)
        `

};


/* =========================================
   GET AI RESPONSE
========================================= */

function getAIResponse(question) {

    const lowerQuestion =
        question.toLowerCase();


    for (const keyword in aiAnswers) {

        if (lowerQuestion.includes(keyword)) {

            return aiAnswers[keyword];

        }

    }


    return `
        <strong>StudyMate AI</strong><br><br>

        That's a good question!

        <br><br>

        For this demo, the AI response is simulated
        using JavaScript. In a production application,
        this interface could be connected to an actual
        AI API.

        <br><br>

        <strong>Your question:</strong>
        ${escapeHTML(question)}
    `;
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================================
   ASK AI - DASHBOARD
========================================= */

const questionInput =
    document.getElementById("questionInput");

const askButton =
    document.getElementById("askButton");

const aiResponse =
    document.getElementById("aiResponse");

const responseText =
    document.getElementById("responseText");

const questionCount =
    document.getElementById("questionCount");


function askAI() {

    const question =
        questionInput.value.trim();


    if (!question) {

        questionInput.focus();

        alert("Please enter a question first.");

        return;
    }


    askButton.disabled = true;

    askButton.textContent = "Thinking...";


    setTimeout(() => {

        responseText.innerHTML =
            getAIResponse(question);

        aiResponse.classList.remove("hidden");


        // Update question count

        let count =
            parseInt(questionCount.textContent);

        count++;

        questionCount.textContent = count;


        askButton.disabled = false;

        askButton.textContent = "Ask AI →";


        addRecentQuestion(question);

    }, 700);

}


askButton.addEventListener(
    "click",
    askAI
);


/* =========================================
   ENTER KEY FOR QUESTION
========================================= */

questionInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            askAI();

        }

    }
);


/* =========================================
   ADD RECENT QUESTION
========================================= */

function addRecentQuestion(question) {

    const questionList =
        document.getElementById("questionList");


    const item =
        document.createElement("div");

    item.className =
        "question-item";


    item.innerHTML = `

        <div class="question-icon">
            AI
        </div>

        <div class="question-content">

            <strong>
                ${escapeHTML(question)}
            </strong>

            <span>
                AI Assistant • Just now
            </span>

        </div>

        <span class="status completed">
            Completed
        </span>

    `;


    questionList.prepend(item);

}


/* =========================================
   CHAT FUNCTION
========================================= */

const chatInput =
    document.getElementById("chatInput");

const chatSendButton =
    document.getElementById("chatSendButton");

const chatMessages =
    document.getElementById("chatMessages");


function addChatMessage(
    message,
    type
) {

    const messageElement =
        document.createElement("div");


    messageElement.className =
        `message ${type}-message`;


    if (type === "user") {

        messageElement.innerHTML = `

            <div class="message-content">

                <strong>You</strong>

                <p>
                    ${escapeHTML(message)}
                </p>

            </div>

        `;

    } else {

        messageElement.innerHTML = `

            <div class="message-avatar">
                AI
            </div>

            <div class="message-content">

                <strong>
                    StudyMate AI
                </strong>

                <p>
                    ${message}
                </p>

            </div>

        `;

    }


    chatMessages.appendChild(
        messageElement
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


function sendChatMessage() {

    const question =
        chatInput.value.trim();


    if (!question) {

        return;

    }


    addChatMessage(
        question,
        "user"
    );


    chatInput.value = "";


    setTimeout(() => {

        addChatMessage(
            getAIResponse(question),
            "ai"
        );

    }, 600);

}


chatSendButton.addEventListener(
    "click",
    sendChatMessage
);


chatInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            sendChatMessage();

        }

    }
);


/* =========================================
   HISTORY SEARCH
========================================= */

const historySearch =
    document.getElementById("historySearch");

const historyList =
    document.getElementById("historyList");


historySearch.addEventListener(
    "input",
    () => {

        const search =
            historySearch.value.toLowerCase();


        const items =
            historyList.querySelectorAll(
                ".history-item"
            );


        items.forEach(item => {

            const text =
                item.textContent.toLowerCase();


            if (text.includes(search)) {

                item.style.display =
                    "flex";

            } else {

                item.style.display =
                    "none";

            }

        });

    }
);


/* =========================================
   GLOBAL SEARCH
========================================= */

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Enter") {

            return;

        }


        const search =
            searchInput.value.trim();


        if (!search) {

            return;

        }


        showSection("ask-ai");


        chatInput.value =
            search;


        chatInput.focus();

    }
);


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "AI StudyMate loaded successfully."
        );

        console.log(
            "Demo AI mode is active."
        );

    }
);