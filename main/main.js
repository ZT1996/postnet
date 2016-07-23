"use strict";
const test = require('../run-test');


function getBarcode(zipcode,allBarcodes) {
    if(checkZipcode(zipcode)) {
        const splittedZipcode = getSplittedZipcode(zipcode);
        const codes = appendCheckDigit(splittedZipcode);
        const barcode = getDigits(codes, allBarcodes);
        console.log(barcode);
    }else {
        console.log('irregular zipcode');
    }
}
function checkZipcode(zipcode) {
   
   return zipcode.length === 5 || 9 || 10 ? true : false;

}

function getSplittedZipcode(zipcode) {
    let zipcodeArray = zipcode.split('');
    let splittedZipcode = zipcodeArray.filter(code => code != '-');
    return splittedZipcode.join('');
}

function appendCheckDigit(splittedZipcode) {

    let splittedZipcodeArray = splittedZipcode.split('');
    let array = splittedZipcodeArray.map(array => parseInt(array));
    let sum = array.reduce((prev, next) => prev + next);
    let checkDigit = 0;
    if(sum % 10 != 0) {
        checkDigit = (sum - sum % 10);
    }

    array.push(checkDigit);

    return array.join('').toString();
}

function getDigits(codes, allBarcodes) {

    let arrayCodes = codes.split('');
    let array = arrayCodes.map(code => parseInt(code));

    return `|${array.map(number => allBarcodes[number]).join('')}|`;
}


module.exports = {
    getBarcode: getBarcode,
    checkZipcode:checkZipcode,
    getSplittedZipcode: getSplittedZipcode,
    appendCheckDigit: appendCheckDigit,
    getDigits: getDigits
};


