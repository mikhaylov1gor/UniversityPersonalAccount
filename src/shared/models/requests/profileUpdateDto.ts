import {Gender} from "@/shared/models/enums/gender.ts";

export interface ProfileUpdateDto{
    lastName: string | null,
    firstName: string | null,
    patronymic: string | null,
    birthDate: string,
    gender: Gender,
}