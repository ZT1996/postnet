'use strict';
let _ = require('lodash');
const loadAllCodes = require('../main/loadAllCodes');

function tanslateBarcodeToZipcode(barcode) {
    const allCodes = loadAllCodes();
    const result = checkBarcode(barcode, allCodes);
    if (result) {
        const silicedBarcode = getSlicedBarcode(barcode, allCodes);
        return getZipcode(silicedBarcode);

    } else {
        return false;
    }
}

function checkBarcode(barcode, allCodes) {
    let chunckedBarcode = getChunckedBarcode(barcode);
    let checkDigit = getCheckDigit(chunckedBarcode, allCodes);
    let checkNumbers = getCheckNumbers(chunckedBarcode, allCodes);
    let checkCount = getCheckCount(barcode);
    return (checkDigit && checkNumbers && checkCount);
}

function getChunckedBarcode(barcode) {
    let slicedBarcode = _.slice(barcode, 1, -1);
    return _.chunk(slicedBarcode, 5).map(x => x.join(''));

}

function getCheckDigit(chunckedBarcode, allCodes) {

    let array = _.map(chunckedBarcode, str => allCodes.indexOf(str));
    let checkDigit = _.last(array);
    let checkArray = _.dropRight(array);
    let realCheckDigit = _.reduce(checkArray, (sum, x) => sum + x, 0) % 10;

    return (realCheckDigit === checkDigit);
}

function getCheckNumbers(chunckedBarcode, allCodes) {
    let array = _.map(chunckedBarcode, str => allCodes.indexOf(str));
    let isExist = _.find(array, x => x === -1);
    return isExist === undefined;
}

function getCheckCount(barcode) {
    return (barcode.length === 32 || barcode.length === 52);
}

function getSlicedBarcode(barcode, allCodes) {

    let chunckedBarcode = getChunckedBarcode(barcode);
    return _.map(chunckedBarcode, str => allCodes.indexOf(str));

}

function getZipcode(silicedBarcode) {
    let dropedBarcode = _.dropRight(silicedBarcode);
    if (dropedBarcode.length === 9) {
        return `${_.slice(dropedBarcode, 0, 5).join('')}-${_.slice(dropedBarcode, 5).join('')}`;
    }
    else return dropedBarcode.join('');
}
module.exports = {
    tanslateBarcodeToZipcode,
    checkBarcode,
    getSlicedBarcode,
    getZipcode
};