import {Gender} from "@/shared/models/enums/gender.ts";
import {UserType} from "@/shared/models/enums/userType.ts";
import {FileDto} from "@/shared/models/responses/fileDto.ts";
import {CountryDto} from "@/shared/models/responses/countryDto.ts";
import {ContactDto} from "@/shared/models/responses/contactDto.ts";

export interface ProfileDto{
    id: string,
    email: string | null,
    lastName: string | null,
    firstName: string | null,
    patronymic: string | null,
    birthDate: string,
    gender: Gender,
    avatar: FileDto,
    citizenship: CountryDto,
    address: string | null,
    contacts: ContactDto[] | null,
    userTypes: UserType[] | null,
}