import multer, { FileFilterCallback, Multer } from "multer";
import { Request } from "express";

const storage: multer.StorageEngine = multer.memoryStorage();

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void => {
    const allowedMimeTypes: string[] = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    const isAllowed: boolean = allowedMimeTypes.includes(file.mimetype);
    if (isAllowed) {
        cb(null, true);
    } else {
        cb(new Error("Tipo de arquivo inválido. Envie uma imagem."));
    }
};

const upload: Multer = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

export default upload;
