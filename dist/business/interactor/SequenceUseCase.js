"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceUseCase = void 0;
const UseCase_1 = require("./UseCase");
const ValueOutput_1 = require("./../dto/ValueOutput");
const UseCaseUnit_1 = require("./UseCaseUnit");
class SequenceUseCase extends UseCase_1.UseCase {
    constructor(units) {
        super();
        this.units = units;
        this.stream = [];
    }
    static builder() {
        return new Builder();
    }
    execute(param) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const unit of this.units) {
                const output = yield unit.process();
                this.stream.push(output);
            }
            return new ValueOutput_1.ValueOutput(this.stream);
        });
    }
}
exports.SequenceUseCase = SequenceUseCase;
class Builder {
    constructor() {
        this.list = [];
    }
    add(useCase, param = null) {
        this.list.push(new UseCaseUnit_1.UseCaseUnit(useCase, param));
        return this;
    }
    build() {
        return new SequenceUseCase(this.list);
    }
}
