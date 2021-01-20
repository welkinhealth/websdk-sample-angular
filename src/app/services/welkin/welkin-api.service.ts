import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WelkinApiService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl + '/api';
  }
}
