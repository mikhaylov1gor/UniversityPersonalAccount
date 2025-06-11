import {FileExtension} from "@/shared/models/enums/fileExtension.ts";

export interface FileDto{
    id: string,
    name: string | null,
    extension: FileExtension,
    size: number
}