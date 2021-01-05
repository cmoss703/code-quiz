var qIndex = 0;
var currentqIndex = 0;
var startBtn = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var question = document.querySelector("#question");
var quizWindow = document.querySelector("#quizWindow");
// var hideStart = document.querySelector("#startOnly");

function startQuiz() {

    // hides start button and warning text when button is clicked

    document.querySelector("#startOnly").style.visibility = "hidden";

    // show quizWindow - want it to be hidden by default
    
    // add content to quiz window
};

startBtn.addEventListener("click", startQuiz)