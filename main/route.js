"use strict";

let {
    goToMenuPage
} = require('../main/command');

let defaultMapping = {
    '*': goToMenuPage
};
let mapping = defaultMapping;

function route(input) {
    let command = mapping[input] || mapping['*'];
    let response = command(input);

    if (response.err) {
        return response.err;
    }
    if (response.newMapping) {
        mapping = response.newMapping;
        return response.text;

    }
    if (response.reset) {
        mapping = defaultMapping;
        return response.text;
    }
}

module.exports = route;