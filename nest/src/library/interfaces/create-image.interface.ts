import { IMAGE_TYPE } from '../enums/image-routes.enum';

interface createImage {
  file: Express.Multer.File;
  type: IMAGE_TYPE;
  altText?: string;
}

export type { createImage };
