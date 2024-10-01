import { Output } from './../dto/Output';
import { ErrorOutput } from './../dto/ErrorOutput';

export abstract class UseCase<P, R> {
    async process(param?: P) {
        try {
            if (this.guard(param)) {
                const output = this.execute(param);
                this.onResult(output);
            } else {
                this.onGuardError();
            }
        } catch (error) {
            this.onError(error);
        }
    }

    execute(_param?: P): Output<R> {
        throw new Error("Method not implemented.");
    }

    onError(error: Error) {
        this.onResult(new ErrorOutput(error));
    }

    onResult(_output?: Output<R>) {
        // Implement in subclass
    }

    guard(_param?: P): boolean {
        return true;
    }

    async onGuardError() {
        // Implement in subclass
    }
}