import React, { useEffect, useState, createRef } from 'react';
import { useQuery } from 'react-query';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import { rgbToHex } from '@coreui/utils';
import { get } from 'lodash';

import { getJobRequests, getJobOrders } from './job-orders.fetch';
import Calendar from 'src/components/_global/Calendar';
// import JobOrdersRequestList from './components/JobOrdersRequestList';
import JobRequestList from './components/JobRequestList';
import JobOrderList from './components/JobOrdersList';
import JobOrderCalendarSchedule from './components/JobOrderCalendarSchedule';
import moment from 'moment';

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

const JobRequest = () => {
    const today = new Date();
    const [isRefetchNext, setIsRefetchNext] = useState(false);
    // const {
    //     data: jobRequests,
    //     isFetching,
    //     refetch,
    // } = useQuery(['job-request', params], getJobRequests, {
    //     placeholderData: [],
    //     onError: (err) => {
    //         // dispatch(
    //         // 	addToast(
    //         // 		'Error',
    //         // 		err.message || 'Something went wrong',
    //         // 		'danger',
    //         // 		'help',
    //         // 	),
    //         // );
    //     },
    // });

    // const {
    //     data: jobOrders,
    //     // isFetching,
    //     // refetch,
    // } = useQuery(['job-request', { verified: true }], getJobOrders, {
    //     placeholderData: [],
    //     onError: (err) => {
    //         // dispatch(
    //         // 	addToast(
    //         // 		'Error',
    //         // 		err.message || 'Something went wrong',
    //         // 		'danger',
    //         // 		'help',
    //         // 	),
    //         // );
    //     },
    // });

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow>
                    <CCol style={{ marginTop: 5 }} align="left" md={6}>
                        <h5>Dashboard</h5>
                    </CCol>
                    <CCol align="right">
                        <div>
                            <h5>{moment(today).format('LL')}</h5>
                        </div>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                {/* <JobRequestsTable data={jobRequests} onChange={refetch} /> */}
                <CRow>
                    <CCol>
                        <CRow>
                            <CCol>
                                <div className="mt-5 mb-3">Request</div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xxl={12}>
                                <div
                                    style={{
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        height: 250,
                                    }}
                                >
                                    <JobRequestList
                                        params={{
                                            verified: false,
                                            status: { $in: ['new'] },
                                        }}
                                        isRefetching={(data) => setIsRefetchNext(data)}
                                        sort={['createdAt:desc']}
                                    />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <div className="mt-5 mb-3">
                                    <hr />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                Orders
                                <div
                                    className="mt-3 mb-3"
                                    style={{
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        height: 250,
                                    }}
                                >
                                    <JobOrderList
                                        params={{
                                            verified: true,
                                            status: { $in: ['processing', 'ongoing'] },
                                        }}
                                        sort={['verifiedDate:desc']}
                                        isRefetchNext={isRefetchNext}
                                    />
                                </div>
                            </CCol>
                        </CRow>
                    </CCol>

                    <CCol xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                        <JobOrderCalendarSchedule />
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default JobRequest;
