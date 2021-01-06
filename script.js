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

var timeLeft = 90;
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
  // {
  //   question: "Which one of these is a JavaScript package manager?",
  //   answers: {
  //     a: "Node.js",
  //     b: "TypeScript",
  //     c: "npm",
  //     d: "something else"
  //   },
  //   correctAnswer: "c"
  // },
  // {
  //   question: "Which tool can you use to ensure code quality?",
  //   answers: {
  //     a: "Angular",
  //     b: "jQuery",
  //     c: "RequireJS",
  //     d: "ESLint"
  //   },
  //   correctAnswer: "d"
  // }
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



  // myQuestions.forEach(
  //   (currentQuestion, qIndex)
  // )

  // IF answer is incorrect, subtract 10 seconds from the clock

  // create global variable for timeLeft, subtract it
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
  }

};

function createQuestions() {

  // for (var i = 0; i < myQuestions.length; i++) {
  // qIndex = myQuestions[i]
  questionDiv.innerHTML = myQuestions[qIndex].question;

  answerA.innerHTML = myQuestions[qIndex].answers[0];
  answerB.innerHTML = myQuestions[qIndex].answers[1];
  answerC.innerHTML = myQuestions[qIndex].answers[2];
  answerD.innerHTML = myQuestions[qIndex].answers[3];


  // console.log(myQuestions[i].answers)

  // for (var j = 0; j < myQuestions[i].answers.length; j++) {
  //   answerButton = document.createElement("button");
  //   answerButton.innerHTML = myQuestions[i].answers[j];
  //   answerDiv.appendChild(answerButton);

  // answerButton.addEventListener("click", function () {
  //   if (answerButton.innerHTML === myQuestions[i].correctAnswer) {
  //     alert("Correct!");

  //   } else {
  //     //timer subtract
  //     alert("Wrong, sorry")
  //   }
  // });
};

// create button in it's own function, make "for loops" their own function
// make event listener for each button 
// separate loop after buttons are created
// function call for the button is very important - buttons are a node list, you can't loop over them, change to array


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
}

function countTime() {

  timer.innerHTML = "Timer: " + (timeLeft - secondsElapsed) + " seconds left";

  if (timeLeft > 0) {
    var interval = setInterval(function () {
      secondsElapsed++;

    }, 1000);

  } else {
    alert("Oops! Time's up!");
    displayScore();

    //maybe also calculate number of questions missed?
  }
}

// function startTimer() {
//   timer.addEventListener("click", function () {
//     // checking zero because it is originally set to zero
//     if (holdInterval === 0) {
//       holdInterval = setInterval(function () {
//         secondsLeft--;
//         currentTime.textContent = "Time: " + secondsLeft;

//         if (secondsLeft <= 0) {
//           clearInterval(holdInterval);
//           allDone();
//           currentTime.textContent = "Time's up!";
//         }
//       }, 1000);
//     }
//     render(questionIndex);
//   });


startBtn.addEventListener("click", startQuiz)
answerA.addEventListener("click", checkAnswer);
answerB.addEventListener("click", checkAnswer);
answerC.addEventListener("click", checkAnswer);
answerD.addEventListener("click", checkAnswer);

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

