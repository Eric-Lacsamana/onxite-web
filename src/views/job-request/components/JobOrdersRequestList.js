import React, { useEffect, useState, createRef } from 'react';
import { useQuery } from 'react-query';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CCol, CListGroupItem, CListGroup } from '@coreui/react';
import { rgbToHex } from '@coreui/utils';
import { get } from 'lodash';

import { getJobRequests } from '../job-request.fetch';

import VehicleMaintenanceRequest from '../../fleet/components/VehicleMaintenanceRequest';
import JobOrderModal from 'src/views/job-orders/components/JobOrderModal';
import { getJobOrders } from 'src/views/job-orders/job-orders.fetch';
import JobOrderStatusIcon from 'src/views/job-orders/components/JobOrderStatusIcon';

// import NewJobOrder from './components/NewJobOrder';

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

const JobOrdersRequests = ({ refetch, params = {}, sort = [] }) => {
    const {
        data: jobRequests,
        // isFetching,
        refetch: refetchList,
    } = useQuery(['job-request', { params, sort }], getJobOrders, {
        placeholderData: [],
        onError: (err) => {},
    });

    useEffect(() => {
        if (refetch) {
            refetchList();
        }
    }, [refetch, refetchList]);

    return (
        <CListGroup>
            {jobRequests.map((jobRequest, index) => (
                <JobOrderModal data={jobRequest} key={index} readOnly onClose={refetchList}>
                    <CListGroupItem component="a" key={index} style={{ cursor: 'pointer' }}>
                        <div>
                            <div>
                                {jobRequest.verified ? 'Job Order' : 'Request'} ID:{' '}
                                <strong> {get(jobRequest, 'jobOrderId')}</strong>
                            </div>
                            <div className="small text-medium-emphasis">
                                <strong>
                                    {get(jobRequest, 'vehicle.brand' || '')}{' '}
                                    {get(jobRequest, 'vehicle.modelName') || ''}{' '}
                                    {get(jobRequest, 'vehicle.yearModel') || ''}
                                </strong>
                            </div>
                            <div className="small text-medium-emphasis">
                                Requested By:{' '}
                                <strong>
                                    {get(jobRequest, 'requestedByUser.firstName')}{' '}
                                    {get(jobRequest, 'requestedByUser.lastName')}
                                </strong>
                            </div>
                            <div className="small text-medium-emphasis">
                                Status: <JobOrderStatusIcon data={get(jobRequest, 'status')} />
                            </div>
                        </div>
                    </CListGroupItem>
                </JobOrderModal>
            ))}
        </CListGroup>
    );
};

JobOrdersRequests.propTypes = {
    refetch: PropTypes.bool,
    type: PropTypes.bool,
    params: PropTypes.object,
    sort: PropTypes.array,
};

JobOrdersRequests.defaultProps = {
    refetch: false,
    type: false,
    params: {},
    sort: [],
};

export default JobOrdersRequests;
