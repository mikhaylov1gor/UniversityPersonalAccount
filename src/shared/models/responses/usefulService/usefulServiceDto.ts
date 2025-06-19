import {UsefulServiceCategory} from "@/shared/models/enums/usefulServiceCategory.ts";
import {FileDto} from "@/shared/models/responses/fileDto.ts";

export interface UsefulServiceDto {
    id: string,
    category: UsefulServiceCategory,
    title: string | null,
    description: string | null,
    link: string | null,
    termsOfDistribution: string | null,
    logo: FileDto,
}