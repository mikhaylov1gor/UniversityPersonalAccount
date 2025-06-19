import {ProfileShortDto} from "@/shared/models/responses/profile/profileShortDto.ts";
import {PagedListMetaData} from "@/shared/models/responses/pagedListMetaData.ts";

export interface ProfileShortDtoPagedListWithMetadata{
    results: ProfileShortDto[] | null,
    metaData: PagedListMetaData,
}