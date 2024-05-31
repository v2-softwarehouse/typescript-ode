import { UseCase } from './UseCase';
import { UseCaseDecorator } from './UseCaseDecorator';
import { Output } from './../dto/Output';
export declare class CallbackDecorator<P, R> extends UseCaseDecorator<P, R> {
    private callback;
    constructor(useCase: UseCase<P, R>, callback: (output: Output<R>) => void);
    onResult(output: Output<R>): void;
    onError(error: Error): void;
}
