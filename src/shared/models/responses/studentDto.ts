import {EducationEntryDto} from "@/shared/models/responses/educationEntryDto.ts";

export interface StudentDto {
    id: string;
    educationEntries: EducationEntryDto[] | null;
}