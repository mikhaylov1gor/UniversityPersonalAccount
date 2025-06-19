import {BaseDictionaryDto} from "@/shared/models/responses/baseDictionaryDto.ts";

export interface EducationEntryDto {
    id: string;
    faculty: BaseDictionaryDto | null;
    group: BaseDictionaryDto;
    educationStatus: BaseDictionaryDto;
    educationBase: BaseDictionaryDto;
    educationDirection: BaseDictionaryDto;
    educationProfile: BaseDictionaryDto;
    educationQualification: BaseDictionaryDto;
    educationLevel: BaseDictionaryDto;
    educationForm: BaseDictionaryDto;
    educationYears: BaseDictionaryDto;
    creditBooknumber: string | null;
    course: number;
    admissionYear: number;
}