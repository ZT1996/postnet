'use strict';
const app1 = require('../main/main1');
describe('main',() => {
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

    const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
   it('should get correct zipcode',() => {
       spyOn(console,'log');
       app1.getZipcode(barcode,allBarcodes);
       const expectText = `45056-1234`;
       
       expect(console.log).toHaveBeenCalledWith(expectText);
    });
    
    it('should get correct digits',() => {
        const deletedBarcode = app1.deleteHighFrame(barcode);
        const expectText = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
        
        expect(deletedBarcode).toEqual(expectText);
    });
    
    it('should get correct digits',() => {
        const deletedBarcode = app1.deleteHighFrame(barcode);
        const  digits = app1.getDigits(deletedBarcode,allBarcodes);
        const expectText = [4,5,0,5,6,1,2,3,4,0];

        expect(digits).toEqual(expectText);
    });
    
    it('should get correct zipcode',() => {
        spyOn(console,'log');
        const deletedBarcode = app1.deleteHighFrame(barcode);
        const  digits = app1.getDigits(deletedBarcode,allBarcodes);
        const zipcode = app1.zipcodes(digits);
        const expectText = '45056-1234';
        expect(zipcode).toEqual(expectText);

    });
});