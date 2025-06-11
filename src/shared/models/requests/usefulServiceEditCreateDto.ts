import {UsefulServiceCategory} from "@/shared/models/enums/usefulServiceCategory.ts";

export interface UsefulServiceEditCreateDto{
    category: UsefulServiceCategory,
    title: string | null,
    description: string | null,
    link: string | null,
    termsOfDistribution: string | null,
    logoId: string | null,
}