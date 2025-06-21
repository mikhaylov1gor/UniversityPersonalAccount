import axiosInstance from '../api/axiosInstance';
import {profileController, userController} from "@/shared/api/endpoints.ts";
import {
    ProfileShortDtoPagedListWithMetadata
} from "@/shared/models/responses/profile/profileShortDtoPagedListWithMetadata.ts";
import {ProfileDto} from "@/shared/models/responses/profile/profileDto.ts";
import {ProfileUpdateDto} from "@/shared/models/requests/profileUpdateDto.ts";
import {StudentDto} from "@/shared/models/responses/studentDto.ts";
import {EmployeeDto} from "@/shared/models/responses/employeeDto.ts";
import {AvatarUpdateDto} from "@/shared/models/requests/avatarUpdateDto.ts";

export const UserStoreApi = {
    getProfilesForAdmin: async (email: string, name: string, filterLastName: string, page: number, pageSize: number)=>{
        const params = {
            email: email,
            name: name,
            filterLastName: filterLastName,
            page: page == null ? 1 : page,
            pageSize: pageSize == null ? 5 : pageSize,
        }

        const response= await axiosInstance.get<ProfileShortDtoPagedListWithMetadata>(`${userController}/list`, {params});
        return response.data;
    },

    getSpecificUserProfileForAdmin: async (userId: string)=>{
        const response = await axiosInstance.get<ProfileDto>(`${userController}/${userId}`);
        return response.data;
    },

    updateSpecificUserProfileForAdmin: async (userId: string, dto: ProfileUpdateDto)=>{
        return await axiosInstance.put(`${userController}/${userId}`, dto ,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    getSpecificUserStudentForAdmin: async (userId: string)=>{
        const response = await axiosInstance.get<StudentDto>(`${userController}/${userId}/student`);
        return response.data;
    },

    getSpecificUserEmployeeForAdmin: async (userId: string)=>{
        const response = await axiosInstance.get<EmployeeDto>(`${userController}/${userId}/employee`);
        return response.data;
    },

    updateSpecificUserAvatarForAdmin: async (userId: string, dto: AvatarUpdateDto)=>{
        return await axiosInstance.put(`${userController}/${userId}/avatar`, dto, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }
};