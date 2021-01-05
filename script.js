var qIndex = 0;
var currentqIndex = 0;
var startBtn = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var question = document.querySelector("#question");
// var quizWindow = document.querySelector("#quizWindow");
// var hideStart = document.querySelector("#startOnly");

const myQuestions = [
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      answers: {
        a: "round(7.25)",
        b: "Math.rnd(7.25)",
        c: "Math.round(7.25)",
        d: "rnd(7.25)"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm",
        d: "something else"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];

function startQuiz() {

    // hides start button and warning text when button is clicked

    document.querySelector("#startOnly").style.visibility = "hidden";

    // show quizWindow - want it to be hidden by default

    document.querySelector("#quizWindow").style.visibility = "visible";

    // start timer
    
    // add content from myQuestions to quiz window

    myQuestions.forEach(
        (currentQuestion, qIndex)
    )

    // IF answer is incorrect, subtract 10 seconds from the clock
};

startBtn.addEventListener("click", startQuiz)