import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import { toast } from "react-toastify";
import {AuthStoreApi} from "@/shared/services/auth.service.ts";
import {LoginDto} from "@/shared/models/requests/loginDto.ts";
import {useNavigate} from "react-router-dom";
import {RouteName} from "@/shared/config/router";
import Input from "@/shared/ui/atoms/Input/Input";
import Button from "@/shared/ui/atoms/Button/Button";

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

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                t("toast.login.errorMessage")
            );
        }
    };

    return(
        <>
            <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8">
                <div className="relative">
                    <div style={{margin: '2rem'}}>
                        <h1 className="text-2xl font-semibold text-center mb-6">{t("loginPage.title")}</h1>
                    </div>
                </div>

                <form className="space-y-5" onSubmit={submit}>
                    <div className="relative">
                        <div style={{margin: '2rem'}}>
                            <Input value={email}
                                   onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                       setEmail(e.currentTarget.value)
                                   } label={t("loginPage.email")}>
                            </Input>
                        </div>
                    </div>

                    <div className="relative">
                        <div style={{margin: '2rem'}}>
                            <Input value={password} type="password"
                                   onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                       setPassword(e.currentTarget.value)
                                   } label={t("loginPage.password")}>
                            </Input>
                        </div>
                    </div>

                    <div className="flex items-center" style={{margin: '2rem'}}>
                        <button
                            type="button"
                            onClick={() => setRememberMe(!rememberMe)}
                            style={{
                                position: 'relative',
                                width: '40px',
                                height: '20px',
                                borderRadius: '9999px',
                                backgroundColor: rememberMe ? '#2563eb' : '#e5e7eb',
                                border: 'none',
                                transition: 'background-color 0.3s ease',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                        <span
                            style={{
                                position: 'absolute',
                                top: '2px',
                                left: rememberMe ? '22px' : '2px',
                                width: '16px',
                                height: '16px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                transition: 'left 0.2s ease',
                            }}
                        />
                        </button>
                        <label className="ml-3 block text-sm text-gray-700">
                            {t("loginPage.rememberMe")}
                        </label>
                    </div>


                    <div className="relative">
                        <div style={{margin: '2rem'}}>
                            <Button
                                type="submit"
                                variant="primary"
                                width="100%"
                            >
                                {t("loginPage.loginButton")}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}