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
import JobOrderStatusIcon from './JobOrderStatusIcon';

const JobOrdersTable = ({ data }) => {
    return (
        <CTable align="middle" className="mb-0 border" hover responsive={'xxl'}>
            <CTableHead color="light">
                <CTableRow>
                    <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Job Order ID</CTableHeaderCell>
                    <CTableHeaderCell>Client</CTableHeaderCell>
                    <CTableHeaderCell>Vehicle</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Start Date</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {data.map((jobOrder, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                            <CFormCheck />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            <Link to={`/job-orders/${jobOrder.id}`}>
                                <div className="p-3">
                                    <strong>{get(jobOrder, 'jobOrderId')}</strong>
                                </div>
                            </Link>
                        </CTableDataCell>
                        <CTableDataCell>
                            {/* <small className="text-medium-emphasis">
                                {`Order Date: ${moment(order['ord-date']).format('MM-DD-YYYY')}`}
                            </small> */}

                            {get(jobOrder, 'client.name')}
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>
                                <strong>{`${get(jobOrder, 'vehicle.brand')} ${get(
                                    jobOrder,
                                    'vehicle.modelName',
                                )} ${get(jobOrder, 'vehicle.yearModel') || ''}`}</strong>
                            </div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <JobOrderStatusIcon data={get(jobOrder, 'status')} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            <div className="small text-medium-emphasis">Start Date:</div>
                            <strong>{moment(jobOrder.startDate).format('MM-DD-YYYY')}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            <div className="small text-medium-emphasis">Date:</div>
                            <strong>{moment(jobOrder.endDate).format('MM-DD-YYYY')}</strong>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    );
};

JobOrdersTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

JobOrdersTable.defaultProps = {
    data: [],
};

export default JobOrdersTable;
