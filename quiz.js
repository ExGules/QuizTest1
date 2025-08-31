// Данные викторины
const quizData = [
    {
        question: "Какой оператор используется для присваивания значения переменной?",
        type: "multiple",
        options: ["=", "==", "===", ":="],
        correctAnswer: "="
    },
    {
        question: "Как объявить переменную в JavaScript?",
        type: "multiple", 
        options: ["variable x;", "var x;", "let x;", "const x;"],
        correctAnswer: "var x;"
    },
    {
        question: "Что такое DOM в JavaScript?",
        type: "text",
        correctAnswer: "Document Object Model"
    },
    {
        question: "Какой метод добавляет элемент в конец массива?",
        type: "multiple",
        options: ["append()", "push()", "add()", "insert()"],
        correctAnswer: "push()"
    },
    {
        question: "Что выведет этот код: console.log('5' + 3);?",
        type: "multiple",
        options: ["8", "53", "Ошибка", "undefined"],
        correctAnswer: "53"
    },
    {
        question: "Как добавить комментарий в JavaScript?",
        type: "multiple",
        options: [
            "<!-- комментарий -->",
            "// комментарий",
            "** комментарий **",
            "/* комментарий */"
        ],
        correctAnswer: "// комментарий"
    }
];

// Переменные состояния
let currentQuestionIndex = 0;
let score = 0;

// Элементы DOM
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const textInputContainer = document.getElementById('text-input-container');
const textAnswerInput = document.getElementById('text-answer');
const submitTextBtn = document.getElementById('submit-text-btn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');

// Начало теста
startBtn.addEventListener('click', startQuiz); //нажатие на кнопку начать тест
restartBtn.addEventListener('click', restartQuiz); // нажатие на кнопку перезапустить тест

function startQuiz() {
    // Скрываем начальный экран, показываем вопросы
    startScreen.style.display = 'none';
    questionScreen.style.display = 'block';
    
    // Сбрасываем состояние
    currentQuestionIndex = 0; // старт с первого вопроса 0 в массиве 
    score = 0; // очки
    
    // Загружаем первый вопрос
    loadQuestion();
}

function loadQuestion() { //создание функции загрузки
    const question = quizData[currentQuestionIndex]; // создаем первый вопрос из данных викторины
    
    // Показываем вопрос
    questionElement.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
    
    // Очищаем предыдущие варианты и feedback
    optionsContainer.innerHTML = '';
    feedbackElement.innerHTML = '';
    feedbackElement.className = '';
    
    // Показываем соответствующий тип ответа
    if (question.type === "multiple") {
        textInputContainer.style.display = 'none';
        optionsContainer.style.display = 'block';
        
        // Создаем кнопки вариантов ответов
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    } else {
        optionsContainer.style.display = 'none';
        textInputContainer.style.display = 'block';
        textAnswerInput.value = '';
    }
}

function checkAnswer(userAnswer) {
    const question = quizData[currentQuestionIndex];
    const correctAnswer = question.correctAnswer;
    
    // Проверяем ответ
    if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
        score++;
        showFeedback("Правильно! ✓", "correct");
    } else {
        showFeedback(`Неправильно! Правильный ответ: ${correctAnswer}`, "incorrect");
    }
    
    // Ждем 1.5 секунды и переходим к следующему вопросу
    setTimeout(nextQuestion, 1500);
}

function showFeedback(message, className) {
    feedbackElement.textContent = message;
    feedbackElement.className = className;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Скрываем вопросы, показываем результаты
    questionScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    // Показываем счет
    scoreElement.textContent = `Ваш результат: ${score} из ${quizData.length}`;
}

function restartQuiz() {
    // Скрываем результаты, показываем начальный экран
    resultScreen.style.display = 'none';
    startScreen.style.display = 'block';
}

// Обработчик для текстового ответа
submitTextBtn.addEventListener('click', () => {
    if (textAnswerInput.value.trim()) {
        checkAnswer(textAnswerInput.value);
    }
});

// Обработчик Enter для текстового поля
textAnswerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && textAnswerInput.value.trim()) {
        checkAnswer(textAnswerInput.value);
    }
});