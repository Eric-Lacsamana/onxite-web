import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

// routes config
import { get } from 'lodash';
import routes from '../routes';
import { attachToken } from 'src/utils/api';

const AppContent = () => {
    const jwt = get(JSON.parse(localStorage.getItem('auth')), 'jwt');
    const user = get(JSON.parse(localStorage.getItem('auth')), 'user');
    const isLoggedIn = get(JSON.parse(localStorage.getItem('auth')), 'isLoggedIn');

    if (isLoggedIn) {
        attachToken(jwt);
    }

    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Routes>
                    {isLoggedIn ? (
                        routes
                            .filter((route) => route.roles.includes(user.role.type))
                            .map((route, idx) => {
                                return (
                                    route.element && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            element={<route.element />}
                                        />
                                    )
                                );
                            })
                    ) : (
                        <Route path="*" element={<Navigate to="login" replace />} />
                    )}
                </Routes>
            </Suspense>
        </CContainer>
    );
};

export default React.memo(AppContent);
