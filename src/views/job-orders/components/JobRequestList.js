import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    CAvatar,
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
import JobOrderModal from './JobOrderModal';
import { getJobOrders } from '../job-orders.fetch';
import JobOrderStatusIcon from './JobOrderStatusIcon';
import moment from 'moment';

const JobOrdersList = ({ isRefetchNext, isRefetching, params = {}, sort = [] }) => {
    const {
        data: jobOrders,
        isRefetching: isRefetchingJobRequestList,
        refetch,
    } = useQuery(['job-request', { params, sort }], getJobOrders, {
        placeholderData: [],
        onError: (err) => {},
    });

    useEffect(() => {
        isRefetching(isRefetchingJobRequestList);
        if (isRefetchNext) {
            refetch();
        }
    }, [isRefetching, isRefetchingJobRequestList, isRefetchNext, refetch]);

    return (
        <div
            style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: 250,
                position: 'relative',
            }}
        >
            {jobOrders.length ? (
                jobOrders.map((jobOrder, index) => (
                    <div key={index} className="mb-1">
                        <JobOrderModal data={jobOrder} readOnly onClose={refetch}>
                            <CCard style={{ cursor: 'pointer' }}>
                                <CCardBody>
                                    <CRow>
                                        <CCol xxl={2}>
                                            <div className="mb-2">
                                                <CAvatar size="md" color="secondary">
                                                    {(
                                                        get(
                                                            jobOrder,
                                                            'requestedByUser.firstName',
                                                        ) || ''
                                                    ).charAt(0)}
                                                    {(
                                                        get(jobOrder, 'requestedByUser.lastName') ||
                                                        ''
                                                    ).charAt(0)}
                                                </CAvatar>{' '}
                                            </div>
                                        </CCol>
                                        <CCol xxl={6}>
                                            <CRow>
                                                <div>
                                                    <strong>{get(jobOrder, 'client.name')}</strong>
                                                    <br />
                                                    <div className="small text-medium-emphasis">
                                                        {get(jobOrder, 'requestedByUser.firstName')}{' '}
                                                        {get(jobOrder, 'requestedByUser.lastName')}
                                                    </div>
                                                </div>
                                            </CRow>
                                        </CCol>
                                        <CCol align="right" xxl={4}>
                                            <CRow>
                                                <div className="mb-1" style={{ fontSize: 14 }}>
                                                    <span className="small text-medium-emphasis">
                                                        {moment(jobOrder.createdAt).fromNow()}
                                                    </span>{' '}
                                                    <JobOrderStatusIcon
                                                        data={get(jobOrder, 'status')}
                                                        hideLabel
                                                    />
                                                </div>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                    <CRow xxl={12}>
                                        {' '}
                                        <CCol xxl={2} aww></CCol>
                                        <CCol xxl={10}>
                                            <CRow>
                                                <CCol xxl={12}>
                                                    <div className="small text-medium-emphasis">
                                                        <span className="medium text-medium-emphasis">
                                                            <strong>
                                                                {get(jobOrder, 'jobOrderId')}
                                                            </strong>
                                                            {' | '}
                                                        </span>
                                                        <span className="medium text-medium-emphasis">
                                                            {get(jobOrder, 'vehicle.brand') || ''}{' '}
                                                            {get(jobOrder, 'vehicle.modelName') ||
                                                                ''}{' '}
                                                            {get(jobOrder, 'vehicle.yearModel') ||
                                                                ''}
                                                        </span>
                                                    </div>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol>
                                                    <div className="ellipsis-sm small text-high-emphasis">
                                                        {jobOrder.complain}
                                                    </div>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </JobOrderModal>
                    </div>
                ))
            ) : (
                <CCol>
                    <div
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: '40%',
                            padding: 0,
                        }}
                    >
                        No Items
                    </div>
                </CCol>
            )}
        </div>
    );
};

JobOrdersList.propTypes = {
    isRefetchNext: PropTypes.bool,
    isRefetching: PropTypes.func,
    type: PropTypes.bool,
    params: PropTypes.object,
    sort: PropTypes.array,
};

JobOrdersList.defaultProps = {
    isRefetchNext: false,
    isRefetching: () => {},
    type: false,
    params: {},
    sort: [],
};

export default JobOrdersList;
