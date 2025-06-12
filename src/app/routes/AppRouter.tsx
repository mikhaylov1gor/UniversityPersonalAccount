import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteName } from "@/shared/config/router";
import { LoginPage } from "@/pages/login";
import { ProfilePage } from "@/pages/profile";

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
                path={RouteName.LOGIN_PAGE}
                element={<LoginPage />}
            />

            <Route
                path={RouteName.PROFILE_PAGE}
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.USEFUL_SERVICES_PAGE}
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.CERTIFICATES_PAGE}
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path={RouteName.EVENTS_PAGE}
                element={
                    <ProtectedRoute>
                        <ProfilePage />
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