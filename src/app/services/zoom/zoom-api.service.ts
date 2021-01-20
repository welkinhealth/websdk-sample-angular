import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ZoomApiService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl + '/api';
  }

  // Token will be generated in Python Dynamically
  // Meeting Config fetched from backend
  createMeeting(tokenData: any) {
    return this.httpClient.post(
      `${this.baseUrl}/zoom/create-meeting`,
      tokenData,
      { responseType: 'json' }
    );
  }

  getWelkinProvider(provider_id: string) {
    return this.httpClient.get<any>(
      `${this.baseUrl}/provider-details/${provider_id}`
    );
  }

  getSignatureForZoom(meetingData: any) {
    return this.httpClient.post(`${this.baseUrl}/zoom/signature`, meetingData, {
      responseType: 'text',
    });
  }
}
