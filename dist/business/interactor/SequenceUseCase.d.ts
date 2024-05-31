import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { UseCaseUnit } from './UseCaseUnit';
export declare class SequenceUseCase extends UseCase<null, Output<any>[]> {
    private units;
    private stream;
    constructor(units: UseCaseUnit<any, any>[]);
    static builder(): Builder;
    execute(param: null): Promise<Output<Output<any>[]>>;
}
declare class Builder {
    private list;
    add<P, R>(useCase: UseCase<P, R>, param?: P | null): Builder;
    build(): UseCase<null, Output<any>[]>;
}
export {};
