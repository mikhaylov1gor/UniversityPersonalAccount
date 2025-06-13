import {useState} from "react";
import { Menu, ChevronLeft, ChevronRight, User, Shield, FileText, Link, Map } from "lucide-react";
import {useTranslation} from "react-i18next";

interface NavbarMenuProps {
    avatarUrl: string
}

export function NavbarMenu({avatarUrl}: NavbarMenuProps) {
    const [open, setOpen] = useState(true);
    const [mobileMenu, setMobileMenu] = useState(false);
    const {t} = useTranslation();

    const menuItems = [
        { icon: <User />, label: t("menu.profile") },
        { icon: <Shield />, label: t("menu.administration") },
        { icon: <FileText />, label: t("menu.certificates") },
        { icon: <Link />, label: t("menu.usefulServices") },
        { icon: <Map />, label: t("menu.events") },
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
                ${mobileMenu ? "w-64 z-50" : open ? "w-64" : "w-16"} hidden md:block`}>

                <div className="flex justify-between items-center p-4">
                    <img
                        src={avatarUrl ?? "https://via.placeholder.com/500x400?text=Profile+Photo"}
                        alt="avatar"
                        className="rounded-full w-12 h-12"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x400?text=Profile+Photo";
                        }}
                    />
                    {open && (
                        <button onClick={toggleSidebar}>
                            <ChevronLeft/>
                        </button>
                    )}
                    {!open && (
                        <button onClick={toggleSidebar}>
                            <ChevronRight/>
                        </button>
                    )}
                </div>

                <ul className="mt-8">
                    {menuItems.map((item, index) => (
                        <li key={index} className="flex items-center gap-4 p-4 hover:bg-blue-100 cursor-pointer">
                            {item.icon}
                            {open && <span className="text-sm">{item.label}</span>}
                        </li>
                    ))}
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
