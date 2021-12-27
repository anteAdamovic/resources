import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private REGISTER_URL: string = '';

    constructor(private httpClient: HttpClient) {}

    public requestRegistration(email: string, password: string): Observable<Object> {
        return this.httpClient.post(this.REGISTER_URL, { email, password });
    }
}
