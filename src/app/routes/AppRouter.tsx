import {type JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteName } from "@/shared/config/router";
import { LoginPage } from "@/pages/login";
import { ProfilePage } from "@/pages/profile";
import { AdminPage } from "@/pages/admin"
import {Layout} from "@/pages/layout/Layout";
import {Error404, Error500} from "@/pages/errors";
import UsersPage from "@/pages/admin/users/ui/UsersPage.tsx";
import {EventDetailsPage, EventsPage} from "@/pages/events";
import {ProfilePageForAdmin} from "@/pages/admin/userProfile/ui/ProfilePageForAdmin.tsx";
import UsefulServicesPage from "@/pages/usefulservices/ui/UsefulServicesPage.tsx";

function AppRouter() {
    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            return <Navigate to={RouteName.LOGIN_PAGE} replace />;
        }

        return children;
    };

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
                            title="Профиль"
                        >
                            <ProfilePage />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.USEFUL_SERVICES_PAGE}
                element={
                <Layout title="Полезные сервисы">
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
                            title="Справки"
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
                            title="Мероприятия"
                        >
                            <EventsPage />
                        </Layout>
                }
            />

            <Route
                path="/event/:id"
                element={
                        <Layout
                            title="Мероприятия"
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
                            title="Администрирование"
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
                            title="Администрирование"
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
                            title="Администрирование"
                        >
                            <ProfilePageForAdmin/>
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