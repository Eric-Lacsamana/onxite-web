import React from 'react';
import {
    CFormCheck,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';

import { get } from 'lodash';
import PropTypes from 'prop-types';

import moment from 'moment';
import VehicleMaintenanceRequest from 'src/views/fleet/components/VehicleMaintenanceRequest';

const JobRequestTable = ({ data, onChange }) => {
    return (
        <>
            <CTable align="middle" className="mb-0 border" hover responsive={'xxl'}>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Client</CTableHeaderCell>
                        <CTableHeaderCell>Vehicle</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {data.map((jobRequest, index) => (
                        <CTableRow
                            v-for="item in tableItems"
                            style={{ cursor: 'pointer' }}
                            key={index}
                            onClick={() => {}}
                        >
                            <CTableDataCell className="text-center">
                                <CFormCheck />
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {/* <small className="text-medium-emphasis">
                                    {`Order Date: ${moment(order['ord-date']).format('MM-DD-YYYY')}`}
                                </small> */}

                                {get(jobRequest, 'client.name')}
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>
                                    {get(jobRequest, 'vehicle.brand')}{' '}
                                    {get(jobRequest, 'vehicle.modelName')}{' '}
                                    {get(jobRequest, 'vehicle.yearModel') || ''}
                                </div>
                                <div className="small text-medium-emphasis">
                                    <span>Plate: {get(jobRequest, 'vehicle.plate')}</span> | Status:{' '}
                                    {get(jobRequest, 'vehicle.status')}
                                </div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {get(jobRequest, 'status')}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                <div className="small text-medium-emphasis">Date:</div>
                                <strong>
                                    {moment(jobRequest['createdAt']).format('MM-DD-YYYY')}
                                </strong>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                <VehicleMaintenanceRequest
                                    data={jobRequest}
                                    readOnly
                                    onClose={onChange}
                                />
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    );
};

JobRequestTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

JobRequestTable.defaultProps = {
    data: [],
    onChange: () => {},
};

export default JobRequestTable;
