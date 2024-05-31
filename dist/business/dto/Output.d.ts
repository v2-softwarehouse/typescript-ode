export declare abstract class Output<V> {
    value: V | null;
    error: Error | null;
    constructor(value?: V | null, error?: Error | null);
    isError(): boolean;
    isSuccess(): boolean;
    isEmpty(): boolean;
}
