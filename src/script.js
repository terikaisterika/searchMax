/**
 * Получаем
 * @param {number[]} arr
 * @param {number} maxLength
 * @returns
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
function getMax(arr) {
  //let messageLength = '';
  messageLength = checkLength(arr);

  messageMaxMin = checkMaxMin(arr);

  if (messageLength != '' || messageMaxMin != '') {
    return `Ошибка в данных: ${messageLength}${messageMaxMin}`;
  }
  extremeValue = arr[0];
  ind = 0;
  for (let i = 1; i < arr.length; i++) {
    let el = Number(arr[i]);
    if (extremeValue < el) {
      extremeValue = el;
      ind = i;
    }
  }
  return `${extremeValue}(${ind})`;
}
function getWebElement(locator) {
  return document.querySelector(locator);
}
function checkInput() {
  regExp = /^-?\d{1,2}(,{1}-?\d{1,2})*$/g;
  if (regExp.test(this.value)) {
    return;
  } else {
    this.value = 0;
  }
}
function outputAnswer(result, locator) {
  divContainerAnswer = getWebElement('#containerAnswer');
  hideElement(divContainerAnswer, false);
  divAnswer = getWebElement(locator);
  divResult = document.createElement('div');
  divResult.innerText = result;
  divAnswer.appendChild(divResult);
}

function getArray(list) {
  return list.replaceAll(', ', ',').split(',');
}
function getMaxUI(e) {
  e.preventDefault();
  const form = getWebElement('[name="getMax"]');
  const listValues = getArray(form.elements['list'].value);
  let answer = getMax(listValues);
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
input.addEventListener('change', checkInput);
buttonSubmit.addEventListener('click', getMaxUI);
buttonClear.addEventListener('click', () => {
  divAnswer = getWebElement('#answer');
  divAnswer.innerText = '';
  divContainerAnswer = getWebElement('#containerAnswer');
  hideElement(divContainerAnswer);
});
