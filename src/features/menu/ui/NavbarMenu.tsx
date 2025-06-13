import {useState} from "react";
import {Menu} from "lucide-react";
import {useTranslation} from "react-i18next";

import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import {RouteName} from "@/shared/config/router";
import {useLocation, useNavigate} from "react-router-dom";

interface NavbarMenuProps {
    avatarUrl: string
}

export function NavbarMenu({avatarUrl}: NavbarMenuProps) {
    const [open, setOpen] = useState(true);
    const [mobileMenu, setMobileMenu] = useState(false);
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: <Icon name="user-black" size={40} fill={'none'}/>, label: t("menu.profile"), path: RouteName.PROFILE_PAGE},
        { icon: <Icon name="administrator-black" size={40} fill={'none'}/>, label: t("menu.administration"), path: RouteName.ADMIN_PAGE },
        { icon: <Icon name="document-black" size={40} fill={'none'} />, label: t("menu.certificates"), path: RouteName.CERTIFICATES_PAGE },
        { icon: <Icon name="link-black" size={40} fill={'none'}/>, label: t("menu.usefulServices"), path: RouteName.USEFUL_SERVICES_PAGE },
        { icon: <Icon name="map-black" size={40} fill={'none'}/>, label: t("menu.events"), path: RouteName.EVENTS_PAGE },
    ];

    const toggleSidebar = () => setOpen(!open);
    const toggleMobile = () => setMobileMenu(!mobileMenu);

    return (
        <>
            <div className="md:hidden p-4">
                <button onClick={toggleMobile}>
                    <Menu />
                </button>
            </div>

            <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 
                ${mobileMenu ? "block w-64 z-50 md:hidden" : open ? "hidden md:block w-64" : "hidden md:block w-24"}`}>

                <div className="flex justify-between items-center p-4">
                    <img
                        src="src/shared/assets/test/photo_profile.png"
                        alt="avatar"
                        className="rounded-full w-12 h-12 mb-4"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "src/shared/assets/test/photo_profile.png\"";
                        }}
                    />
                    <button
                        onClick={toggleSidebar}
                        className="absolute right-[-12px] transform -translate-y-1/2 bg-white shadow-md rounded-full p-1 hidden md:block"
                    >
                        {open
                            ? <Icon name="chevron-left-red" size={24} fill={'none'}/>
                            : <Icon name="chevron-right-red" size={24} fill={'none'}/>}
                    </button>
                </div>

                <ul className="mt-8">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        const iconName = item.icon.props.name.replace("-black", isActive ? "-red" : "-black");

                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    navigate(item.path);
                                    setMobileMenu(false);
                                }}
                                className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-blue-100 
                                            ${isActive ? "bg-blue-100" : ""}`}
                            >
                                <Icon name={iconName} size={40} fill="none" />
                                {open && <span className="text-sm">{item.label}</span>}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {mobileMenu && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={() => setMobileMenu(false)}
                />
            )}
        </>
    );
}
