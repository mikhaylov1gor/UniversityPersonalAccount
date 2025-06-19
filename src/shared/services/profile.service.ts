import axiosInstance from '../api/axiosInstance';
import {profileController} from "@/shared/api/endpoints.ts";
import {ProfileDto} from "@/shared/models/responses/profile/profileDto.ts";
import {StudentDto} from "@/shared/models/responses/studentDto.ts";
import {EmployeeDto} from "@/shared/models/responses/employeeDto.ts";
import {AvatarUpdateDto} from "@/shared/models/requests/avatarUpdateDto.ts";

export const ProfileStoreApi = {
    getCurrentUserProfile: async () =>{
        const response = await axiosInstance.get<ProfileDto>(`${profileController}`)
        return response.data;
    },

    getCurrentUserStudent: async () =>{
        const response = await axiosInstance.get<StudentDto>(`${profileController}/student`)
        return response.data;
    },

    getCurrentUserEmployee: async () =>{
        const response = await axiosInstance.get<EmployeeDto>(`${profileController}/employee`)
        return response.data;
    },

    updateAvatar: async (dto: AvatarUpdateDto) =>{
        return await axiosInstance.put(`${profileController}/avatar`, dto, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};