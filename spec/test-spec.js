"use strict";
const app = require('../main/main');

describe("main",() => {
    const allBarcodes = [
        '||:::',
        ':::||',
        '::|:|',
        '::||:',
        ':|::|',
        ':|:|:',
        ':||::',
        '|:::|',
        '|::|:',
        '|:|::'
    ];
    it("should get correct barcode",() => {
        spyOn(console,'log');
        
        const zipcode = '45056-1234';
        app.getBarcode(zipcode,allBarcodes);
        const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
    
    it("should get correct splittedZipcode",() => {
        const zipcode = '45056-1234';
        const splittedZipcode = app.getSplittedZipcode(zipcode);
        const  expectText = '450561234';

        expect(splittedZipcode).toEqual(expectText);
    });
    
    it("should get correct code",() => {
        const zipcode ='45056-1234';
        const splittedZipcode = app.getSplittedZipcode(zipcode);
        const codes = app.appendCheckDigit(splittedZipcode);
        const expectText = '4505612340';
       
        expect(codes).toEqual(expectText);
    });
    
    it("should get correct digits",() => {
        const zipcode ='45056-1234';
        const splittedZipcode = app.getSplittedZipcode(zipcode);
        const codes = app.appendCheckDigit(splittedZipcode);
        const barcode = app.getDigits(codes,allBarcodes);
        const  expectText = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;

        expect(barcode).toEqual(expectText);
    });
    
});



