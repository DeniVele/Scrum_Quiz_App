// Generate the quiz dynamically
const quizContainer = document.getElementById("quiz");
questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    let answerOptionsHTML = "";

    if (q.type === "drag_and_drop") {
        answerOptionsHTML = `
            <div class="drag-and-drop">
                ${Object.entries(q.pairs).map(([key, value]) => `
                    <div class="pair">
                        <strong>${key}</strong> → <em>${value}</em>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (q.type === "spreadsheet_view" || q.type === "email_snippet" || !q.type) {
        answerOptionsHTML = `
            <div class="answers">
                ${Object.entries(q.options)
                    .map(([key, value]) => `
                        <div class="answer-option">
                            <label>
                                <input type="checkbox" name="question${index}" value="${key}"> ${key}. ${value}
                            </label>
                        </div>
                    `).join('')}
            </div>
        `;
    }

    questionDiv.innerHTML = `
        <div class="question">${index + 1}. ${q.question}</div>
        ${answerOptionsHTML}
        <button onclick="submitAnswer(${index})">Submit</button>
    `;
    quizContainer.appendChild(questionDiv);
});

// Initialize counters
let totalAnswered = 0;
let incorrectCount = 0;

function updateCounters() {
    document.getElementById("total-answered-counter").textContent = `Total Answers Answered: ${totalAnswered}`;
    document.getElementById("incorrect-counter").textContent = `Incorrect Answers: ${incorrectCount}`;
}

function submitAnswer(questionIndex) {
    const q = questions[questionIndex];

    if (q.type === "drag_and_drop") {
        alert("Drag-and-drop interactions are informational only in this quiz. Please evaluate manually.");
        document.querySelector(`button[onclick="submitAnswer(${questionIndex})"]`).disabled = true;
        totalAnswered++;
        updateCounters();
        return;
    }

    const selected = Array.from(document.querySelectorAll(`input[name="question${questionIndex}"]:checked`)).map(cb => cb.value);
    const correct = q.correct;

    let isAlreadyEvaluated = document.querySelector(`button[onclick="submitAnswer(${questionIndex})"]`).disabled;

    if (!isAlreadyEvaluated) {
        totalAnswered++;

        const isCorrect = correct.length === selected.length && correct.every(answer => selected.includes(answer));
        if (!isCorrect) {
            incorrectCount++;
        }

        Object.keys(q.options).forEach(option => {
            const optionElement = document.querySelector(`input[name="question${questionIndex}"][value="${option}"]`).parentElement;

            if (correct.includes(option)) {
                optionElement.classList.add("correct");
            }

            if (selected.includes(option) && !correct.includes(option)) {
                optionElement.classList.add("incorrect");
            }
        });

        updateCounters();
        document.querySelectorAll(`button[onclick="submitAnswer(${questionIndex})"]`).forEach(button => button.disabled = true);
    }
}

updateCounters();
