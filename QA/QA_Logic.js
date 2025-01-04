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

// Evaluate and apply color coding for each question
function submitAnswer(questionIndex) {
    const q = questions[questionIndex];
    const selected = Array.from(document.querySelectorAll(`input[name="question${questionIndex}"]:checked`)).map(cb => cb.value);
    const correct = q.correct;

    // For each answer option, check if it's correct or incorrect
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

    // Disable further changes after submission (optional)
    const buttons = document.querySelectorAll(`button[onclick="submitAnswer(${questionIndex})"]`);
    buttons.forEach(button => button.disabled = true);
}