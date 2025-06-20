import React, {ReactNode, useState} from 'react';
import LanguageSelector from "@/features/language-selector/ui/LanguageSelect";
import styles from './Layout.module.scss';
import {NavbarMenu} from "@/features/menu/ui/NavbarMenu";
import {useWindowWidth} from "@/shared/hooks/helpersHooks.ts";

interface LayoutProps {
    title: string;
    breadcrumbs?: ReactNode;
    children?: ReactNode;
}

const BREAKPOINTS = {
    xs: 375,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
};

export function Layout({title, breadcrumbs, children}: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOverlay, setMobileOverlay] = useState(false);

    const width = useWindowWidth();
    const isDesktop = width > BREAKPOINTS.lg;

    React.useEffect(() => {
        if (isDesktop) {
            setMobileOverlay(false);
        }
    }, [isDesktop]);

    const SIDEBAR_EXPANDED = 240;
    const SIDEBAR_COLLAPSED = 64;
    const BASE_SPACING = 24;

    let sideSpacing: number;
    if (isDesktop) {
        sideSpacing =
            (sidebarOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED) + BASE_SPACING;
    } else {
        sideSpacing = BASE_SPACING;
    }

    const contentWrapperStyle: React.CSSProperties = {
        "--side-spacing": `${sideSpacing}px`,
    } as any;

    return (
        <div className={styles.layoutRoot}>
            <NavbarMenu
                avatarUrl="src/shared/assets/test/photo_profile.png"
                open={sidebarOpen}
                mobileOverlay={mobileOverlay}
                onToggleOpen={() => setSidebarOpen((o) => !o)}
                onToggleMobileOverlay={() => setMobileOverlay((m) => !m)}
                isDesktop={isDesktop}
            />

            <div className={styles.contentWrapper} style={contentWrapperStyle}>
                <header className={styles.header}>
                    <div className={styles.pageContainer}>
                        {isDesktop ? (
                            <div className={styles.header__innerDesktop}>
                                <div className={styles.header__left}>
                                    <h1>{title}</h1>
                                    {breadcrumbs && (
                                        <nav className={styles.header__breadcrumbs}>
                                            {breadcrumbs}
                                        </nav>
                                    )}
                                </div>
                                <div className={styles.header__right}>
                                    <LanguageSelector/>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.header__innerMobileTop}>
                                <div className={styles.header__spacer}/>
                                <div className={styles.header__right}>
                                    <LanguageSelector/>
                                </div>
                            </div>
                        )}
                        {!isDesktop && (
                            <div className={styles.header__innerMobileBottom}>
                                <h1 className={styles.header__title}>{title}</h1>
                                {breadcrumbs && (
                                    <nav className={styles.header__breadcrumbs}>
                                        {breadcrumbs}
                                    </nav>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                <main className={styles.main}>
                    <div className={styles.pageContainer}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;