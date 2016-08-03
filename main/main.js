'use strict';
var  scanf = require('scanf');
let route = require('../main/route');

while (1){
    var input = scanf('%s');
    let answer = route(input);
    console.log(answer);
}





