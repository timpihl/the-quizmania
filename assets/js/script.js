const gameName = 'The Quizmania'
const body = document.getElementById('body')
const userform = document.getElementById('userform')
const score = document.getElementById('score')
const scoretitle = document.getElementById('scoretitle')
const scorecount = document.getElementById('scorecount')
const quiz = document.getElementById('quiz')

const feedback_button = document.getElementById('feedback_button')

var count = 0

const genres = [
    { name: 'Books', id: 10 },
    { name: 'Film', id: 11 },
    { name: 'Music', id: 12 },
    { name: 'Games', id: 15 }
]

const levels = [
    { name: 'easy', id: 100 },
    { name: 'medium', id: 200 },
    { name: 'hard', id: 300 }
]

function startup() {
    test1()
}

function test1() {
    //document.getElementById('subtitle').innerText = 'Enter your name: '
    userform.onsubmit = userSubmit
}

function userSubmit() {
    username = document.getElementById('name').value
    test2()
    return false
}

function test2() {
    subtitle.innerText = `Feeling lucky ${username}?`
    userform.style.display = 'none'
    score.style.display = 'flex'
    feedback_button.style.display = 'block'
    feedback_button.onclick = showFeedback
    theGame()
}

function theGame() {

    let col = 0
    genres.forEach(genre => {

        col++
        const column = document.createElement('div')
        const columnTitle = document.createElement('div')

        column.classList.add('genre-column')
        column.classList.add(`col-${col}`)
        columnTitle.classList.add('col-title')
        columnTitle.innerHTML = genre.name

        quiz.append(column)
        column.append(columnTitle)

        levels.forEach(level => {

            const card = document.createElement('div')
            const card_inner = document.createElement('div')
            const card_front = document.createElement('div')
            const card_back = document.createElement('div')
            const card_value = document.createElement('div')
            const card_question = document.createElement('div')
            const card_buttons = document.createElement('div')
            const trueButton = document.createElement('button')
            const falseButton = document.createElement('button')

            column.append(card)
            card.append(card_inner)
            card_inner.append(card_front, card_back)
            card_front.append(card_value)
            card_back.append(card_question, card_buttons)
            card_buttons.append(trueButton, falseButton)

            card.classList.add('card')
            card_inner.classList.add('card_inner')
            card_front.classList.add('card_front')
            card_back.classList.add('card_back')
            card_value.classList.add('value')
            card_question.classList.add('question')
            card_buttons.classList.add('buttons')
            trueButton.classList.add('true')
            falseButton.classList.add('false')

            card_value.innerHTML = level.id
            trueButton.innerHTML = 'True'
            falseButton.innerHTML = 'False'

            fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level.name}&type=boolean`)
                .then(response => response.json())
                .then(response => {
                    card.setAttribute('question', response.results[0].question);
                    card.setAttribute('answer', response.results[0].correct_answer);
                    card.setAttribute('value', level.id);
                    card_question.innerHTML = card.getAttribute('question');
                })

            card.onclick = cardturns
            trueButton.onclick = getResult
            falseButton.onclick = getResult
        })
    })
}

function cardturns() {
    this.classList.toggle('card--flipped')
}

function getResult() {
    const card = this.parentElement.parentElement.parentElement.parentElement
    if (card.getAttribute('answer') === this.innerHTML) {
        count = count + parseInt(card.getAttribute('value'))
        scorecount.innerHTML = parseInt(scorecount.innerText) + parseInt(card.getAttribute('value'))
        card.classList.add('card_correct')
        card.innerHTML = card.getAttribute('value')
    } else {
        card.classList.add('card_false')
        card.innerHTML = 0
    }
}

function getResult() {
    const card = this.parentElement.parentElement.parentElement.parentElement
    if (card.getAttribute('answer') === this.innerHTML) {
        count = count + parseInt(card.getAttribute('value'))
        scorecount.innerHTML = parseInt(scorecount.innerText) + parseInt(card.getAttribute('value'))
        card.classList.add('card_correct')
        card.innerHTML = card.getAttribute('value')
    } else {
        card.classList.add('card_false')
        card.innerHTML = 0
    }
}

function showFeedback() {
    const feedback = document.getElementById('feedback')
    const feedback_close = document.getElementById('feedback_close')
    const feedback_textarea = document.getElementById('feedback_textarea')
    feedback.style.display = 'block'
    feedback_textarea.innerHTML = `Enter you feedback here anonymously ofcourse ${username} ;)`
    feedback_close.onclick = closeFeedback
}

function feedbackSubmit() {
    console.log(document.getElementById('feedback_textarea').value)
    closeFeedback()
    return false
}

function closeFeedback() {
    feedback.style.display = "none"
}

startup()