import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    private FORGOT_PASSWORD_URL: string = '';

    constructor(private httpClient: HttpClient) {}

    public requestForgottenPassword(email: string): Observable<Object> {
        return this.httpClient.post(this.FORGOT_PASSWORD_URL, { email });
    }
}
