import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
export declare abstract class UseCaseDecorator<P, R> extends UseCase<P, R> {
    private useCase;
    constructor(useCase: UseCase<P, R>);
    onError(error: Error): void;
    execute(param: P | null): Promise<Output<R>>;
    onResult(output: Output<R>): void;
    guard(param: P | null): boolean;
}
