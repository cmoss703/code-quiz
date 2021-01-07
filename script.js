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
var prevScores = document.querySelector("#prevScores")
var userInitials = document.querySelector("#userInitials");
var saveUser = document.querySelector("#saveUser");
var displayInitials = document.querySelector("#displayInitials");

var timeLeft = 60;
var timer = document.querySelector("#timer");
var timerID;

// questions were created as objects with an array for the answers

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
    answers: ["script", "js", "javascript", "scripting"],
    correctAnswer: "script"
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: ["function = myFunction()", "function myFunction()", "function:myFunction()", "function myFunction"],
    correctAnswer: "function myFunction()"
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    answers: ["ceil(x,y)", "top(x,y)", "Math.max(x,y)", "Math.ceil(x,y)"],
    correctAnswer: "Math.ceil(x,y)"
  }
];

function startQuiz() {

  // hides start button and warning text when button is clicked

  document.querySelector("#startOnly").style.display = "none";

  // show quiz block

  document.querySelector("#quizWindow").style.display = "block";

  // start timer

  timerID = setInterval(countTime, 1000);

  // add content from myQuestions to quiz window

  createQuestions();

}

// This function takes each question and inserts the criteria into the quix window.

function createQuestions() {

  questionDiv.innerHTML = myQuestions[qIndex].question;

  answerA.innerHTML = myQuestions[qIndex].answers[0];
  answerB.innerHTML = myQuestions[qIndex].answers[1];
  answerC.innerHTML = myQuestions[qIndex].answers[2];
  answerD.innerHTML = myQuestions[qIndex].answers[3];
}

// Since this function is only called when a button is clicked (a question is answered), 
// it uses this.innerhtml to check whether the text of the button that was clicked matches the correct answer.

function checkAnswer() {

  // If the answer matches, some text is shown above the next question to tell you that it was right. 
  // it then adds one to the number of correct answers.

  if (this.innerHTML === myQuestions[qIndex].correctAnswer) {
    answerDiv.innerHTML = "Correct!";
    rightAnswers++;

    // If the answer does not match, text is shown to tell you it was wrong. 
    // One is added to the number of wrong answers.
    // 10 seconds are subtracted from the timer.  

  } else {
    answerDiv.innerHTML = "Wrong, sorry! 10 seconds subtracted.";
    wrongAnswers++;
    timeLeft -= 10;
  }

  // As long as the qIndex is less than the number of questions, another question will be shown after one is answered.

  if (qIndex < myQuestions.length - 1) {
    qIndex++;
    createQuestions();

    // Once all the questions have been answered (the qIndex matches the number of questions), the timer stops and the score is displayed. 

  } else {
    clearInterval(timerID);
    displayScore();
  }
}

// the timer will count down until it hits zero (or the interval is cleared in another function)
// If the timer ever hits zero, an alert message is shown and the score is displayed. The quiz is over.

function countTime() {
  timeLeft--;
  timer.innerHTML = "Timer: " + (timeLeft) + " seconds left";

  if (timeLeft <= 0) {
    clearInterval(timerID);
    alert("Oops! Out of time!");
    displayScore();
  }
}

// When the score is displayed, the quiz block is hidden and the score block is shown. 
// The amounts of right and wrong answers are shown.
// The history of the previous scores and initials are also displayed.
// The score is saved and able to be stored when the user enters their initials.

function displayScore() {

  document.querySelector("#quizWindow").style.display = "none";
  document.querySelector("#scoreWindow").style.display = "block";

  userScore.innerHTML = "You got " + rightAnswers + " questions correct and " + wrongAnswers + " questions incorrect!";

  var history = JSON.parse(localStorage.getItem("initials")) || [];
  var htmldata = "";
  for (var i = 0; i < history.length; i++) {
    htmldata += `<h5>User : ${history[i].user}  Score:${history[i].score}</h5>`;
  }
  displayInitials.innerHTML = htmldata;
}

// When the save button is clicked, the users initials and score are added to the list of saved items.

saveUser.addEventListener("click", function () {
  var user = userInitials.value;
  var history = JSON.parse(localStorage.getItem("initials")) || [];
  history.push({
    user: user,
    score: rightAnswers
  });
  var htmldata = "";
  for (var i = 0; i < history.length; i++) {
    htmldata += `<h5>User: ${history[i].user}  - Score:  ${history[i].score}</h5>`;
  }
  displayInitials.innerHTML = htmldata;
  localStorage.setItem("initials", JSON.stringify(history));
});

// These are the other button listeners. for the start button, answer buttons, and scores button.

startBtn.addEventListener("click", startQuiz);
answerA.addEventListener("click", checkAnswer);
answerB.addEventListener("click", checkAnswer);
answerC.addEventListener("click", checkAnswer);
answerD.addEventListener("click", checkAnswer);
prevScores.addEventListener("click", displayScore);