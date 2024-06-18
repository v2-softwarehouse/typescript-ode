"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseUnit = void 0;
const ValueOutput_1 = require("./../dto/ValueOutput");
const CallbackDecorator_1 = require("./CallbackDecorator");
class UseCaseUnit {
    constructor(useCase, param) {
        this.useCase = useCase;
        this.param = param;
    }
    process() {
        const callback = new Callback();
        const decorator = new CallbackDecorator_1.CallbackDecorator(this.useCase, callback.set.bind(callback));
        decorator.process(this.param);
        return callback.output;
    }
}
exports.UseCaseUnit = UseCaseUnit;
class Callback {
    constructor() {
        this.output = new ValueOutput_1.ValueOutput();
    }
    set(value) {
        this.output = value;
    }
}
