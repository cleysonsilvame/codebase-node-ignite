import crypto from "crypto";
import multer from "multer";
import path from "path";

const uploadConfig = {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", folder),
        filename: (_, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};

export default uploadConfig;
