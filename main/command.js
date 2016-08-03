let {translateZipcodeToBarcode} = require('../main/zipcode-to-barcode');
let {tanslateBarcodeToZipcode} = require('../main/barcode-to-zipcode');

function goToBarcodePage() {
    return {
        text: `Please input zip code:`,
        newMapping: {'*': buildBarcode}
    };
}

function goToZipCodePage() {
    return {
        text: `Please input bar code:`,
        newMapping: {'*': buildZipcode}
    };
}

function goToQuitPage() {
    process.exit();
}

function goToReinputPage() {
    return {err: `Please give right input`};
}

function goToMenuPage() {
    return {
        text: `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
        newMapping: {
            '1': goToBarcodePage,
            '2': goToZipCodePage,
            '3': goToQuitPage,
            '*': goToReinputPage
        }
    };
}

function buildBarcode(input) {
    let barcode = translateZipcodeToBarcode(input);

    if (barcode === false) {
        return {err: `Please give right input`};
    } else {
        return {
            text: barcode,
            reset: true
        };
    }
}

function buildZipcode(input) {

    let zipcode = tanslateBarcodeToZipcode(input);

    if (zipcode === false) {
        return {err: `Please give right input`};
    } else {
        return {
            text: zipcode,
            reset: true
        };
    }
}

module.exports = {
    goToMenuPage
};