import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const FleetDashboard = React.lazy(() => import('./views/fleet/FleetDashboard'));
const MainDashboard = React.lazy(() => import('./views/job-orders/MainDashboard'));
const JobOrder = React.lazy(() => import('./views/job-orders/JobOrder'));
const JobOrders = React.lazy(() => import('./views/job-orders/JobOrders'));
const Vehicle = React.lazy(() => import('./views/vehicles/Vehicle'));
const Vehicles = React.lazy(() => import('./views/vehicles/Vehicles'));
const Invoice = React.lazy(() => import('./views/invoices/Invoice'));
const Invoices = React.lazy(() => import('./views/invoices/Invoices'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));

const routes = [
    { path: '/', exact: true, name: 'Home', roles: [] },
    { path: '/dashboard', name: 'Dashboard', element: FleetDashboard, roles: ['client_user'] },
    {
        path: '/dashboard',
        name: 'Dashboard',
        element: MainDashboard,
        roles: ['operations_manager'],
    },
    {
        path: '/job-orders/:id',
        name: 'Job Order',
        element: JobOrder,
        roles: ['operations_manager'],
    },
    { path: '/job-orders', name: 'Job Order', element: JobOrders, roles: ['operations_manager'] },
    {
        path: '/vehicles/:id',
        name: 'Vehicles',
        element: Vehicle,
        roles: ['operations_manager'],
    },
    { path: '/vehicles', name: 'Job Order', element: Vehicles, roles: ['operations_manager'] },
    { path: '/invoices/:id', name: 'Invoice', element: Invoice, roles: ['operations_manager'] },
    { path: '/invoices', name: 'Invoices', element: Invoices, roles: ['operations_manager'] },
    { path: '/theme', name: 'Theme', element: Colors, exact: true, roles: [] },
    { path: '/theme/colors', name: 'Colors', element: Colors, roles: [] },
];

export default routes;
