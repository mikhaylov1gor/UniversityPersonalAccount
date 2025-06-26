import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {AuthStoreApi} from "@/shared/services/auth.service.ts";
import {LoginDto} from "@/shared/models/requests/loginDto.ts";
import {useNavigate} from "react-router-dom";
import {RouteName} from "@/shared/config/router";
import Input from "@/shared/ui/atoms/Input/Input";
import Button from "@/shared/ui/atoms/Button/Button";
import {toast} from "@/app/providers/Toast/ToastController.ts";
import {ProfileStoreApi} from "@/shared/services/profile.service.ts";
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import styles from "./LoginCredentials.module.scss"
import {Switcher} from "@/shared/ui/atoms/Switcher/Switcher.tsx";

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
                toast.success("Вход выполнен успешно");

                const data = await ProfileStoreApi.getCurrentUserProfile();
                const avatar = await FilesStoreApi.getFileById(data.avatar.id)
                const blob = new Blob([avatar.data], {type: avatar.headers['content-type'] || 'image/jpeg'});
                const url = URL.createObjectURL(blob);

                localStorage.setItem("avatarUrl", url);
                if (data.userTypes.length == 0){
                    localStorage.setItem("role", "admin")
                }
                navigate(RouteName.PROFILE_PAGE)
            }
            else{
                toast.error("Неверный логин или пароль");
            }

        } catch (error: any) {
        }
    };

    return(
        <>
            <div className={styles.cardWrapper}>
                <h1 className={styles.title}>{t("loginPage.title" as any)}</h1>


                <form className={styles.formSection} onSubmit={submit}>
                    <div style={{marginBottom: "1rem"}}>
                        <Input
                            value={email}
                            onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                setEmail(e.currentTarget.value)
                            }
                            label={t("loginPage.email" as any)}
                        />
                    </div>

                    <Input
                        value={password}
                        type="password"
                        onInput={(e: React.FormEvent<HTMLInputElement>) =>
                            setPassword(e.currentTarget.value)
                        }
                        label={t("loginPage.password" as any)}
                    />

                    <div className={styles.switchContainer}>
                        <Switcher
                            isOn={rememberMe}
                            onToggle={() => setRememberMe(!rememberMe)}
                        />
                        <p className={styles.rememberLabel}>{t("loginPage.rememberMe" as any)}</p>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        width="100%"
                    >
                        {t("loginPage.loginButton" as any)}
                    </Button>
                </form>
            </div>
        </>
    )
}