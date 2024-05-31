import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
export declare class UseCaseUnit<P, R> {
    useCase: UseCase<P, R>;
    param: P | null;
    constructor(useCase: UseCase<P, R>, param: P | null);
    process(): Output<R>;
}
