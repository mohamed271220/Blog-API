import { Injectable } from '@nestjs/common';
import multer from 'multer';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

const MIME_TYPE_MAP: { [key: string]: string } = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

@Injectable()
export class MediaService {
  constructor(private configService: ConfigService) {}

  getMulterUpload() {
    const s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    return multer({
      storage: multerS3({
        s3,
        bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
        key: (req, file, cb) => {
          const ext = MIME_TYPE_MAP[file.mimetype];
          cb(null, `${uuidv4()}.${ext}`);
        },
      }),
      fileFilter: (req, file, cb: any) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        const error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
      },
      limits: { fileSize: 5000000 }, // 5MB
    });
  }
}
