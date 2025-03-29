import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {RouteName} from "../../shared/config/router";
import {LoginPage} from "../../pages/login";
import {ProfilePage} from "../../pages/profile";
function AppRouter() {
    return (
        <>
            <Routes>
                <Route
                    path={RouteName.LOGIN_PAGE}
                    element={<LoginPage/>}
                />

                <Route
                    path={RouteName.PROFILE_PAGE}
                    element= {<ProfilePage/>}
                />

                <Route
                    path={RouteName.USEFUL_SERVICES_PAGE}
                    element= {<ProfilePage/>}
                />

                <Route
                    path={RouteName.CERTIFICATES_PAGE}
                    element= {<ProfilePage/>}
                />

                <Route
                    path={RouteName.EVENTS_PAGE}
                    element= {<ProfilePage/>}
                />

                <Route
                    path={RouteName.ADMIN_PAGE}
                    element= {<ProfilePage/>}
                />
            </Routes>
        </>
    )
}

export default AppRouter;