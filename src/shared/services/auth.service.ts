import axiosInstance from '../api/axiosInstance';
import {authController} from "@/shared/api/endpoints.ts";
import {LoginDto} from "@/shared/models/requests/loginDto.ts";
import {LoginResultDto} from "@/shared/models/responses/loginResultDto.ts";

export const AuthStoreApi = {
    login: async (credentials: LoginDto):Promise<LoginResultDto> =>{
        const response = await axiosInstance.post(`${authController}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    logout: async () =>{
        return await axiosInstance.post(`${authController}/logout`)
    },

    revokeTokens: async () =>{
        return await axiosInstance.post(`${authController}/revoke_all`)
    }
};