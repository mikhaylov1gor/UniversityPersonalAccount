import {EducationEntryDto} from "@/shared/api/models/responses/educationEntryDto.ts";

export interface StudentDto{
    id: string,
    educationEntries: EducationEntryDto[] | null,
}