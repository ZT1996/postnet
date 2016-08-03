'use strict';
const _ = require('lodash');
const loadAllCodes = require('../main/loadAllCodes');

function translateZipcodeToBarcode(zipcode) {
    const result = checkZipcode(zipcode);
    if (result) {
        const splittedZipcode = getSplittedZipcode(zipcode);
        const checkDigit = getCheckDigit(splittedZipcode);
        const allCodes = loadAllCodes();
        return getBarcode(checkDigit, allCodes);

    } else return false;
}

function checkZipcode(zipcode) {
    let splittedZipcode = _.split(zipcode, '');
    let length = checkLength(splittedZipcode);
    let dashCount = checkDashCount(splittedZipcode);
    let dashLocation = checkDashLocation(splittedZipcode);
    let number = checkPureNumber(splittedZipcode);

    return (length && dashCount && dashLocation && number);
}

function checkLength(splittedZipcode) {
    let length = splittedZipcode.length;

    return length === 5 || length === 9 || length === 10;
}

function checkDashCount(splittedZipcode) {
    let count = 0;
    for (let code of splittedZipcode) {
        if (code === '-') {
            count++;
        }
    }
    return count <= 1;
}

function checkDashLocation(splittedZipcode) {
    if (splittedZipcode.length === 10) {
        let location = _.indexOf(splittedZipcode, '-');
        return location === 5;
    } else return true;
}

function checkPureNumber(splittedZipcode) {
    for (let code of splittedZipcode) {
        if (typeof  parseInt(code) === "number" || code === '-') {
            return true;
        } else return false;
    }
}

function getSplittedZipcode(zipcode) {
    if (zipcode.length === 5 || zipcode.length === 9) {
        return _.chain(zipcode).split('').map(x => parseInt(x)).value();
    } else {
        return _.chain(zipcode).split('-').join('').split('').map(x => parseInt(x)).value();
    }
}

function getCheckDigit(splittedZipcode) {
    let sum = _.reduce(splittedZipcode, (prev, curr) => prev + curr, 0);
    let digit = sum % 10;
    splittedZipcode.push(digit);
    return splittedZipcode;
}

function getBarcode(checkDigit, allCodes) {

    let code = _.map(checkDigit, x => allCodes[x]).join('');
    return `|${code}|`;
}
module.exports = {
    translateZipcodeToBarcode,
    checkZipcode,
    getSplittedZipcode,
    getCheckDigit,
    getBarcode
};