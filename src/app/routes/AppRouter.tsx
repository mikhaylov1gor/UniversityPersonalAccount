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
            </Routes>
        </>
    )
}

export default AppRouter;