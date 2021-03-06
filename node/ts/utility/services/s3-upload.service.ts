import { S3, Request, AWSError, config } from 'aws-sdk';
import { S3Object, S3UploadServiceOptions } from '../interfaces';
import { ServiceDisabledError } from '../errors';

export class S3UploadService {
    private s3UploadEnabled: boolean = true;
    private bucket!: string;

    constructor(options?: S3UploadServiceOptions) {
        const {
            S3_ACCESS_KEY_ID,
            S3_SECRET_ACCESS_KEY,
            S3_AWS_REGION,
            S3_BUCKET
        } = process.env;

        if (
            !S3_ACCESS_KEY_ID ||
            !S3_SECRET_ACCESS_KEY ||
            !S3_AWS_REGION ||
            !S3_BUCKET
        ) {
            console.log('Missing environment configurations, check that all exist and are valid:');
            console.log('S3_ACCESS_KEY_ID');
            console.log('S3_SECRET_ACCESS_KEY');
            console.log('S3_AWS_REGION');
            console.log('S3_BUCKET');
            process.exit(0);
        }

        if (options) {
            this.s3UploadEnabled = options.s3UploadEnabled;
        }

        if (this.s3UploadEnabled) {
            this.bucket = S3_BUCKET;

            config.update({
                accessKeyId: S3_ACCESS_KEY_ID,
                secretAccessKey: S3_SECRET_ACCESS_KEY,
                region: `${S3_AWS_REGION}`,
            });
        }
    }

    public async uploadImage(base64: string): Promise<S3Object | null> {
        if (!this.s3UploadEnabled) {
            console.log("S3 upload is disabled by configuration.");
            throw new ServiceDisabledError("S3UploadService");
        }

        const base64Buffer: Buffer = Buffer.from(
            base64.replace(/^data:image\/\w+;base64,/, ''),
            'base64'
        );

        // Getting the file type, ie: jpeg, png or gif
        const type = base64.split(';')[0].split('/')[1];
        const UUID = this.generateUUID(11);

        const objectKey = `${UUID}.${type}`;
        const s3Params: S3.PutObjectRequest = {
            Bucket: this.bucket,
            Key: objectKey,
            Body: base64Buffer,
            ContentEncoding: 'base64',
            ContentType: `image/${type}`,
            ACL: 'public-read',
        };

        const s3: S3 = new S3();

        try {
            await s3.putObject(s3Params).promise();

            const request: Request<S3.GetObjectOutput, AWSError> = s3.getObject({
                Bucket: this.bucket,
                Key: objectKey,
            });
            const url = `https://${this.bucket}.${request.httpRequest.endpoint.host}/${objectKey}`;

            return {
                key: objectKey,
                url
            };
        } catch (e) {
            console.error(e);
            throw new Error('S3 upload failed!');
        }
    }

    private generateUUID(length: number) {
        const allCapsAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        const allLowerAlpha = "abcdefghijklmnopqrstuvwxyz".split('');
        const allNumbers = "0123456789".split('');

        const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];

        return [...Array(length)]
            .map(i => base[(Math.random() * base.length) | 0])
            .join('');
    }
}
