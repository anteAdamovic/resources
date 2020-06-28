import request from "request";
import { SlackServiceOptions } from '../interfaces';
import { ServiceDisabledError } from '../errors';

export class SlackService {
    private slackWebhook: string | null;
    private slackNotificationsEnabled: boolean = true;

    constructor(options?: SlackServiceOptions) {
        if (process.env.SLACK_WEBHOOK_URL) {
            this.slackWebhook = process.env.SLACK_WEBHOOK_URL;
        } else {
            console.log("SLACK_WEBHOOK_URL environment variable not set!!!");
            process.exit(0);
        }

        if (options) {
            this.slackNotificationsEnabled = options.slackNotificationsEnabled;
        }
    }

    public async sendSlackNotification(text: string): Promise<boolean> {
        if (this.slackNotificationsEnabled === false) {
            console.log("Slack notifications are disabled by configuration.");
            throw new ServiceDisabledError("SlackService");
        }

        return new Promise((resolve, reject) => {
            request.post({
                url: this.slackWebhook,
                body: {
                    text
                },
                json: true
            }, (err, res, body) => {
                if (err) {
                    console.log(err);
                    reject(false);
                }

                resolve(true);
            });
        });
    }
}
