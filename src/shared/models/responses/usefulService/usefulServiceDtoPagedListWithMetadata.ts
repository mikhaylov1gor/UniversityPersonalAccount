import {UsefulServiceDto} from "@/shared/api/models/responses/usefulService/usefulServiceDto.ts";
import {PagedListMetaData} from "@/shared/api/models/responses/pagedListMetaData.ts";

export interface UsefulServiceDtoPagedListWithMetadata{
    result: UsefulServiceDto[] | null,
    metaData: PagedListMetaData,
}