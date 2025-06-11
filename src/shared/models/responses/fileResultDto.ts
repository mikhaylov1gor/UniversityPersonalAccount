import {FileExtension} from "@/shared/models/enums/fileExtension.ts";

export interface FileResultDto{
    id: string,
    name: string | null,
    extension: FileExtension,
    size: number
}