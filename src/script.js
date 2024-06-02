/**
 * Проверка длины массива
 * @param {number[]} arr массив значений
 * @param {number} maxLength максимальная длина массива
 * @returns возврат '' или строка с ошибкой
 */
function checkLength(arr, maxLength = 7) {
  let messageMax = '';
  let messageMin = '';
  if (arr.length > maxLength) {
    messageMax = `Количество элементов должно быть максимум ${maxLength}. `;
  }
  if (arr.length == 0) {
    messageMin = `Количество элементов должно быть больше 0. `;
  }
  return `${messageMax}${messageMin}`;
}
function goToBeginning() {
  if (input.value == '0') {
    input.setSelectionRange(0, 0);
  }
}
/**
 * Проверка: все числа в пределах минимальных, максимальных чисел
 * @param {number[]} arr массив значений
 * @param {number} minNumber минимально возможное число
 * @param {number} maxNumber максимально возможное число
 * @returns
 */
function checkMaxMin(arr, minNumber = -10, maxNumber = 10) {
  messageMax = '';
  messageMin = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxNumber) {
      messageMax = `Элемент с индексом ${i} больше максимума. Максимум: ${maxNumber}. `;
    }
    if (arr[i] < minNumber) {
      messageMin = `Элемент с индексом ${i} меньше минимума. Минимум: ${minNumber}. `;
    }
  }

  return `${messageMax}${messageMin}`;
}
/**
 * @param {number[]} arr массив значений
 * @returns строка. Ели все ок: значение(индекс)
 * если есть ошибки на длину, макс, минимум, то строка с пояснением.
 */
function getMax(arr) {
  messageLength = checkLength(arr);
  messageMaxMin = checkMaxMin(arr);
  if (messageLength != '' || messageMaxMin != '') {
    return `Ошибка в данных: ${messageLength}${messageMaxMin}`;
  }
  extremeValue = arr[0];
  ind = 0;
  for (let i = 1; i < arr.length; i++) {
    if (extremeValue < arr[i]) {
      extremeValue = arr[i];
      ind = i;
    }
  }
  return `${extremeValue}(${ind})`;
}
/**
 * Получаем веб элемент по локатору
 * @param {string} locator локатор, по которому можно идентифицировать
 * элемент на странице. Ищет первый элемент.
 * @returns найденный элемент
 */
function getWebElement(locator) {
  return document.querySelector(locator);
}
/**
 * Проверка разрешенной длины для вывода
 * @param {string} value
 * @param {number} allowedLength
 * @returns
 */
function checkLengthValidation(value, allowedLength = 50) {
  resultValue = '';
  if (value.length > allowedLength) {
    truncatedValue = value.substring(0, allowedLength);
    resultValue = `Часть данных обрезана: ${truncatedValue}`;
  } else {
    resultValue = value;
  }
  return resultValue;
}
/**
 * срабатывает при буквах, точках, цифры больше 2
 */
function checkInput() {
  regExp = /^-?\d{1,2}(,{1}-?\d{1,2})*$/g;
  if (regExp.test(this.value)) {
    return;
  } else {
    let resultValue = checkLengthValidation(this.value);
    outputAnswer(resultValue, '#errorInput');
    hideElement(containerErrorInput, false);
    this.value = 0;
  }
}
/**
 *
 * @param {string} result то что собираемся выводить пользователю (значения вычислений, ошибки)
 * @param {string} locator локатор элемента, в который вставится ответ.
 */
function outputAnswer(result, locator) {
  divAnswer = getWebElement(locator);
  divResult = document.createElement('div');
  divResult.innerText = result;
  divAnswer.appendChild(divResult);
}
/**
 * Получаем массив чисел
 * @param {*} list
 * @returns
 */
function getArray(list) {
  arr = list.replaceAll(', ', ',').split(',');
  arrNumbers = [];
  if (arr.length == 1 && arr[0] == '') {
    arrNumbers = [];
  } else {
    arr.forEach((el) => {
      arrNumbers.push(Number(el));
    });
  }
  return arrNumbers;
}
/**
 * Запускаем большинство логики, которое берет начало с клика на кнопку получения данных
 * @param {event} e событие клика со всеми его атрибутами
 */
function getMaxUI(e) {
  e.preventDefault();
  const form = getWebElement('[name="getMax"]');
  const listValues = getArray(form.elements['list'].value);
  let answer = getMax(listValues);

  hideElement(divContainerAnswer, false);
  outputAnswer(answer, '#answer');
}
function hideElement(webElement, hide = true) {
  if (hide == true) {
    if (webElement.classList.contains('hidden')) {
      return;
    } else {
      webElement.classList.add('hidden');
    }
  } else {
    webElement.classList.remove('hidden');
  }
}
const buttonSubmit = getWebElement('input[type="submit"]');
const buttonClear = getWebElement('#clearAnswer');

const input = getWebElement('[name="list"]');
input.addEventListener('click', goToBeginning);
input.addEventListener('change', checkInput);
buttonSubmit.addEventListener('click', getMaxUI);
buttonClear.addEventListener('click', () => {
  divAnswer = getWebElement('#answer');
  divAnswer.innerText = '';
  divContainerAnswer.classList.toggle('hidden');
});
const errorInput = getWebElement('#errorInput');
const containerErrorInput = getWebElement('#containerErrorInput');
const clearErrorInput = getWebElement('#clearErrorInput');
const divContainerAnswer = getWebElement('#containerAnswer');
clearErrorInput.addEventListener('click', () => {
  containerErrorInput.classList.toggle('hidden');
  errorInput.innerText = '';
});
