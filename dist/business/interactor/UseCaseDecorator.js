"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseDecorator = void 0;
const UseCase_1 = require("./UseCase");
class UseCaseDecorator extends UseCase_1.UseCase {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    onError(error) {
        this.useCase.onError(error);
    }
    execute(param) {
        return this.useCase.execute(param);
    }
    onResult(output) {
        this.useCase.onResult(output);
    }
    guard(param) {
        return this.useCase.guard(param);
    }
}
exports.UseCaseDecorator = UseCaseDecorator;
