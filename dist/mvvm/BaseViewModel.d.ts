/// <reference types="node" />
/// <reference types="node" />
import { Controller } from './../mvvm/Controller';
import { UseCase } from './../business/interactor/UseCase';
import { Output } from './../business/dto/Output';
import { EventEmitter } from 'events';
import { Worker } from 'worker_threads';
export declare abstract class BaseViewModel extends EventEmitter implements Controller {
    private channels;
    private compositeJobDisposable;
    observe(channelName: string, listener: (value: any) => void): void;
    getChannels(): string[];
    disposeAll(): void;
    protected postValue(channelName: string, value: any): void;
    dispatchUseCase<P, R>(param: P | null, useCase: UseCase<P, R>, listener: (output: Output<R>) => void): Worker | null;
}
