import {type JSX} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {RouteName} from "@/shared/config/router";
import {LoginPage} from "@/pages/login";
import {ProfilePage} from "@/pages/profile";
import {Layout} from "@/pages/layout/Layout";
import {Error404, Error500} from "@/pages/errors";
import {EventDetailsPage, EventsPage} from "@/pages/events";
import {ProfilePageForAdmin} from "@/pages/admin/userProfile/ui/ProfilePageForAdmin.tsx";
import {AdminEventsPage} from "@/pages/admin/events/main/ui/AdminEventsPage.tsx";
import UsefulServicesPage from "@/pages/usefulservices/ui/UsefulServicesPage.tsx";
import AdminUsefulServicesPage from "@/pages/admin/useful-services/main/ui/AdminUsefulServicesPage.tsx";
import {CreateUpdateEventPage} from "@/pages/admin/events/createUpdateEventPage/ui/CreateUpdateEventPage.tsx";
import {AdminPage, UsersPage} from "@/pages/admin";
import {useTranslation} from "react-i18next";
import {AdminEventDetailsPage} from "@/pages/admin/events/details/ui/AdminEventDetailsPage.tsx";
function AppRouter() {
    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            return <Navigate to={RouteName.LOGIN_PAGE} replace />;
        }

        return children;
    };

    const{t} = useTranslation();

    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to={RouteName.LOGIN_PAGE} replace />}
            />
            <Route
                path={RouteName.LOGIN_PAGE}
                element={<LoginPage />}
            />

            <Route
                path={RouteName.PROFILE_PAGE}
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.profile" as any)}
                        >
                            <ProfilePage />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.USEFUL_SERVICES_PAGE}
                element={
                <Layout
                    title={t("menu.usefulServices" as any)}
                >
                    <ProtectedRoute>
                            <UsefulServicesPage />
                    </ProtectedRoute>
                </Layout>
                }
            />

            <Route
                path={RouteName.CERTIFICATES_PAGE}
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.certificates" as any)}
                        >
                            <ProfilePage />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.EVENTS_PAGE}
                element={
                        <Layout
                            title={t("menu.events" as any)}
                        >
                            <EventsPage />
                        </Layout>
                }
            />

            <Route
                path="/event/:id"
                element={
                        <Layout
                            title={t("menu.events" as any)}
                        >
                            <EventDetailsPage />
                        </Layout>
                }
            />

            <Route
                path={RouteName.ADMIN_PAGE}
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.admin" as any)}
                        >
                            <AdminPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.ADMIN_PAGE_USERS}
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.admin" as any)}
                        >
                            <UsersPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />


            <Route
                path="/admin/user/:id"
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.admin" as any)}
                        >
                            <ProfilePageForAdmin/>
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.ADMIN_PAGE_EVENTS}
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.admin" as any)}
                        >
                            <AdminEventsPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.ADMIN_PAGE_USEFUL_SERVICES}
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.admin" as any)}
                        >
                            <AdminUsefulServicesPage/>
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/event/update/:id"
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.admin" as any)}
                        >
                            <CreateUpdateEventPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.ADMIN_PAGE_CREATE_EVENT}
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.admin" as any)}
                        >
                            <CreateUpdateEventPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/event/:id"
                element={
                    <ProtectedRoute>
                        <Layout
                            title={t("menu.admin" as any)}
                        >
                            <AdminEventDetailsPage/>
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.ERROR404}
                element={<Error404/>}
            />

            <Route
                path={RouteName.ERROR500}
                element={<Error500/>}
            />
        </Routes>
    );
}

export default AppRouter;