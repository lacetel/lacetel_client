import { ErrorHandler } from '@angular/core';

export class GlobalError implements ErrorHandler {
  handleError(error) {
    console.log('Got ERROR: ', error);
  }
}
