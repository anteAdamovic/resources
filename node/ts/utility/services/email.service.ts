import { createTransport, SendMailOptions } from 'nodemailer';
import { readFileSync } from "fs";

export class EmailService {

    public async sendEmail(to: string, from: string, subject: string, text: string, html: string): Promise<boolean> {

        const address = process.env.NODEMAILER_EMAIL_ADDRESS;
        const password = process.env.NODEMAILER_EMAIL_PASSWORD;

        if (!address) {
            console.log('Environment variable NODEMAILER_EMAIL_ADDRESS missing!');
            return false;
        }

        if (!password) {
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
                    user: address,
                    pass: password
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
