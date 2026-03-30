import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import outputs from '../../../../amplify_outputs.json';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  status: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);

  sendMessage(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(outputs.custom.contactApiUrl, payload);
  }
}
