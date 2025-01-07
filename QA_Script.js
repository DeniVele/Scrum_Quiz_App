let questions = [];

// Load questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('questions_answers.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error(`Error loading questions: ${response.statusText}`);
        }
        questions = await response.json(); // Parse JSON data
        initializeQuiz(); // Call the function to render the quiz
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call this function once questions are loaded
function initializeQuiz() {
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
            <button onclick="submitAnswer(${index})">Check your answer!</button>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Start loading questions on page load
loadQuestions();
