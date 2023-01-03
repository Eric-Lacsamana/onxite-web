import React, { useEffect, useState, createRef } from 'react';
import { useQuery } from 'react-query';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CButton, CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import { rgbToHex } from '@coreui/utils';
import { getJobOrders } from './job-orders.fetch';

import JobOrdersTable from './components/JobOrdersTable';
import NewJobOrder from './components/NewJobOrder';

const ThemeView = () => {
    const [color, setColor] = useState('rgb(255, 255, 255)');
    const ref = createRef();

    useEffect(() => {
        const el = ref.current.parentNode.firstChild;
        const varColor = window.getComputedStyle(el).getPropertyValue('background-color');
        setColor(varColor);
    }, [ref]);

    return (
        <table className="table w-100" ref={ref}>
            <tbody>
                <tr>
                    <td className="text-medium-emphasis">HEX:</td>
                    <td className="font-weight-bold">{rgbToHex(color)}</td>
                </tr>
                <tr>
                    <td className="text-medium-emphasis">RGB:</td>
                    <td className="font-weight-bold">{color}</td>
                </tr>
            </tbody>
        </table>
    );
};

const ThemeColor = ({ className, children }) => {
    const classes = classNames(className, 'theme-color w-75 rounded mb-3');
    return (
        <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
            <div className={classes} style={{ paddingTop: '75%' }}></div>
            {children}
            <ThemeView />
        </CCol>
    );
};

ThemeColor.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const JobOrders = () => {
    const [params, setParams] = useState({
        verified: true,
        sort: ['updatedAt:desc'],
    });

    const {
        data: jobOrders,
        isFetching,
        refetch,
    } = useQuery(['job-orders', params], getJobOrders, {
        placeholderData: [],
        onError: (err) => {
            // dispatch(
            // 	addToast(
            // 		'Error',
            // 		err.message || 'Something went wrong',
            // 		'danger',
            // 		'help',
            // 	),
            // );
        },
    });

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow>
                    <CCol style={{ marginTop: 5 }} align="left" md={6}>
                        <h5>Job Orders</h5>
                    </CCol>
                    <CCol align="right">
                        <NewJobOrder />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <JobOrdersTable data={jobOrders} />
            </CCardBody>
        </CCard>
    );
};

export default JobOrders;
