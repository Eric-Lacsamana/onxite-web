import React from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilBell,
    cilCalculator,
    cilChartPie,
    cilCursor,
    cilDescription,
    cilDrop,
    cilNotes,
    cilPencil,
    cilPuzzle,
    cilSpeedometer,
    cilStar,
    cilStream,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: 'info',
            text: 'NEW',
        },
        roles: ['operations_manager', 'client_user'],
    },
    {
        component: CNavTitle,
        name: 'Theme',
        roles: [''],
    },
    {
        component: CNavItem,
        name: 'Job Orders',
        to: '/job-orders',
        icon: <CIcon icon={cilStream} customClassName="nav-icon" />,
        roles: ['operations_manager'],
    },
    {
        component: CNavGroup,
        name: 'Buttons',
        to: '/buttons',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Buttons',
                to: '/buttons/buttons',
            },
            {
                component: CNavItem,
                name: 'Buttons groups',
                to: '/buttons/button-groups',
            },
            {
                component: CNavItem,
                name: 'Dropdowns',
                to: '/buttons/dropdowns',
            },
        ],
        roles: [],
    },
    {
        component: CNavItem,
        name: 'Vehicles',
        to: '/vehicles',
        icon: <CIcon icon={cilStream} customClassName="nav-icon" />,
        roles: ['operations_manager'],
    },
    {
        component: CNavItem,
        name: 'Invoices',
        to: '/invoices',
        icon: <CIcon icon={cilStream} customClassName="nav-icon" />,
        roles: ['operations_manager'],
    },
    {
        component: CNavGroup,
        name: 'Forms',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Form Control',
                to: '/forms/form-control',
            },
            {
                component: CNavItem,
                name: 'Select',
                to: '/forms/select',
            },
            {
                component: CNavItem,
                name: 'Checks & Radios',
                to: '/forms/checks-radios',
            },
            {
                component: CNavItem,
                name: 'Range',
                to: '/forms/range',
            },
            {
                component: CNavItem,
                name: 'Input Group',
                to: '/forms/input-group',
            },
            {
                component: CNavItem,
                name: 'Floating Labels',
                to: '/forms/floating-labels',
            },
            {
                component: CNavItem,
                name: 'Layout',
                to: '/forms/layout',
            },
            {
                component: CNavItem,
                name: 'Validation',
                to: '/forms/validation',
            },
        ],
        roles: [],
    },
];

export default _nav;
