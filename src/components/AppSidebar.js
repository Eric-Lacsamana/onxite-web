import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { get } from 'lodash';
import { AppSidebarNav } from './AppSidebarNav';

import { logoNegative } from 'src/assets/brand/logo-negative';
import { sygnet } from 'src/assets/brand/sygnet';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import logo from 'src/assets/images/onxite_logo.png';

// sidebar nav config
import navigation from '../_nav';

const AppSidebar = () => {
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);
    const isLoggedIn = get(JSON.parse(localStorage.getItem('auth')), 'isLoggedIn');
    const user = get(JSON.parse(localStorage.getItem('auth')), 'user', {});

    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'SHOW_SIDEBAR', sidebarShow: visible });
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" to="/">
                {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}

                <div className="sidebar-brand-full" style={{ textAlign: 'center' }}>
                    <CImage src={logo} style={{ width: '50%', height: '50%' }} />
                </div>
                <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav
                        items={
                            isLoggedIn
                                ? navigation.filter((nav) => nav.roles.includes(user.role.type))
                                : []
                        }
                    />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch({ type: 'SHOW_SIDEBAR', sidebarUnfoldable: !unfoldable })}
            />
        </CSidebar>
    );
};

export default React.memo(AppSidebar);
