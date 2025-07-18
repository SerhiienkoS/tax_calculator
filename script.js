// Массив с федеральными землями и ставками Kirchensteuer (церковного налога)
const states = [
    { state: "Bavaria", tax: 0.08 },
    { state: "Baden-Württemberg", tax: 0.08 },
    { state: "Berlin", tax: 0.09 },
    { state: "Hamburg", tax: 0.09 },
    { state: "Hesse", tax: 0.09 },
    { state: "NRW", tax: 0.09 }
];

// Обработчик кнопки "Click Me!"
taxButton.onclick = function () {
    // Считываем значения из формы
    const income = +document.getElementById('income').value;         // Годовой доход
    const country = document.getElementById('country').value;        // Страна (не используется в расчетах)
    const state = document.getElementById('state').value;            // Выбранная земля

    // Рассчитываем федеральный налог
    const federalTax = calculateFederalTax(income);

    // Ищем объект с нужной землёй, если он есть — считаем Kirchensteuer
    const stateObj = states.find(s => s.state.toLowerCase() === state.toLowerCase());
    const churchTax = stateObj ? federalTax * stateObj.tax : 0;

    // Доход после вычета налогов
    const result = income - federalTax - churchTax;

    // Создаем элементы для вывода результата
    const revenueEl = createInfoElement(`Revenue: ${result.toFixed(2)}`, "h3"); // Доход после налогов
    const taxEl = createInfoElement(`Federal Tax: ${federalTax.toFixed(2)}`, 'h3'); // Федеральный налог
    const churchEl = createInfoElement(`Church Tax (${stateObj ? stateObj.tax * 100 + "%" : "N/A"}): ${churchTax.toFixed(2)}`, 'h3'); // Церковный налог

    // Создаем блок для вывода результатов
    const infoBox = document.createElement("div");
    infoBox.append(revenueEl, taxEl, churchEl);

    // Вставляем или обновляем блок с результатами
    const boxResult = document.getElementById("result-side");
    if (boxResult.firstElementChild.nextElementSibling) {
        boxResult.replaceChild(infoBox, boxResult.firstElementChild.nextElementSibling);
    } else {
        boxResult.append(infoBox);
    }
};

// Функция расчета федерального налога на основе дохода
function calculateFederalTax(income) {
    let tax = 0;
    if (income <= 11784) {
        tax = 0; // Необлагаемый минимум
    } else if (income <= 18000) {
        tax = income * 0.14; // Плавно растущая ставка
    } else if (income <= 62810) {
        tax = income * 0.24; // Основная ставка
    } else if (income <= 277825) {
        tax = income * 0.42; // Высокий доход
    } else {
        tax = income * 0.45; // Богатые (Reichensteuer)
    }
    return tax;
}
