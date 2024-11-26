// Mock question generation function
function getMockQuestions(language, level) {
    const questions = {
        "HTML/CSS": {
            "beginner": [
                {
                    question: "What does HTML stand for?",
                    options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"],
                    correct_answer: 0
                },
                {
                    question: "Which HTML element is used to define the title of a document?",
                    options: ["<meta>", "<title>", "<head>", "<footer>"],
                    correct_answer: 1
                },
                {
                    question: "Which tag is used to create a hyperlink?",
                    options: ["<link>", "<a>", "<href>", "<url>"],
                    correct_answer: 1
                },
                {
                    question: "Which CSS property controls the text size?",
                    options: ["font-size", "text-size", "font-style", "text-font"],
                    correct_answer: 0
                },
                {
                    question: "What does CSS stand for?",
                    options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
                    correct_answer: 2
                }
            ],
            "intermediate": [
                {
                    question: "Which property is used to change the background color?",
                    options: ["bgcolor", "background-color", "color", "background"],
                    correct_answer: 1
                },
                // Add 4 more intermediate questions...
            ],
            "advanced": [
                {
                    question: "What is the purpose of the z-index property?",
                    options: ["To control the vertical stacking order of elements", "To control the horizontal alignment of elements", "To control the size of elements", "To control the visibility of elements"],
                    correct_answer: 0
                },
                // Add 4 more advanced questions...
            ]
        },
        "JavaScript": {
            "beginner": [
                {
                    question: "What is the correct syntax for referring to an external script called 'script.js'?",
                    options: ["<script src='script.js'>", "<script href='script.js'>", "<script name='script.js'>", "<script file='script.js'>"],
                    correct_answer: 0
                },
                {
                    question: "Which operator is used to assign a value to a variable?",
                    options: ["==", "=", "===", "=>"],
                    correct_answer: 1
                },
                // Add 3 more beginner questions...
            ],
            "intermediate": [
                {
                    question: "Which method is used to access an HTML element by its id?",
                    options: ["getElementById()", "getElementsById()", "querySelector()", "getElement()"],
                    correct_answer: 0
                },
                // Add 4 more intermediate questions...
            ],
            "advanced": [
                {
                    question: "What is the output of the following code: console.log(typeof NaN);?",
                    options: ["number", "undefined", "object", "string"],
                    correct_answer: 0
                },
                // Add 4 more advanced questions...
            ]
        },
        // Add other languages with their respective questions...
    };

    return questions[language][level];
}

class QuizManager {
    constructor() {
        this.currentLevel = '';
        this.currentLanguage = '';
        this.score = 0;
        this.questionCount = 0;
        this.maxQuestions = 5; // Set to 5 for each level
    }

    async generateQuestion(language, level) {
        const questions = getMockQuestions(language, level);
        if (this.questionCount < questions.length) {
            return questions[this.questionCount];
        } else {
            return null; // No more questions
        }
    }

    async startQuiz(language, level) {
        this.currentLanguage = language;
        this.currentLevel = level;
        this.score = 0;
        this.questionCount = 0;

        await this.showNextQuestion();
    }

    async showNextQuestion() {
        if (this.questionCount >= this.maxQuestions) {
            this.endQuiz();
            return;
        }

        const questionData = await this.generateQuestion(this.currentLanguage, this.currentLevel);
        if (!questionData) return;

        const questionElement = document.getElementById('question');
        const optionsContainer = document.getElementById('options');

        questionData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(index, questionData.correct_answer));
            optionsContainer.appendChild(button);
        });

        this.questionCount++;
    }

    checkAnswer(selectedIndex, correctIndex) {
        if (selectedIndex === correctIndex) {
            this.score++;
            alert("Correct Answer!");
        } else {
            alert("Wrong Answer. The correct answer was option " + (correctIndex + 1));
        }
        this.showNextQuestion();
    }

    endQuiz() {
        const mainElement = document.getElementById('main');
        const quizScreen = document.getElementById('quizScreen');
        const homeScreen = document.getElementById('homeScreen');

        quizScreen.classList.add('hidden');
        mainElement.innerHTML = `<h2>Quiz Finished!</h2>
                                 <p>Your score: ${this.score} out of ${this.maxQuestions}</p>
                                 <button id="restartBtn">Restart Quiz</button>`;
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            homeScreen.classList.remove('hidden');
            mainElement.innerHTML = '';
        });
    }
}

// Initialize the QuizManager
const quizManager = new QuizManager();

// Event listeners for language and difficulty selection
document.querySelectorAll('.langBtn').forEach(button => {
    button.addEventListener('click', (event) => {
        const language = event.target.textContent.split(' ')[1];
        document.querySelector('.difficulty-select').classList.remove('hidden');
        document.querySelectorAll('.levelBtn').forEach(levelButton => {
            levelButton.addEventListener('click', (event) => {
                const level = event.target.dataset.level;
                quizManager.startQuiz(language, level);
                document.getElementById('homeScreen').classList.add('hidden');
                document.getElementById('quizScreen').classList.remove('hidden');
            });
        });
    });
});

// Event listener for the start button
document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('popup').classList.remove('hidden');
});

// Close popup functionality
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('popup').classList.add('hidden');
});

// Add any additional functionality as needed
