'use strict';
const test1 = require('../spec/test1-spec');

function getZipcode(barcode,allBarcodes) {

    const deletedBarcode = deleteHighFrame(barcode);
    const digits = getDigits(deletedBarcode, allBarcodes);
    let zipcode = zipcodes(digits);
        console.log(zipcode);
}

function deleteHighFrame(barcode) {
    let barcodeArray = barcode.split('');

    return barcodeArray.slice(1,-1).join('');
}

function getDigits(deletedBarcode,allBarcodes) {
    return deletedBarcode
        .match(/.{1,5}/g)
        .map(str => allBarcodes.indexOf(str));

    
}
// function checkDigits(digits) {
//     let checkDigits = digits.pop();
//     let sum = digits.reduce((a,b) => a + b);
//     if((sum-sum%10)%10 === checkDigits){
//         return true;
//     }else {
//         return false;
//     }
// }

function zipcodes(digits) {
    let checkDigit = digits.pop();
    let digitsStr = digits.join('');
    let zipcode = `${digitsStr.slice(0,5)}-${digitsStr.slice(5)}`;
    return zipcode;
}
module.exports = {
    getZipcode:getZipcode, 
    deleteHighFrame:deleteHighFrame,
    getDigits:getDigits,
    zipcodes:zipcodes
};