"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseDispatcher = void 0;
const UseCaseDecorator_1 = require("./UseCaseDecorator");
const worker_threads_1 = require("worker_threads");
const ErrorOutput_1 = require("../dto/ErrorOutput");
class UseCaseDispatcher {
    constructor(useCase, executeOn, resultOn) {
        this.executeOn = executeOn;
        this.resultOn = resultOn;
        this.decorator = new DispatcherDecorator(useCase, executeOn, resultOn);
    }
    dispatch(param = null) {
        return this.decorator.dispatch(param);
    }
}
exports.UseCaseDispatcher = UseCaseDispatcher;
class DispatcherDecorator extends UseCaseDecorator_1.UseCaseDecorator {
    constructor(useCaseDispatcher, executeOn, resultOn) {
        super(useCaseDispatcher);
        this.useCaseDispatcher = useCaseDispatcher;
        this.executeOn = executeOn;
        this.resultOn = resultOn;
    }
    dispatch(param) {
        const worker = new worker_threads_1.Worker(__filename, { workerData: { param, useCase: this.useCaseDispatcher } });
        worker.on('message', (result) => this.onResult(result));
        worker.on('error', (error) => this.onError(error));
        return worker;
    }
    onError(error) {
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(new ErrorOutput_1.ErrorOutput(error));
    }
    onResult(output) {
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(output);
    }
}
