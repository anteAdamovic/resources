export class ValidationService {
    private EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private PASSWORD_REGEX_1: RegExp = /(?=.{8,})/;
    private PASSWORD_REGEX_2: RegExp = /(?=.[!@#\$%\^&])/;
    private PASSWORD_REGEX_3: RegExp = /(?=.*[0-9])/;


    public validateEmail(email: string): boolean {
        return this.EMAIL_REGEX.test(email);
    }

    public validatePassword(password: string): boolean {
        return this.PASSWORD_REGEX_1.test(password) && this.PASSWORD_REGEX_2.test(password) && this.PASSWORD_REGEX_3.test(password);
    }
}
