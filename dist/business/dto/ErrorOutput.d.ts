import { Output } from "./Output";
export declare class ErrorOutput<V> extends Output<V> {
    constructor(error: Error, value?: V | null);
    isError(): boolean;
}
