import { Output } from "../business/dto/Output";
import { AuthenticationException, HttpException, InternetConnectionException } from "../business/exception/Exceptions";
import { CallbackDecorator } from "../business/interactor/CallbackDecorator";
import { CompositeJobDisposable } from "../business/interactor/CompositeJobDisposable";
import { UseCase } from "../business/interactor/UseCase";
import { UseCaseDispatcher } from "../business/interactor/UseCaseDispatcher";
import { UseCaseUnit } from "../business/interactor/UseCaseUnit";

export class BaseController<P, R> {
  private compositeJobDisposable?: CompositeJobDisposable;

  
  protected handleResponse(state: Output<R>): void {
    if (this.isErrorState(state)) {
      this.handleErrorState(state.error);
    } else {
      this.handleSuccessState(state.value);
    }
  }

  private isErrorState(state: Output<R>): boolean {
    return state.isError();
  }

  private handleErrorState(error: any): void {
    if (error instanceof AuthenticationException) {
      this.handleAuthError();
    } else if (error instanceof HttpException) {
      this.handleHttpError(error);
    } else if (error instanceof InternetConnectionException) {
      this.handleConnectionError();
    } else {
      this.handleGenericError(error);
    }
  }

  
  protected handleAuthError(): void {
    
  }

  protected handleHttpError(error: HttpException): void {
    
  }

  
  protected handleConnectionError(): void {
    
  }

  
  protected handleGenericError(error: Error): void {
    
  }

  
  protected handleSuccessState(value: R | undefined): void {
    
  }

  
  public dispatchUseCase(param: P, useCase: UseCase<P, R>): any {
    const dispatcher = new UseCaseDispatcher(useCase);
    const job = dispatcher.dispatch(param);
    if (this.compositeJobDisposable) {
      this.compositeJobDisposable.add(job);
    }

    return job;
  }

  // Processamento de caso de uso com retorno síncrono de Output<R>
  public processUseCase(param: P, useCase: UseCase<P, R>): Output<R> {
    const callback = new UseCaseUnit.Callback<R>();
    new CallbackDecorator(useCase, callback.set).process(param);

    return callback.output;
  }
}