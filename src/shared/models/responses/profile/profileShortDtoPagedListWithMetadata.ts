import {ProfileShortDto} from "@/shared/api/models/responses/profile/profileShortDto.ts";
import {PagedListMetaData} from "@/shared/api/models/responses/pagedListMetaData.ts";

export interface ProfileShortDtoPagedListWithMetadata{
    results: ProfileShortDto[] | null,
    metaData: PagedListMetaData,
}