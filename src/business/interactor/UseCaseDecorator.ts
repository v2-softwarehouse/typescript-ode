import { UseCase } from './UseCase';
import { Output } from './../dto/Output';

export abstract class UseCaseDecorator<P, R> extends UseCase<P, R> {
    protected use_case: UseCase<P, R>;

    constructor(use_case: UseCase<P, R>) {
        super();
        this.use_case = use_case;
    }

    execute(param?: P): Output<R> {
        return this.use_case.execute(param);
    }

    asynconResult(output?: Output<R>) {
        return this.use_case.onResult(output);
    }

    onError(error: Error) {
        return this.use_case.onError(error);
    }

    guard(param?: P): boolean {
        return this.use_case.guard(param);
    }
}