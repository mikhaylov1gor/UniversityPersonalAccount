import {BaseDictionaryDto} from "@/shared/api/models/responses/baseDictionaryDto.ts";

export interface EducationEntryDto{
    id: string,
    faculty: BaseDictionaryDto,
    group: BaseDictionaryDto,
    educationStatus: BaseDictionaryDto,
    educationBase: BaseDictionaryDto,
    educationDirection: BaseDictionaryDto,
    educationProfile: BaseDictionaryDto,
    educationQualification: BaseDictionaryDto,
    educationLevel: BaseDictionaryDto,
    educationForm: BaseDictionaryDto,
    educationYeats: BaseDictionaryDto,
    creditBookNumber: string | null,
    course: number,
    admissionYear: number
}