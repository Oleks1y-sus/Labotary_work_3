// Завдання 1. Функція-генератор, яка нескінченно генерує випадкове число між min і max
function* randomGenerator(min, max) {
  while (true) {
    yield Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
let minLimit, maxLimit;
// Цикл перевірки для мінімального числа (тільки число, без порожнього вводу/скасування)
while (true) {
  const inputMin = prompt("Введіть мінімальне число:", 1);
  if (inputMin !== null && inputMin.trim() !== "" && !isNaN(inputMin)) {
    minLimit = parseInt(inputMin, 10);
    break;
  }
  alert("Помилка! Потрібно ввести коректне число.");
}

// Цикл перевірки для максимального числа (має бути числом і не меншим за min)
while (true) {
  const inputMax = prompt("Введіть максимальне число:", 100);
  if (inputMax !== null && inputMax.trim() !== "" && !isNaN(inputMax)) {
    maxLimit = parseInt(inputMax, 10);
    if (maxLimit >= minLimit) {
      break;
    }
    alert("Максимальне число не може бути меншим за мінімальне!");
    continue;
  }
  alert("Помилка! Потрібно ввести коректне число.");
}
// Створюємо екземпляр генератора
const generator = randomGenerator(minLimit, maxLimit);
// Отримуємо посилання на елементи сторінки
const nextBtn = document.getElementById('next');
const outDiv = document.getElementById('out');
// Обробник кліку на кнопку
nextBtn.addEventListener('click', () => {
    const nextValue = generator.next().value;
    outDiv.textContent = `Випадкове число: ${nextValue}`;
});


// Завдання 2. Проєкт «Генератор паролів» (використання `next(value)`)


function* passwordGenerator() {
  let password = "";
  while (true) {
    // Отримуємо символ через .next(value)
    const char = yield password;
    
    // Якщо користувач хоче завершити введення ('done')
    if (char === 'done') {
      // Перевіряємо всередині генератора, чи пароль не порожній
      if (password.length === 0) {
        // Якщо порожній — повертаємо повідомлення про помилку замість завершення
        yield alert("Пароль не може бути порожнім! Введіть хоча б один символ.");
        continue; // Продовжуємо цикл далі
      }
      // Якщо все ок — завершуємо роботу і повертаємо пароль
      return password;
    }
    
    // Якщо прийшов не порожній рядок/символ, додаємо його до пароля
    if (char && char.trim() !== "") {
      password += char.trim();
    }
  }
}

const pwdGen = passwordGenerator();
pwdGen.next(); // Запускаємо генератор до першого yield

let currentResult;
while (true) {
  const userInput = prompt("Введіть символ для пароля (або напишіть 'done' для завершення):");
  
  if (userInput === null) {
    alert("Генерацію скасовано.");
    currentResult = null;
    break;
  }
  
  // Передаємо значення у генератор
  const res = pwdGen.next(userInput.trim());
  
  // Якщо генератор завершив роботу (res.done === true), отримуємо готовий пароль
  if (res.done) {
    currentResult = res.value;
    break;
  }

}

if (currentResult) {
  alert(`Готовий пароль: ${currentResult}`);
}


// Завдання 3: Проєкт «Генератор діалогів» (ChatBot)

function* chatBot() {
  // Крок 1
  const name = yield "Hi! What is your name?";
  
  // Крок 2
  const feeling = yield `Nice to meet you, ${name}! How are you?`;
  
  // Крок 3 (Завершення)
  return "Goodbye!";
}

const bot = chatBot();

// Перший крок. Отримуємо перше повідомлення бота
let step = bot.next();
while (!step.done) {
  // Виводимо запит бота через prompt і отримуємо відповідь користувача
  const answer = prompt(step.value);
  
  // Передаємо відповідь назад у генератор і переходимо до наступного кроку
  if (answer === null) break; // Захист від скасування
  step = bot.next(answer);
}
// Виводимо фінальне повідомлення бота
alert(step.value);

// Завдання 4: Втрата контексту методом та його фіксація
// Запитуємо ім'я у користувача
const userName = prompt("Введіть ваше ім'я:", "Alex");

const user = {
  name: userName,
  say() {
    alert(`Hello, ${this.name}`);
  }
};

const btn = document.getElementById('hello');

// Проблема при передачі методу як обробника події this втрачається (буде посилатися на саму кнопку)
// btn.addEventListener('click', user.say);

// Вирішення 1. Використання стрілкової функції (замикає контекст об'єкта)
btn.addEventListener('click', () => {
  user.say();
});

// Вирішення 2 (альтернативне): Використання методу .bind()
// btn.addEventListener('click', user.say.bind(user));