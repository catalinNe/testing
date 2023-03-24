
const quizContainer = document.getElementById('quiz');
const countersContainer = document.getElementById('counters');
const submitButton = document.getElementById('submit');
const checkAnswersButton = document.getElementById('checkAnswers');
const skipButton = document.getElementById('skip');
const inputFile = document.getElementById('inputFile');
const iniLoad = document.getElementsByClassName('pre-quiz-wrap')[0];
const loadUrl = document.getElementById('loadUrl');
const urlInput = document.getElementById('urlInput');
const howToLoad = document.getElementsByName('howToLoad');
const divLocal = document.getElementsByClassName('divLocal')[0];
const divApi = document.getElementsByClassName('divApi')[0];
const welcome = document.getElementById('welcome');
const startAppButton = document.getElementById('startApp');
const startQuizButton = document.getElementById('startQuiz');
const revealAnswersButton = document.getElementById('revealAnswers');
const sections = document.getElementsByClassName('section');
let myQuestions;
let currQuestion;
let numCorrect = 0;
let numQ = 0;

function getRandomQuestion(max) {
    let random = Math.floor(Math.random() * max);
    return [...[myQuestions[random]]];
}

createQuiz(currQuestion);

function createQuiz(questions) {
    function createQuestions(questions) {
        let output = [];
        let answers;
        for (let i = 0; i < questions.length; i++) {
            answers = [];
            for (letter in questions[i].answers) {
                let valoare = questions[i].answers[letter].wrong ? "wrong" : "right";
                answers.push(
                    '<div><label value="' + valoare + '">'
                    + '<input type="radio" name="question' + i + '" value="' + valoare + '">'
                    + letter + ': '
                    + (questions[i].answers[letter].wrong || questions[i].answers[letter].right)
                    + '</label></div>'
                );
            }
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
        quizContainer.innerHTML = output.join('');
        checkAnswersButton.disabled = 'true';
        quizContainer.addEventListener('change', function (e) {
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
            }
            else { prevInfo = prevInfo + '<br> previous right answer was ' + rightAnswers[i].innerHTML };
        }
        numQ = numQ + questions.length;
        countersContainer.innerHTML = 'Correct answers = ' + numCorrect + ' out of ' + numQ + ' questions' + prevInfo;
    }

    submitButton.onclick = function () {
        trackResults(currQuestion);
        createQuestions(getRandomQuestion(myQuestions.length));
    }

    skipButton.onclick = function () {
        createQuestions(getRandomQuestion(myQuestions.length));
    }

    checkAnswersButton.onclick = function () {
        checkAnswers(currQuestion);
    }

    function checkAnswers(questions) {
        let answerContainers = quizContainer.querySelectorAll('.answers');
        let userAnswer = '';
        for (let i = 0; i < questions.length; i++) {
            userAnswer = answerContainers[i].querySelector('input:checked');
            if (userAnswer.value == 'right') {
                userAnswer.parentElement.style.backgroundColor = 'lightgreen';
            }
            else { userAnswer.parentElement.style.backgroundColor = 'pink'; }
        }
        numQ++;
    }

    revealAnswersButton.onclick = function () {
        let answers = document.querySelectorAll('input');
        answers.forEach(element => {
            if (element.value == 'right') { element.parentElement.style.backgroundColor = 'lightgreen'; }
            if (element.value == 'wrong') { element.parentElement.style.backgroundColor = 'pink'; }

        });
    }

    inputFile.onchange = function () {
        filesList.innerHTML = "<hr><h3>Select which files to load</h3>"
        for (let i = 0; i < this.files.length; i++) {
            filesList.innerHTML += `<div><input type="checkbox" value="${this.files[i].name}">${this.files[i].name}</div>`;
            startQuizButton.style.display = 'block';
        }

    }

    startQuizButton.onclick = function () {
        console.log(dataJson[0].question);
        let selectedFiles = document.querySelectorAll('input:checked');
        selectedFiles.forEach(element => {
            console.log('load file-' + element.value);
        });

        let fileContent = new FileReader();
        fileContent.onload = function () {
            myQuestions = dataJson;
            //myQuestions = JSON.parse(fileContent.result);
            currQuestion = getRandomQuestion(myQuestions.length);
            createQuestions(currQuestion);

            for (i = 0; i < sections.length; i++) {
                sections[i].style.display = 'none';
            }
            let quizButtons = document.getElementsByClassName('quizButton');
            console.log(quizButtons);
            [...quizButtons].forEach(element => { element.style.display = 'inline-block' });
        }
        fileContent.readAsText(inputFile.files[0]);
    }

    startAppButton.onclick = function () {
        divLocal.style.display = 'block';
    }


}