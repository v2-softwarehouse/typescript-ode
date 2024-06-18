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
exports.UseCase = void 0;
const ErrorOutput_1 = require("./../dto/ErrorOutput");
class UseCase {
    process(param = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.guard(param)) {
                    yield this.execute(param).then(output => {
                        this.onResult(output);
                    });
                }
                else {
                    this.onGuardError();
                }
            }
            catch (error) {
                this.onError(error);
            }
        });
    }
    onError(error) {
        this.onResult(new ErrorOutput_1.ErrorOutput(error));
    }
    onResult(output) { }
    guard(param) {
        return true;
    }
    onGuardError() { }
}
exports.UseCase = UseCase;
