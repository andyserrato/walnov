import { Injectable } from '@angular/core';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class WindowService {

  constructor() {

  }

  createWindow(url: string, name: string = 'Window', width: number = 500, height: number = 300, left: number = 0, top: number = 0) {
    if (url == null) {
      return null;
    }

    const options = `width=${width},height=${height},left=${left},top=${top}`;

    return window.open(url, name, options);
  }

  get nativeWindow(): any {
    return _window();
  }

}
