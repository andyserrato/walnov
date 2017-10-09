import { Injectable } from '@angular/core';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class WindowService {

  constructor() {

  }

  createWindow(url: string, name: string = 'Window', width: number = 500, height: number = 600, left: number = 0, top: number = 0) {
    if (url == null) {
      return null;
    }

    const options = `width=${width},height=${height},left=${screen.width / 2 - width / 2},top=${screen.height / 2 - height / 2}`;

    return window.open(url, name, options);
  }

  get nativeWindow(): any {
    return _window();
  }

}
