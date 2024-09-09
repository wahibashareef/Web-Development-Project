const questions = [
    {
        question: "I am always infront of you, but you cannot see me. What am I?",
        options: ["Shadow", "Future", "Mirror", "Past"],
        correctAns: "Future"
    },
    {
        question: "I have two hands but cannot clap. What am I?",
        options: ["Man", "Handset", "Bird", "Clock"],
        correctAns: "Clock"
    },
    {
        question: "What goes in the water black and comes out red?",
        options: ["A Crab", "A Turtle", "A Snake", "A Lobster"],
        correctAns: "A Lobster"
    },
    {
        question: "Which of these months has 28 days?",
        options: ["January", "February", "December", "All"],
        correctAns: "All"
    },
    {
        question: "Which is the most curious letter?",
        options: ["Letter 'U'", "Letter 'I'", "Letter 'Y'", "Letter 'X'"],
        correctAns: "Letter 'Y'"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let optionSelected = false;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const questionContainer = document.querySelector('.question-container');
const welcomeMsg = document.getElementById('welcome-message');


function displayQuestion() {
    resetOptions();
    optionSelected = false;

    //Access the current question.
    const currentQuestion = questions[currentQuestionIndex];

    //Display the Question text.
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement("label");
        optionElement.classList.add("option");
        optionElement.innerHTML = `
            <input type="radio" name="quiz" value="${option}">
            ${option}
        `;
        optionsElement.appendChild(optionElement);

        optionElement.addEventListener('click', () => {
            if (!optionSelected) { //only allow selection once 
                optionSelected = true;

                //disable further clicks on options to avoid multiple increment
                const allOptions = document.querySelectorAll(".option");
                allOptions.forEach(opt => opt.style.pointerEvents = "none");

                selectOption(optionElement, option, currentQuestion.correctAns);
                nextBtn.disabled = false;
                nextBtn.style.opacity = "1";
            }
        });
    });

    //show 'next' btn if it's not the last question
    if (currentQuestionIndex < questions.length - 1) {
        nextBtn.classList.remove("hidden");
        submitBtn.classList.add("hidden");
    } else {
        //show 'submit' btn if it's the last question
        nextBtn.classList.add("hidden");
        submitBtn.classList.remove("hidden");
    }
}

function resetOptions() {
    optionsElement.innerHTML = "";
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
}

function selectOption(optionElement, selectedOption, correctAns) {
    const allOptions =document.querySelectorAll(".option");
    allOptions.forEach(opt => {
        opt.classList.add("selected");
        opt.style.pointerEvents = "none";
    });

    if (selectedOption === correctAns) {
        optionElement.classList.add("correct");
        score++;
    }else {
        optionElement.classList.add("incorrect");
        const correctElement = Array.from(allOptions).find(opt => opt.textContent.trim() === correctAns);
        correctElement.classList.add("correct");
    }
}

startBtn.addEventListener('click', () => {
    //hide the start button and show the question container
    startBtn.classList.add('hidden');
    welcomeMsg.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    displayQuestion(); 
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    optionsElement.innerHTML = "";
    nextBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
});

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    restartBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    startBtn.classList.remove('hidden');
    questionContainer.classList.add('hidden');
    welcomeMsg.classList.remove('hidden');
});
