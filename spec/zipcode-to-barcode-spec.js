'use strict';

const {
    translateZipcodeToBarcode,
    checkZipcode,
    getSplittedZipcode,
    getCheckDigit,
    getBarcode
} = require('../main/zipcode-to-barcode');
const loadAllCodes = require('../main/loadAllCodes');

describe('zipcode to barcode', () => {

    it('5位正确输入', () => {
        const zipcode = '95713';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = '||:|:::|:|:|:::|:::||::||::|:|:|';
        expect(output).toEqual(expectText);
    });

    it('9位正确输入', () => {
        const zipcode = '123456789';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        expect(output).toEqual(expectText);
    });

    it('10位正确输入', () => {
        const zipcode = '12345-6789';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        expect(output).toEqual(expectText);
    });

    it('4位错误输入', () => {
        const zipcode = '1234';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('6位错误输入', () => {
        const zipcode = '123456';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('8位错误输入', () => {
        const zipcode = '12345678';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('11位错误输入', () => {
        const zipcode = '12345678910';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('-的1个数正确输入', () => {
        const zipcode = '12345-6789';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        expect(output).toEqual(expectText);
    });

    it('-的0个数错误输入', () => {
        const zipcode = '12345678910';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('-的2个数错误输入', () => {
        const zipcode = '1-2-345678';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('-的位置的错误输入5号位置', () => {
        const zipcode = '1234-56789';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('-的位置的错误输入4号位置', () => {
        const zipcode = '123-456789';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('带#的错误输入', () => {
        const zipcode = '12345#6789';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('字母的错误输入', () => {
        const zipcode = 'abcdefghij';
        const output = translateZipcodeToBarcode(zipcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });
});

describe('unit', () => {

    it('5位正确输入', () => {
        const zipcode = '95713';
        const result = checkZipcode(zipcode);

        const expectText = true;
        expect(result).toEqual(expectText);
    });

    it('5位得到正确的被划分的邮编', () => {
        const zipcode = '95713';
        const splittedZipcode = getSplittedZipcode(zipcode);

        const expectText = [9, 5, 7, 1, 3];
        expect(splittedZipcode).toEqual(expectText);
    });

    it('9位得到正确的被划分的邮编', () => {
        const zipcode = '123456789';
        const splittedZipcode = getSplittedZipcode(zipcode);

        const expectText = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(splittedZipcode).toEqual(expectText);
    });

    it('10位得到正确的别划分的邮编', () => {
        const zipcode = '12345-6789';
        const splittedZipcode = getSplittedZipcode(zipcode);

        const expectText = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(splittedZipcode).toEqual(expectText);
    });

    it('获得正确的校验码', () => {
        const splittedZipcode = [9, 5, 7, 1, 3];
        const checkDigit = getCheckDigit(splittedZipcode);

        const expectText = [9, 5, 7, 1, 3, 5];
        expect(checkDigit).toEqual(expectText);
    });

    it('获得正确的编码', () => {
        const checkDigit = [9, 5, 7, 1, 3, 5];
        const allCodes = loadAllCodes();
        const barcode = getBarcode(checkDigit, allCodes);

        const expectText = '||:|:::|:|:|:::|:::||::||::|:|:|';
        expect(barcode).toEqual(expectText);
    });
});