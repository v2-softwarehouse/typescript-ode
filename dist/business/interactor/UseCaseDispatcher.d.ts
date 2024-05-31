/// <reference types="node" />
import { UseCase } from './UseCase';
import { Worker } from 'worker_threads';
export declare class UseCaseDispatcher<P, R> {
    private executeOn;
    private resultOn;
    private decorator;
    constructor(useCase: UseCase<P, R>, executeOn: string, resultOn: string);
    dispatch(param?: P | null): Worker | null;
}
