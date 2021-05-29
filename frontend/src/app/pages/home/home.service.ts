import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Isounds } from 'src/app/interfaces/Isounds';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  requestUrl = 'assets/mock/sounds.json'
  getSounds() {
    return this.http.get<Isounds>(this.requestUrl);
  }
}