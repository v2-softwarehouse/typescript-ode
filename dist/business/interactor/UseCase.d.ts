import { Output } from './../dto/Output';
export declare abstract class UseCase<P, R> {
    process(param?: P | null): Promise<void>;
    abstract execute(param: P | null): Promise<Output<R>>;
    onError(error: Error): void;
    onResult(output: Output<R>): void;
    guard(param: P | null): boolean;
    onGuardError(): void;
}
