import {type JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteName } from "@/shared/config/router";
import { LoginPage } from "@/pages/login";
import { ProfilePage } from "@/pages/profile";
import { AdminPage } from "@/pages/admin"
import {Layout} from "@/pages/layout/Layout";
import {Error404, Error500} from "@/pages/errors";
import UsersPage from "@/pages/admin/users/ui/UsersPage.tsx";
import {ProfilePageForAdmin} from "@/pages/admin/userProfile/ui/ProfilePageForAdmin.tsx";
import {EventsPage} from "@/pages/events";

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
                    <ProtectedRoute>
                        <Layout
                            title="Полезные сервисы"
                        >
                            <ProfilePage />
                        </Layout>
                    </ProtectedRoute>
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