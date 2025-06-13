import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import { toast } from "react-toastify";
import {AuthStoreApi} from "@/shared/services/auth.service.ts";
import {LoginDto} from "@/shared/models/requests/loginDto.ts";
import {useNavigate} from "react-router-dom";
import {RouteName} from "@/shared/config/router";

export function LoginCredentialsCard(){
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation();
    const navigate = useNavigate();


    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dto: LoginDto = {
            email: email,
            password: password,
            rememberMe: rememberMe
        };

        try {
            const response = await AuthStoreApi.login(dto);

            if (response.loginSucceeded && response.accessToken && response.refreshToken) {
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                toast.success(t("toast.login.successMessage"));

                navigate(RouteName.PROFILE_PAGE)
            } else {
                toast.error(t("toast.login.invalidCredentials"));
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                t("toast.login.errorMessage")
            );
        }
    };

    return(
        <>
            <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">{t("loginPage.title")}</h2>

                <form className="space-y-5" onSubmit={submit}>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2
                                               focus:ring-blue-200 focus:border-blue-500 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                               transition-all peer-placeholder-shown:text-base
                                               peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                                               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600"
                        >
                            {t("loginPage.email")}
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg
                                               focus:ring-2 focus:ring-blue-200 focus:border-blue-500 peer"
                            placeholder=" "/>
                        <label
                            htmlFor="password"
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600
                                               transition-all peer-placeholder-shown:text-base
                                               peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                                               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600">
                            {t("loginPage.password")}
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                type="button"
                                className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                                    transition-colors focus:outline-none focus:ring-2 
                                                    focus:ring-blue-500 focus:ring-offset-2 
                                                    ${rememberMe ? 'bg-blue-600' : 'bg-gray-200'}`}
                                onClick={() => setRememberMe(!rememberMe)}>
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform 
                                                    ${rememberMe ? 'translate-x-6' : 'translate-x-1'}`}/>
                            </button>
                            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                                {t("loginPage.rememberMe")}
                            </label>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg
                                           hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2
                                           focus:ring-blue-500 focus:ring-offset-2">
                        {t("loginPage.loginButton")}
                    </button>
                </form>
            </div>
        </>
    )
}