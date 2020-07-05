import { createTransport, SendMailOptions } from 'nodemailer';
import { EmailServiceOptions } from '../interfaces';

export class EmailService {
    private emailAddress!: string;
    private emailPassword!: string;

    constructor(options?: EmailServiceOptions) {
        if (options && options.emailAddress) {
            this.emailAddress = options.emailAddress;
        } else if (process.env.NODEMAILER_EMAIL_ADDRESS) {
            this.emailAddress = process.env.NODEMAILER_EMAIL_ADDRESS;
        }

        if (options && options.emailPassword) {
            this.emailPassword = options.emailPassword;
        } else if (process.env.NODEMAILER_EMAIL_PASSWORD) {
            this.emailPassword = process.env.NODEMAILER_EMAIL_PASSWORD;
        }
    }

    public async sendEmail(to: string, from: string, subject: string, text: string, html: string): Promise<boolean> {

        if (!this.emailAddress) {
            console.log('Environment variable NODEMAILER_EMAIL_ADDRESS missing!');
            return false;
        }

        if (!this.emailPassword) {
            console.log('Environment variable NODEMAILER_EMAIL_PASSWORD missing!');
            return false;
        }

        try {
            const transporter = createTransport({
                service: 'Gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: this.emailAddress,
                    pass: this.emailPassword
                }
            });
            
            const options: SendMailOptions = {
                from,
                to,
                subject,
                text,
                html
            };

            await transporter.sendMail(options);

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
