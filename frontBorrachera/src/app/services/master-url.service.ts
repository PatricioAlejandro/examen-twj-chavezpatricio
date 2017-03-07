import {Injectable} from '@angular/core';

@Injectable()
export class MasterURLService {

  private _url: string;

  constructor() {
    //this._url = "http://localhost:1337/";
    this.url = "https://examen-twj-chavezpatricio-patricioalejandro.c9users.io"
    // this.url = "https://asdasd-asdasdasd.herokuapp.com"
  }

  get url(): string {
    return this._url;
  }

  set url(nuevoUrl: string) {
    this._url = nuevoUrl;
  }

}
