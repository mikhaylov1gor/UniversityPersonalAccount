import React from "react";
import { useTranslation } from "react-i18next";
import { RouteName } from "@/shared/config/router";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@/shared/ui/atoms/Icon/Icon";
import { Menu, X } from "lucide-react";
import styles from "./NavbarMenu.module.scss";
import defaultAvatar from "@/shared/assets/test/photo_profile.png";

interface NavbarMenuProps {
    avatarUrl: string | null;
    open: boolean;
    mobileOverlay: boolean;
    onToggleOpen: () => void;
    onToggleMobileOverlay: () => void;
    isDesktop: boolean;
}

export function NavbarMenu({
                               avatarUrl,
                               open,
                               mobileOverlay,
                               onToggleOpen,
                               onToggleMobileOverlay,
                               isDesktop,
                           }: NavbarMenuProps) {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        {
            iconName: "user-black",
            label: t("menu.profile"),
            path: RouteName.PROFILE_PAGE
        },
        {
            iconName: "administrator-black",
            label: t("menu.administration"),
            path: RouteName.ADMIN_PAGE
        },
        {
            iconName: "document-black",
            label: t("menu.certificates"),
            path: RouteName.CERTIFICATES_PAGE
        },
        {
            iconName: "link-black",
            label: t("menu.usefulServices"),
            path: RouteName.USEFUL_SERVICES_PAGE
        },
        {
            iconName: "map-black",
            label: t("menu.events"),
            path: RouteName.EVENTS_PAGE
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
                    {mobileOverlay ? <X /> : <Menu />}
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
                <div className={styles.sidebar__header}>

                    <img
                        src={avatarUrl || defaultAvatar}
                        alt="avatar"
                        className={styles.sidebar__avatar}
                    />

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
                    {menuItems.map((item, idx) => {
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
                                        : styles["sidebar__menuItem--expanded"], // mobile overlay — покажем икон+текст
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <Icon name={iconName} size={40} fill="none" />
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