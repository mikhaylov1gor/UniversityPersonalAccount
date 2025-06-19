import {UsefulServiceDto} from "@/shared/models/responses/usefulService/usefulServiceDto.ts";
import {PagedListMetaData} from "@/shared/models/responses/pagedListMetaData.ts";

export interface UsefulServiceDtoPagedListWithMetadata{
    result: UsefulServiceDto[] | null,
    metaData: PagedListMetaData,
}