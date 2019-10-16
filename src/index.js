/**
 * Вычисляет доли
 * @param {Array<(string|number)>} sourceValues входные значения
 * @returns {number[]} доли в процентах
 */
const getParts = (sourceValues) => {
    const sum = sourceValues
        .reduce((sumPrevValues, currentValue) => sumPrevValues + parseInputValue(currentValue), 0);

    return sourceValues.map(value => formatNumber(value / sum * 100));
}


/**
 * Форматирует число в строку с точностью до 3х знаков
 * @param {number} value 
 * @returns {string} строка в формате 00.000
 */
const formatNumber = (value) => {
    return value.toFixed(3);
}


/**
 * Преобразует значение в число
 * @param {string|number} value исходное значение
 * @returns {number} рузультат
 */
const parseInputValue = (value) => {
    const parsedNumber = parseFloat(value);

    if (isNaN(parsedNumber)) {
        throw `Invalid input: ${value} is not a number`;
    }

    return parsedNumber;
}


const inputValues = process.argv[2] || '';
const splitedValue = inputValues.split(',');
console.log(getParts(splitedValue));


// module.exports = {
//     getParts,
//     formatNumber,
//     parseInputValue
// }