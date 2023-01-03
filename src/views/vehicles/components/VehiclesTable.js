import React from 'react';
import { Link } from 'react-router-dom';
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
import VehicleStatus from './VehicleStatus';

const VehiclesTable = ({ data }) => {
    return (
        <CTable align="middle" className="mb-0 border" hover responsive={'xxl'}>
            <CTableHead color="light">
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Model</CTableHeaderCell>
                    <CTableHeaderCell>Client</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Start Date</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {data.map((vehicle, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                            <CFormCheck />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            <Link to={`/vehicles/${vehicle.id}`}>
                                <div className="p-3">
                                    <strong>{`${get(vehicle, 'brand')} ${get(
                                        vehicle,
                                        'modelName',
                                    )} ${get(vehicle, 'yearModel') || ''}`}</strong>
                                </div>
                            </Link>
                        </CTableDataCell>
                        <CTableDataCell>
                            {/* <small className="text-medium-emphasis">
                                {`Order Date: ${moment(order['ord-date']).format('MM-DD-YYYY')}`}
                            </small> */}
                            {get(vehicle, 'client.name')}
                        </CTableDataCell>
                        <CTableDataCell>
                            <VehicleStatus data={get(vehicle, 'status')} />
                        </CTableDataCell>
                        {/* <CTableDataCell className="text-center">
                            <div className="small text-medium-emphasis">Start Date:</div>
                            <strong>{moment(vehicle.startDate).format('MM-DD-YYYY')}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            <div className="small text-medium-emphasis">Date:</div>
                            <strong>{moment(vehicle.endDate).format('MM-DD-YYYY')}</strong>
                        </CTableDataCell> */}
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    );
};

VehiclesTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

VehiclesTable.defaultProps = {
    data: [],
};

export default VehiclesTable;
