import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CListGroup,
    CListGroupItem,
    CRow,
} from '@coreui/react';
import { rgbToHex } from '@coreui/utils';
import { get } from 'lodash';
import { getJobRequests } from 'src/views/job-request/job-request.fetch';
import JobOrderModal from './JobOrderModal';
import { getJobOrders } from '../job-orders.fetch';
import JobOrderStatusIcon from './JobOrderStatusIcon';

const JobOrderList = ({ params = {}, sort = [], isRefetchNext }) => {
    const {
        data: jobOrders,
        // isFetching,
        refetch,
    } = useQuery(['job-request', { params, sort }], getJobOrders, {
        placeholderData: [],
        onError: (err) => {},
    });

    useEffect(() => {
        if (isRefetchNext) {
            refetch();
        }
    }, [refetch, isRefetchNext]);

    return (
        <CListGroup>
            {jobOrders.map((jobRequest, index) => (
                <JobOrderModal data={jobRequest} key={index} readOnly onClose={refetch}>
                    <CListGroupItem component="a" key={index} style={{ cursor: 'pointer' }}>
                        <div>
                            <div>
                                {jobRequest.verified ? 'Job Order' : 'Request'} ID:{' '}
                                <strong> {get(jobRequest, 'jobOrderId')}</strong>
                            </div>
                            <div className="small text-medium-emphasis">
                                <strong>
                                    {get(jobRequest, 'vehicle.brand')}{' '}
                                    {get(jobRequest, 'vehicle.modelName')}{' '}
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

JobOrderList.propTypes = {
    isRefetchNext: PropTypes.bool,
    type: PropTypes.bool,
    params: PropTypes.object,
    sort: PropTypes.array,
};

JobOrderList.defaultProps = {
    isRefetchNext: false,
    type: false,
    params: {},
    sort: [],
};

export default JobOrderList;
