//set the original time to take
var t = 300;
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const timeRemainingText = document.getElementById('time-remaining');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question:"Commonly used data types DO Not Include:",
        choice1:"strings",
        choice2:"booleans",
        choice3:"alerts",
        choice4:"numbers",
        answer:3
    },
    {
        question:"The condition in an if/else statement is enclosed with ____",
        choice1:"quotes",
        choice2:"curly brackets",
        choice3:"parenthesis",
        choice4:"square brackets",
        answer:3
    },
    {
        question:"Array in JavaScript can be used to store ____",
        choice1:"numbers and strings",
        choice2:"other arrays",
        choice3:"booleans",
        choice4:"all of the above",
        answer:4
    },
    {
        question:"String values must be enclosed within ____ when being assigned to variables.",
        choice1:"commas",
        choice2:"curly brackets",
        choice3:"quotes",
        choice4:"parenthesis",
        answer:3
    },
    {
        question:"A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1:"JavaScript",
        choice2:"terminal/bash",
        choice3:"for loops",
        choice4:"console.log",
        answer:4
    },
];

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    timer();
    getNewQuestion();
};

timer = () => {
    t--;
    timeRemainingText.innerText = t;
    if (t<=0) {
        // Save the score
        localStorage.setItem('mostRecentScore',score);
        //go to the end page
        return window.location.assign('./end.html');
    };
    setTimeout(function() { 
        timer() 
    },1000);
};



getNewQuestion = () => {
    if (availableQuestions===0 || questionCounter>= MAX_QUESTIONS) {
        // Save the score
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('./end.html');
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice => { 
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number];
    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        // create a correct class and incorrect class
        let classToApply = "incorrect";
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
            incrementScore(CORRECT_BONUS);
        } else {
            classToApply = "incorrect";
            // punish the time if the answer is incorrect by 10secs
            timeRemainingText.innerText -= 10;
            t = timeRemainingText.innerText;
        }
        // apply the color according to the answer for 1000 ms before moving to next question
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
startGame();