import {Gender} from "@/shared/models/enums/gender.ts";
import {FileDto} from "@/shared/models/responses/fileDto.ts";

export interface UserShortDto{
    id: string,
    lastName: string | null,
    firstName: string | null,
    patronymic: string | null,
    birthDate: string,
    gender: Gender
    email: string | null,
    avatar: FileDto
}