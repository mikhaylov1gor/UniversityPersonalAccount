import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import { RouteName } from "@/shared/config/router";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@/shared/ui/atoms/Icon/Icon";
import { Menu, X } from "lucide-react";
import styles from "./NavbarMenu.module.scss";
import defaultAvatar from "@/shared/assets/test/photo_profile.png";
import {AuthStoreApi} from "@/shared/services/auth.service.ts";
import {toast} from "@/app/providers/Toast/ToastController.ts";

interface NavbarMenuProps {
    open: boolean;
    mobileOverlay: boolean;
    onToggleOpen: () => void;
    onToggleMobileOverlay: () => void;
    isDesktop: boolean;
}

export function NavbarMenu({
                               open,
                               mobileOverlay,
                               onToggleOpen,
                               onToggleMobileOverlay,
                               isDesktop,
                           }: NavbarMenuProps) {
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const rolesJson = localStorage.getItem("roles");
    const roles: string[] = rolesJson ? JSON.parse(rolesJson) : [];
    const isAdmin = roles.includes("admin");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [avatarUrl, setAvatarUrl] = useState<string | null>(localStorage.getItem("avatarUrl"));

    useEffect(() => {
        const handleStorage = () => {
            setAvatarUrl(localStorage.getItem("avatarUrl"));
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const handleLogout = async () => {
        console.log("Logout logic here");
        try{
            await AuthStoreApi.logout();
        } catch (error){
            console.log("Ошибка логаута")
        } finally {
            toast.success("Выход выполнен успешно")
            localStorage.clear();
            navigate(RouteName.EVENTS_PAGE);
        }
    };
    const handleLogin = () =>{
        navigate(RouteName.LOGIN_PAGE)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        {
            iconName: "user-black",
            label: t("menu.profile" as any),
            path: RouteName.PROFILE_PAGE,
            authRequired: true,
            adminRequired: false
        },
        {
            iconName: "administrator-black",
            label: t("menu.administration" as any),
            path: RouteName.ADMIN_PAGE,
            authRequired: true,
            adminRequired: true
        },
        {
            iconName: "document-black",
            label: t("menu.certificates" as any),
            path: RouteName.CERTIFICATES_PAGE,
            authRequired: true,
            adminRequired: false
        },
        {
            iconName: "link-black",
            label: t("menu.usefulServices" as any),
            path: RouteName.USEFUL_SERVICES_PAGE,
            authRequired: true,
            adminRequired: false
        },
        {
            iconName: "map-black",
            label: t("menu.events" as any),
            path: RouteName.EVENTS_PAGE,
            authRequired: false,
            adminRequired: false
        },
    ];


    return (
        <>
            {!isDesktop && (
                <button
                    className={styles.mobileBurger}
                    aria-label={mobileOverlay ? "Закрыть меню" : "Открыть меню"}
                    onClick={onToggleMobileOverlay}
                >
                    {mobileOverlay ? <X/> : <Menu/>}
                </button>
            )}

            {!isDesktop && mobileOverlay && (
                <div
                    className={styles.mobileOverlayBackdrop}
                    onClick={onToggleMobileOverlay}
                />
            )}

            <aside
                className={[
                    styles.sidebar,
                    isDesktop
                        ? open
                            ? styles["sidebar--expanded"]
                            : styles["sidebar--collapsed"]
                        : mobileOverlay
                            ? styles["sidebar--mobile-visible"]
                            : styles["sidebar--mobile-hidden"],
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <div className={styles.sidebar__header} style={{zIndex: '20'}} ref={dropdownRef}>
                    <img
                        src={avatarUrl || defaultAvatar}
                        alt="avatar"
                        className={styles.sidebar__avatar}
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        style={{cursor: "pointer"}}
                    />

                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            {accessToken !== null ? (
                                <button onClick={handleLogout} className={styles.dropdownButton}>
                                    {t("common.logout" as any)}
                                    <Icon name="log-out-black" size={20} fill='none' />
                                </button>
                            ) : (
                                <button onClick={handleLogin} className={styles.dropdownButton}>
                                    {t("common.login" as any)}
                                    <Icon name="log-in-black" size={20} fill='none'/>
                                </button>
                            )}
                        </div>
                    )}

                    {isDesktop && (
                        <button
                            onClick={onToggleOpen}
                            className={styles.sidebar__toggleBtn}
                            aria-label={open ? "Свернуть меню" : "Развернуть меню"}
                        >
                            {open ? (
                                <Icon name="chevron-left-red" size={26} fill={"none"}/>
                            ) : (
                                <Icon name="chevron-right-red" size={26} fill={"none"}/>
                            )}
                        </button>
                    )}
                </div>

                <ul className={styles.sidebar__menu}>
                    {menuItems
                        .filter(item => {
                            if (item.authRequired && !accessToken) return false;
                            if (item.adminRequired && !isAdmin) return false;
                            return true;
                        })
                        .map((item, idx) => {
                        const isActive = location.pathname === item.path;
                        const iconName = item.iconName.replace(
                            "-black",
                            isActive ? "-red" : "-black"
                        );
                        return (
                            <li
                                key={idx}
                                onClick={() => {
                                    navigate(item.path);
                                    if (!isDesktop) {
                                        onToggleMobileOverlay();
                                    }
                                }}
                                className={[
                                    styles.sidebar__menuItem,
                                    isActive ? styles["sidebar__menuItem--active"] : "",
                                    isDesktop
                                        ? open
                                            ? styles["sidebar__menuItem--expanded"]
                                            : styles["sidebar__menuItem--collapsed"]
                                        : styles["sidebar__menuItem--expanded"],
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <Icon name={iconName} size={40} fill="none"/>
                                {(isDesktop ? open : true) && (
                                    <span className={styles.sidebar__menuLabel}>
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </>
    );
}

export default NavbarMenu;