import request from "request";

export class SlackService {
    private slackWebhook: string | null;

    constructor() {
        this.slackWebhook = process.env.SLACK_WEBHOOK_URL || null;
    }
    
    private sendSlackNotification(text: string) {

        if (this.slackWebhook) {
            request.post({
                url: this.slackWebhook,
                body: {
                    text
                },
                json: true
            }, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }
                
                return true;
            });
        } else {
            console.log('ERROR: SLACK_WEBHOOK_URL not set!');
            return false;
        }
    }
}
