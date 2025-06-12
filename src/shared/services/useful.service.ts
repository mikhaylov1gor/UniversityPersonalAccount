import axiosInstance from '../api/axiosInstance';
import {usefulServicesController} from "@/shared/api/endpoints.ts";
import {UsefulServiceCategory} from "@/shared/models/enums/usefulServiceCategory.ts";
import {
    UsefulServiceDtoPagedListWithMetadata
} from "@/shared/models/responses/usefulService/usefulServiceDtoPagedListWithMetadata.ts";
import {UsefulServiceEditCreateDto} from "@/shared/models/requests/usefulServiceEditCreateDto.ts";

export const usefulServiceStoreApi = {
    getListByOfServices: async (categories: UsefulServiceCategory[], page: number, pageSize: number) => {
        const params = {
            categories: categories,
            page: page == null ? 1 : page,
            pageSize: pageSize == null ? 5 : pageSize,
        }

        const data: UsefulServiceDtoPagedListWithMetadata = await axiosInstance.get(`${usefulServicesController}`, {params})
        return data;
    },

    createServiceForAdmin: async (dto: UsefulServiceEditCreateDto)=>{
        return await axiosInstance.post(`${usefulServicesController}`, dto, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    editServiceForAdmin: async (usefulServiceId: string, dto: UsefulServiceEditCreateDto)=>{
        return await axiosInstance.put(`${usefulServicesController}/${usefulServiceId}`, dto, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    deleteServiceForAdmin: async (usefulServiceId: string)=>{
        return await axiosInstance.delete(`${usefulServicesController}/${usefulServiceId}`)
    }
};