var startBtn = document.querySelector("#startButton");
var questionDiv = document.querySelector("#question");
var answerA = document.querySelector("#answerA");
var answerB = document.querySelector("#answerB");
var answerC = document.querySelector("#answerC");
var answerD = document.querySelector("#answerD");
var answerDiv = document.querySelector("#answerDiv");
var qIndex = 0;
var rightAnswers = 0;
var wrongAnswers = 0;
var userScore = document.querySelector("#userScore");
var userInitials = document.querySelector("#userInitials");
var saveUser = document.querySelector("#saveUser");
var displayInitials = document.querySelector("#displayInitials");

var timeLeft = 60;
var secondsElapsed = 0;
var timer = document.querySelector("#timer");

const myQuestions = [
  {
    question: "Commonly used data types do NOT include:",
    answers: ["booleans", "strings", "numbers", "alerts"],
    correctAnswer: "alerts"
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: ["round(7.25)", "Math.rnd(7.25)", "Math.round(7.25)", "rnd(7.25)"],
    correctAnswer: "Math.round(7.25)"
  },
  {
    question: "Inside which HTML \<\> element do we put the JavaScript?",
    answers: ["script","js","javascript","scripting"],
    correctAnswer: "script"
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: ["function = myFunction()","function myFunction()","function:myFunction()","function myFunction"],
    correctAnswer: "function myFunction()"
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    answers: ["ceil(x,y)","top(x,y)","Math.max(x,y)","Math.ceil(x,y)"],
    correctAnswer: "Math.ceil(x,y)"
  }
];

function startQuiz() {

  // hides start button and warning text when button is clicked

  document.querySelector("#startOnly").style.display = "none";

  // show quizWindow

  document.querySelector("#quizWindow").style.display = "block";

  // start timer

  countTime();

  // add content from myQuestions to quiz window

  createQuestions();

};

function createQuestions() {

  questionDiv.innerHTML = myQuestions[qIndex].question;

  answerA.innerHTML = myQuestions[qIndex].answers[0];
  answerB.innerHTML = myQuestions[qIndex].answers[1];
  answerC.innerHTML = myQuestions[qIndex].answers[2];
  answerD.innerHTML = myQuestions[qIndex].answers[3];
};

function checkAnswer() {
  if (this.innerHTML === myQuestions[qIndex].correctAnswer) {
    answerDiv.innerHTML = "Correct!";
    rightAnswers++;

  } else {
    //timer subtract
    answerDiv.innerHTML = "Wrong, sorry! 10 seconds subtracted.";
    wrongAnswers++;
    timeLeft - 10;
  };

  if (qIndex < myQuestions.length - 1) {
    qIndex++;
    createQuestions();

  } else {
    displayScore();
    clearInterval(interval);
  }
};

var interval = ""

function countTime() {

  if (timeLeft > 0) {
    interval = setInterval(function () {
      timeLeft--;
      timer.innerHTML = "Timer: " + (timeLeft) + " seconds left";

    }, 1000);

  } else if (timeLeft < 0) {
    alert("Oops! Time's up!");
    displayScore();

    //maybe also calculate number of questions missed because of time?
  }
};

function displayScore() {

  document.querySelector("#quizWindow").style.display = "none";
  document.querySelector("#scoreWindow").style.display = "block";

  userScore.innerHTML = "You got " + rightAnswers + " questions correct and " + wrongAnswers + " questions incorrect!"
  
  var history = JSON.parse(localStorage.getItem("initials")) || [];
  var htmldata = "";
  for (let i = 0; i < history.length; i++) {
    htmldata += `<h5>User : ${history[i].user}  Score:${history[i].score}</h5>`;
  }
  displayinitials.innerHTML = htmldata;
};

saveUser.addEventListener("click", function () {
  var user = userInitials.value;
  var history = JSON.parse(localStorage.getItem("initials")) || [];
  history.push({
    user: user,
    score: rightAnswers
  });
  var htmldata = "";
  for (let i = 0; i < history.length; i++) {
    htmldata += `<h5>User: ${history[i].user}  - Score: ${history[i].score}</h5>`;
  }
  displayInitials.innerHTML = htmldata;
  localStorage.setItem("initials", JSON.stringify(history));
});

startBtn.addEventListener("click", startQuiz)
answerA.addEventListener("click", checkAnswer);
answerB.addEventListener("click", checkAnswer);
answerC.addEventListener("click", checkAnswer);
answerD.addEventListener("click", checkAnswer);