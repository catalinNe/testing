const quizContainer = document.getElementById('quiz');
const countersContainer = document.getElementById('counters');
const submitButton = document.getElementById('submit');
const checkAnswersButton = document.getElementById('checkAnswers');
const skipButton = document.getElementById('skip');
const inputFile = document.getElementById('inputFile');
//const iniLoad = document.getElementsByClassName('pre-quiz-wrap')[0];
const loadUrl = document.getElementById('loadUrl');
const urlInput = document.getElementById('urlInput');
const howToLoad = document.getElementsByName('howToLoad');
//const divLocal = document.getElementsByClassName('divLocal')[0];
const createList = document.getElementById('createList');
const customList = document.getElementById('customList');
const divApi = document.getElementsByClassName('divApi')[0];
const welcome = document.getElementById('welcome');
const startAppButton = document.getElementById('startApp');
const startQuizButton = document.getElementById('startQuiz');
const loadQuizButton = document.getElementById('loadQuiz');
const revealAnswersButton = document.getElementById('revealAnswers');
const sections = document.getElementsByClassName('section');
let myQuestions;
let currQuestion;
let numCorrect = 0;
let numQ = 0;
const react = [{
    "question": "Q1. test one",
    "answers": [{
        "wrong": "Web development Framework"
      },
      {
        "right": "JavaScript Library"
      },
      {
        "right": "jQuery"
      },
      {
        "right": "Web Server"
      }
    ]
  },
  {
    "question": "Q2. test 2",
    "answers": [{
        "wrong": "Web development Framework"
      },
      {
        "right": "JavaScript Library"
      },
      {
        "wrong": "jQuery"
      },
      {
        "right": "Web Server"
      }
    ]
  }
];

const sources = ['JavaScript', 'React', 'Bootstrap'];

function getRandomQuestion(max) {
  let random = Math.floor(Math.random() * max);
  //console.log("random="+random);
  return [...[myQuestions[random]]];
}

createQuiz(currQuestion);

function createQuiz(questions) {
  function createQuestions(questions) {
    //console.log('qq');
    let output = [];
    let answers;
    for (let i = 0; i < questions.length; i++) {
      answers = [];
      let countRights = 0;

      for (let letter in questions[i].answers) {
        let valoare = questions[i].answers[letter].wrong ? "wrong" : "right";
        answers.push(
          '<div><label value="' + valoare + '">' +
          '<input type="radio" name="question' + i + '" value="' + valoare + '">' +
          letter + ': ' +
          (questions[i].answers[letter].wrong || questions[i].answers[letter].right) +
          '</label></div>'
        );
        countRights += valoare === "right" ? 1 : 0;
      }
      console.log('how many-' + countRights);
      let answersString = answers.join('');
      if (countRights > 1) {
        answersString = answersString.replaceAll('radio', 'checkbox');
        console.log(answersString);
      }
      output.push(
        '<div class="question">' + questions[i].question + '</div>' +
        '<div class="answers">' + answersString + '</div>'
      );
    }
    quizContainer.innerHTML = output.join('');
    checkAnswersButton.disabled = 'true';
    quizContainer.addEventListener('change', function(e) {
      checkAnswersButton.disabled = false;
    })
  }

  function trackResults(questions) {
    let answerContainers = quizContainer.querySelectorAll('.answers');
    let userAnswer = '';
    let prevInfo = '';
    let rightAnswers = document.querySelectorAll("[value='right']");
    for (let i = 0; i < questions.length; i++) {
      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;
      if (userAnswer == 'right') {
        numCorrect++;
      } else {
        prevInfo = prevInfo + '<br> previous right answer was ' + rightAnswers[i].innerHTML
      };
    }
    numQ = numQ + questions.length;
    countersContainer.innerHTML = 'Correct answers = ' + numCorrect + ' out of ' + numQ + ' questions' + prevInfo;
  }

  submitButton.onclick = function() {
    trackResults(currQuestion);
    createQuestions(getRandomQuestion(myQuestions.length));
  }

  skipButton.onclick = function() {
    createQuestions(getRandomQuestion(myQuestions.length));
  }

  checkAnswersButton.onclick = function() {
    checkAnswers(currQuestion);
  }

  function checkAnswers(questions) {
    let answerContainers = quizContainer.querySelectorAll('.answers');
    let userAnswer = '';
    for (let i = 0; i < questions.length; i++) {
      userAnswer = answerContainers[i].querySelector('input:checked');
      if (userAnswer.value == 'right') {
        userAnswer.parentElement.style.backgroundColor = 'lightgreen';
      } else {
        userAnswer.parentElement.style.backgroundColor = 'pink';
      }
    }
    numQ++;
  }

  revealAnswersButton.onclick = function() {
    let answers = document.querySelectorAll('input');
    answers.forEach(element => {
      if (element.value == 'right') {
        element.parentElement.style.backgroundColor = 'lightgreen';
      }
      if (element.value == 'wrong') {
        element.parentElement.style.backgroundColor = 'pink';
      }

    });
  }

  inputFile.onchange = function() {
    // filesList.innerHTML = "<hr><h3>Select which files to load</h3>"
    // for (let i = 0; i < this.files.length; i++) {
    //     filesList.innerHTML += `<div><input type="checkbox" value="${this.files[i].name}">${this.files[i].name}</div>`;
    //     startQuizButton.style.display = 'block';
    // }
    /* let fileContent = new FileReader();
    fileContent.onload = function () {
        myQuestions = react;
        //myQuestions = JSON.parse(fileContent.result);
        
        currQuestion = getRandomQuestion(myQuestions.length);
        console.log('myq='+currQuestion);
    }
    fileContent.readAsText(inputFile.files[0]); */

    customList.innerHTML = "<h4>Select files to load into quiz</h4>";
    for (let i = 0; i < this.files.length; i++) {
      customList.innerHTML += `<div><input type="checkbox" value="${this.files[i].name}">${this.files[i].name}</div>`;
      startQuizButton.style.display = 'block';
    }
  }

  ////

  loadQuizButton.onclick = function() {
    let selectedFiles = document.querySelector("#createList").querySelectorAll("input[type='checkbox']:checked");
    //console.log(selectedFiles);
    let fileContent = new FileReader();
    fileContent.onload = function () {
        myQuestions = react;
        //myQuestions = JSON.parse(fileContent.result);
        
        currQuestion = getRandomQuestion(myQuestions.length);
        console.log('myq='+currQuestion);
    }
    fileContent.readAsText(inputFile.files[0]); 


    selectedFiles.forEach(element => {
      console.log('loading file-' + element.value);
    });
    currQuestion = getRandomQuestion(myQuestions.length);
    console.log(currQuestion);
    createQuestions(currQuestion);

    for (i = 0; i < sections.length; i++) {
      sections[i].style.display = 'none';
    }
    let quizButtons = document.getElementsByClassName('quizButton');
    //console.log(quizButtons);
    [...quizButtons].forEach(element => {
      element.style.display = 'inline-block'
    });
  }
  ////
  startQuizButton.onclick = function() {
    let selectedFiles = document.querySelector("#filesList").querySelectorAll("input[type='checkbox']:checked");
    //console.log(selectedFiles);
    selectedFiles.forEach(element => {
      console.log('loading file-' + element.value);
    });
    console.log('start quiz');

  }

  startAppButton.onclick = function() {
    createList.style.display = 'block';
    filesList.innerHTML = filesList.innerHTML + "<hr><h4>Want to run a short demo instead?</h4><h5>Select from demo topics</h5>"
    for (let i = 0; i < sources.length; i++) {
      filesList.innerHTML += `<div><input type="checkbox" value="${sources[i]}">${sources[i]}</div>`;
    }
    startQuizButton.style.display = 'block';
  }


}
