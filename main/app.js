"use strict";
let express = require('express');
let app = express();

let {TranslateBarcodeToZipcode} = require('../main/barcode-to-zipcode');
let {TranslateZipcodeToBarcode} = require('../main/zipcode-to-barcode');

app.get('/zipcode-to-barcode/:id',function (req,res) {
    let translateZipcodeToBarcode = new TranslateZipcodeToBarcode();
    let barcode = translateZipcodeToBarcode.translate(req.params.id);
    if(barcode.text !== false) {
        res.status(200).send(barcode.text);
    }else {
        res.sendStatus(400).end();
    }
});

app.get('/barcode-to-zipcode/:id',function (req,res) {
    let translateBarcodeToZipcode = new TranslateBarcodeToZipcode();
    let zipcode = translateBarcodeToZipcode.translate(req.params.id);
    if(zipcode.text !== false){
        res.status(200).send(zipcode.text);
    }else {
        res.sendStatus(400).end();
    }
});

app.listen(4000, function () {
    console.log('Server listening at http://localhost:4000');
});

module.exports = app;

