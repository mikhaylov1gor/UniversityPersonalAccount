import {Gender} from "@/shared/models/enums/gender.ts";
import {FileDto} from "@/shared/api/models/responses/fileDto.ts";
import {CountryDto} from "@/shared/api/models/responses/countryDto.ts";
import {ContactDto} from "@/shared/api/models/responses/contactDto.ts";
import {UserType} from "@/shared/models/enums/userType.ts";

export interface ProfileDto{
    id: string,
    email: string | null,
    lastName: string | null,
    firstName: string | null,
    patronymic: string | null,
    birthDate: string,
    gender: Gender,
    avatar: FileDto,
    citizenShip: CountryDto,
    address: string | null,
    contacts: ContactDto[] | null,
    userTypes: UserType[] | null,
}