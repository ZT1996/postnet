'use strict';

const {
    translateBarcodeToZipcode,
    checkBarcode,
    getSlicedBarcode,
    getZipcode
} = require('../main/barcode-to-zipcode');
const loadAllCodes = require('../main/load-all-codes');

describe('barcode to zipcode', () => {

    it('输入检验码有问题的编码', () => {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|||';
        const output = translateBarcodeToZipcode(barcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('输入编码有问题，不在0-9之间', () => {
        const barcode = '|||||::|:|:|:::|:::||::||::|:|:|';
        const output = translateBarcodeToZipcode(barcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('输入没有加框架', () => {
        const barcode = '|:|:::|:|:|:::|:::||::||::|:|:';
        const output = translateBarcodeToZipcode(barcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('输入位数有问题(5位)', () => {
        const barcode = '|||';
        const output = translateBarcodeToZipcode(barcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('输入位数有问题(9位)', () => {
        const barcode = '|::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        const output = translateBarcodeToZipcode(barcode);

        const expectText = false;
        expect(output).toEqual(expectText);
    });

    it('得到5位的邮编', () => {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
        const output = translateBarcodeToZipcode(barcode);

        const expectText = '95713';
        expect(output).toEqual(expectText);
    });

    it('得到10位邮编', () => {
        const barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        const output = translateBarcodeToZipcode(barcode);

        const expectText = '12345-6789';
        expect(output).toEqual(expectText);
    });
});

describe('unit', () => {

    it('检查输入是否符合规范', () => {
        const barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        const allCodes = loadAllCodes();
        const result = checkBarcode(barcode, allCodes);

        const expectText = true;
        expect(result).toEqual(expectText);
    });

    it('获取剥除框架后的编码', () => {
        const barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        const allCodes = loadAllCodes();
        const silicedBarcode = getSlicedBarcode(barcode, allCodes);

        const expectText = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
        expect(silicedBarcode).toEqual(expectText);
    });

    it('获取邮编', () => {
        const silicedBarcode = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
        const zipcode = getZipcode(silicedBarcode);

        const expectText = '12345-6789';
        expect(zipcode).toEqual(expectText);
    });

});