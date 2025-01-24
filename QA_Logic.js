// Generate the quiz dynamically
const quizContainer = document.getElementById("quiz");
questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
        <div class="question">${index + 1}. ${q.question}</div>
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

// Evaluate and apply color coding for each question
function submitAnswer(questionIndex) {
    const q = questions[questionIndex];
    const selected = Array.from(document.querySelectorAll(`input[name="question${questionIndex}"]:checked`)).map(cb => cb.value);
    const correct = q.correct;

    let isAlreadyEvaluated = document.querySelector(`button[onclick="submitAnswer(${questionIndex})"]`).disabled;

    if (!isAlreadyEvaluated) {
        totalAnswered++; // Increment total answered questions

        // Determine if the question is correct or incorrect
        const isCorrect = correct.length === selected.length && correct.every(answer => selected.includes(answer));
        if (!isCorrect) {
            incorrectCount++; // Increment incorrect questions
        }

        Object.keys(q.options).forEach(option => {
            const optionElement = document.querySelector(`input[name="question${questionIndex}"][value="${option}"]`).parentElement;

            // If the option is correct, mark it green
            if (correct.includes(option)) {
                optionElement.classList.add("correct");
            }

            // If the option is selected and incorrect, mark it red
            if (selected.includes(option) && !correct.includes(option)) {
                optionElement.classList.add("incorrect");
            }
        });

        updateCounters();

        // Disable the submit button
        document.querySelectorAll(`button[onclick="submitAnswer(${questionIndex})"]`).forEach(button => button.disabled = true);
    }
}

// Update counters when the page loads
updateCounters();
