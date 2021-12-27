import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private LOGIN_URL: string = '';

    constructor(private httpClient: HttpClient) {}

    public requestLogin(email: string, password: string): Observable<Object> {
        return this.httpClient.post(this.LOGIN_URL, { email, password });
    }

    public requestSocialNetworkLogin(data: any) {

    }
}
