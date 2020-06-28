export class ValidationService {
    private EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private PASSWORD_REGEX_1: RegExp = /(?=.{8,})/;
    private PASSWORD_REGEX_2: RegExp = /(?=.[!@#\$%\^&])/;
    private PASSWORD_REGEX_3: RegExp = /(?=.*[0-9])/;

    private customValidations: Map<string, Function>;

    constructor(validations: Map<string, Function> = null) {
        this.customValidations = new Map<string, Function>();

        if (validations) {
            validations.forEach((value: Function, key: string) => {
                this.addCustomValidation(key, value);
            });
        }
    }

    // TODO: Add validation of a function handler to be of type
    //       (args: any) => boolean (interface) and update types
    public addCustomValidation(name: string, validationHandler: Function) {
        if(this.customValidations.has(name)) {
            throw new Error("Validation with that name already exists!");
        } else {
            this.customValidations.set(name, validationHandler);
        }
    }

    public validate(name: string, args: any): boolean {
        if (!this.customValidations.has(name)) {
            throw new Error("Validation with that name doesn't exist!");
        } else {
            return this.customValidations.get(name)(args);
        }
    }

    public validateEmail(email: string): boolean {
        return this.EMAIL_REGEX.test(email);
    }

    public validatePassword(password: string): boolean {
        return this.PASSWORD_REGEX_1.test(password) && this.PASSWORD_REGEX_2.test(password) && this.PASSWORD_REGEX_3.test(password);
    }
}
