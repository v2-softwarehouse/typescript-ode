import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
export declare class ChainedUseCase<P, R, T> extends UseCase<P, T> {
    private first;
    private second;
    constructor(first: UseCase<P, R>, second: UseCase<R, T>);
    execute(param: P | null): Promise<Output<T>>;
}
