import { UploadedFile } from "express-fileupload";
import { BaseService } from "../config/main/BaseService";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";
import path from "path";

export class FileService extends BaseService {
    private filePath = path.join(path.dirname(path.dirname(__dirname)), "uploads");

    public add(file: UploadedFile, filename: string) {
        try {
            const stream = createWriteStream(path.join(this.filePath, filename));
            stream.write(file);
            return true;
        } catch (error) {
            return false;
        }
    }

    public async delete(filename: string) {
        try {
            await unlink(path.join(this.filePath, filename));
            return true;
        } catch (error) {
            return false;
        }
    }
}