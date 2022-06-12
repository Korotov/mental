const synth = window.speechSynthesis;

const $form = document.querySelector('.task-form');
const $question = document.querySelector('.task_question');
const $answer = document.querySelector('.task_answer');
const $result = document.querySelector('.task_result');
let currentQuestion = generateNumsForAddition();
showTask();
function showTask() {
    $result.innerHTML = '';
    if (currentQuestion.length === 2) {
        $question.innerHTML = `${currentQuestion[0]} ${(currentQuestion[1] < 0) ? ' - ' + Math.abs(currentQuestion[1]) : ' + ' + currentQuestion[1]}`;
        const speechText = '';
        const speechUter = new SpeechSynthesisUtterance(`${currentQuestion[0]} ${(currentQuestion[1] < 0) ? '  минус ' + Math.abs(currentQuestion[1]) : ' плюс ' + currentQuestion[1]}`);
        speechUter.rate = 1;
        speechUter.lang = 'ru-Ru';
        speechUter.pitch = 3;
        synth.speak(speechUter);
        $answer.disabled = false;
        $answer.value = '';
        $answer.focus();
        $result.classList.remove('task_question__error', 'task_question__success');
        $question.classList.add('task_question__slide');
    }
    else return //TODO add long question version
}
$form.addEventListener('submit', (e) => {
    e.preventDefault();
    $answer.disabled = true;
    const sum = currentQuestion.reduce((partialSum, el) => partialSum + el, 0);
    const answer = parseInt($answer.value);
    if (!isNaN(answer) && sum === answer) {
        $result.innerHTML+= `Верно!`;
        $result.classList.add('task_question__success')
    }
    else {
        $result.innerHTML+= `Не верно!`;
        $result.classList.add('task_question__error')
    }
    $question.classList.remove('task_question__slide');
    setTimeout(()=>{
        currentQuestion = generateNumsForAddition();
        showTask();
    }, 1500) //TODO take from settings
})
function generateNumsForAddition(count = 2, max = 9, maxSum = 20) {
    let list = [];
    let ssum = 0;
    for (i=0; i<count; i++) {
        const nmin = (ssum-max >= 0) ? -max : -ssum;
        const nmax = (ssum + max >= maxSum) ? maxSum - ssum : max;
        const n = random(nmin, nmax);
        ssum += n;
        list.push(n);
    }
    return list;
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return (rand === 0) ? random(min, max) : rand; //Максимум и минимум включаются, 0 исключается 
  }