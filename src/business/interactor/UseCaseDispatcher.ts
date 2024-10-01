import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { UseCaseDecorator } from './UseCaseDecorator';
import { parentPort, Worker, isMainThread } from 'worker_threads';

export class UseCaseDispatcher<P, R> {
    private decorator: DispatcherDecorator<P, R>;

    constructor(useCase: UseCase<P, R>) {
        this.decorator = new DispatcherDecorator(useCase);
    }

    async dispatch(param: P | null = null): Worker {
        return await this.decorator.dispatch(param);
    }
}

export class DispatcherDecorator<P, R> extends UseCaseDecorator<P, R> {
    async dispatch(param: P | null = null): Worker {
        const process = JSON.parse(JSON.stringify(this.use_case.process(param)));
        const worker = new Worker(__filename, { workerData: { useCase: process } });
        if (isMainThread) {
            worker.on('message', (result) => {
                this.onResult(result)
            });
            worker.on('error', (error) => {
                this.onError(error)
            });
        } else {
            this.process(param);
        }
        return worker
    }

    override async execute(param: P | null): Output<R> {
        const result = await super.execute(param);
        parentPort?.postMessage(result);

        return result;
    }

    async onResult(output?: Output<R>): void {
        this.use_case.onResult(output)
    }

    async onError(error: Error): void {
        this.use_case.onError(error)
    }
}
