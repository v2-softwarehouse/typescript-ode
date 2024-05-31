import { Output } from './../dto/Output';
import { ErrorOutput } from './../dto/ErrorOutput';

export abstract class UseCase<P, R> {
    async process(param: P | null = null) {
        try {
            if (this.guard(param)) {
                await this.execute(param).then(output => {
                    this.onResult(output);
                });
            } else {
                this.onGuardError();
            }
        } catch (error) {
            this.onError(error as Error);
        }
    }

    public abstract execute(param: P | null): Promise<Output<R>>;

    public onError(error: Error) {
        this.onResult(new ErrorOutput(error));
    }

    public onResult(output: Output<R>) {}

    public guard(param: P | null): boolean {
        return true;
    }

    public onGuardError() {}
}