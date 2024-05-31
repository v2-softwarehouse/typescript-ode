import { Output } from "./Output";
export declare class ValueOutput<V> extends Output<V> {
    constructor(value?: V | null);
    isError(): boolean;
}
