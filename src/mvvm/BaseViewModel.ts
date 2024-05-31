
import { Controller } from './../mvvm/Controller';
import { CompositeJobDisposable } from './../business/interactor/CompositeJobDisposable'; // Substitua com a implementação real
import { CallbackDecorator } from './../business/interactor/CallbackDecorator'; // Substitua com a implementação real
import { UseCase } from './../business/interactor/UseCase'; // Substitua com a implementação real
import { UseCaseDispatcher } from './../business/interactor/UseCaseDispatcher'; // Substitua com a implementação real
import { Output } from './../business/dto/Output'; // Substitua com a implementação real
import { EventEmitter } from 'events';
import { Worker } from 'worker_threads';

export abstract class BaseViewModel extends EventEmitter implements Controller {
    private channels: Map<string, any> = new Map();
    private compositeJobDisposable = new CompositeJobDisposable();

    observe(channelName: string, listener: (value: any) => void) {
        if (!this.channels.has(channelName)) {
            this.channels.set(channelName, []);
        }
        this.on(channelName, listener);
    }

    getChannels(): string[] {
        return Array.from(this.channels.keys());
    }

    disposeAll() {
        this.compositeJobDisposable.cancel();
    }

    protected postValue(channelName: string, value: any) {
        this.emit(channelName, value);
    }

    public dispatchUseCase<P, R>(param: P | null, useCase: UseCase<P, R>, listener: (output: Output<R>) => void): Worker | null {
        const dispatcher = new UseCaseDispatcher(new CallbackDecorator(useCase, listener), 'worker', 'worker');
        const worker = dispatcher.dispatch(param);
        this.compositeJobDisposable.add(worker);
        return worker;
    }
}