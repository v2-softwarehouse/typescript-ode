import { BaseViewModel } from './BaseViewModel';
export declare abstract class BaseViewModelTest<T extends BaseViewModel> {
    protected viewModel: T | null;
    protected observer: TestObserver;
    setup(): void;
    protected abstract setupViewModel(): void;
    protected assertViewStateError(exception: Error): void;
    protected assertViewStateSuccess(value: any): void;
    teardown(): void;
    private observeViewModel;
    private getLifecycleOwner;
}
declare class TestObserver {
    viewState: any | null;
    onMessage(value: any): void;
}
export {};
