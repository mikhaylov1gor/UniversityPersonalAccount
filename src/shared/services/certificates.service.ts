import axiosInstance from '../api/axiosInstance';
import {certificatesController} from "@/shared/api/endpoints.ts";
import {UserType} from "@/shared/models/enums/userType.ts";
import {CertificateDto} from "@/shared/models/responses/certificateDto.ts";
import {CertificateCreateDto} from "@/shared/models/requests/certificateCreateDto.ts";


export const CertificatesStoreApi = {
    getCurrentCertificates: async (userType: string, ownerId: string) =>{
        const response = await axiosInstance.get<CertificateDto>(`${certificatesController}/userType/${userType}/entity/${ownerId}`)
        return response.data;
    },

    createCertificate: async (dto: CertificateCreateDto) =>{
        return await axiosInstance.post(`${certificatesController}`, dto, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
};