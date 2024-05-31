/// <reference types="node" />
import { Worker } from 'worker_threads';
export declare class CompositeJobDisposable {
    private list;
    private purgeInterval;
    constructor();
    add(worker: Worker | null): void;
    remove(worker: Worker): void;
    cancel(): void;
    private purge;
}
