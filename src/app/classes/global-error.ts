import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalError implements ErrorHandler {
  handleError(error) {
    console.log('Got ERROR: ', error);
  }
}
