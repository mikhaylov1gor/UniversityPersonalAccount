import {type JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteName } from "@/shared/config/router";
import { LoginPage } from "@/pages/login";
import { ProfilePage } from "@/pages/profile";
import {Layout} from "@/pages/layout/Layout";

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
                            title="Профиль"
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
                            title="Профиль"
                        >
                            <ProfilePage />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.EVENTS_PAGE}
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
                path={RouteName.ADMIN_PAGE}
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRouter;