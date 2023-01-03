import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
} from '@coreui/react';

import { useQuery } from 'react-query';

import { getFleet } from './fleet.fetch';
import VehicleTab from './components/VehicleTab';
import VehicleMaintenanceRequest from './components/VehicleMaintenanceRequest';
import JobOrdersRequestList from '../job-request/components/JobOrdersRequestList';
import { FaAngleDoubleRight, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import JobRequestList from '../job-orders/components/JobRequestList';
import FleetWindow from './components/FleetWindow';
import JobOrderStatusDropdown from '../job-orders/components/JobOrderStatusDropdown';

const FleetDashboard = () => {
    const [activeKey, setActiveKey] = useState(1);
    const [isRefetchNext, setIsRefetchNext] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('new');
    const handleRefetch = ({ isRefetching }) => setIsRefetchNext(isRefetching);

    return (
        <CCard>
            <CCardBody>
                <CRow className="mb-3">
                    <CCol xxl={2}>
                        <CCard className="box-shadow-hover pointer">
                            <CCardBody>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <h6>Forklift</h6>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <div className="text-medium-emphasis">8/15</div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xxl={2}>
                        <CCard className="box-shadow-hover pointer">
                            <CCardBody>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <h6>Grablift</h6>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <div className="text-medium-emphasis">8/15</div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xxl={2}>
                        <CCard className="box-shadow-hover pointer">
                            <CCardBody>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <h6>Shuttle</h6>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <div className="text-medium-emphasis">1/2</div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xxl={2}>
                        <CCard className="box-shadow-hover pointer">
                            <CCardBody>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <h6>Cars</h6>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <div className="text-medium-emphasis">11/20</div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    {/* <CCol xxl={1}>
                        <CCard className="box-shadow-hover pointer">
                            <CCardBody>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <h6>MC</h6>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="container-centerer">
                                        <div className="text-medium-emphasis">11/20</div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol> */}
                    <CCol xxl={4}>
                        <JobOrderStatusDropdown onChange={(data) => setSelectedStatus(data)} />
                        <hr />
                        <div className="mb-3">
                            <JobRequestList
                                params={{
                                    verified: selectedStatus !== 'new',
                                    status: { $in: [selectedStatus] },
                                }}
                                isRefetchNext={isRefetchNext}
                                sort={['createdAt:desc']}
                            />
                        </div>
                    </CCol>
                    <CCol xxl={4}></CCol>
                </CRow>
                <CRow>
                    <CCol xxl={12}>
                        <FleetWindow onRefetch={handleRefetch} />
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default FleetDashboard;
