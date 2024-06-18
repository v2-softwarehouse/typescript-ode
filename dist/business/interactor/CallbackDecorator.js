"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackDecorator = void 0;
const UseCaseDecorator_1 = require("./UseCaseDecorator");
const ErrorOutput_1 = require("./../dto/ErrorOutput");
class CallbackDecorator extends UseCaseDecorator_1.UseCaseDecorator {
    constructor(useCase, callback) {
        super(useCase);
        this.callback = callback;
    }
    onResult(output) {
        super.onResult(output);
        this.callback(output);
    }
    onError(error) {
        super.onError(error);
        this.callback(new ErrorOutput_1.ErrorOutput(error));
    }
}
exports.CallbackDecorator = CallbackDecorator;
