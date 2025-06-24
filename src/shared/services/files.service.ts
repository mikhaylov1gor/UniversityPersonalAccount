import axiosInstance from '../api/axiosInstance';
import {filesController} from "@/shared/api/endpoints.ts";
import {FileResultDto} from "@/shared/models/responses/fileResultDto.ts";

export const FilesStoreApi = {
    getFileById: async (id: string)=>{
        return await axiosInstance.get(`${filesController}/${id}`, {
            responseType: 'arraybuffer',
        });
    },

    postFile: async (file: Blob, filename: string) => {
        const formData = new FormData();
        formData.append('file', file, filename);

        const response = await axiosInstance.post<FileResultDto>(
            `${filesController}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    },

    postFileFormData: async (file: FormData) => {

        const response = await axiosInstance.post<FileResultDto>(
            `${filesController}`,
            file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    }
};