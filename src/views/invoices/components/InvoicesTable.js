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
// import JobOrderStatusIcon from './JobOrderStatusIcon';

const InvoicesTable = ({ data }) => {
    return (
        <CTable align="middle" className="mb-0 border" hover responsive={'xxl'}>
            <CTableHead color="light">
                <CTableRow>
                    <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Invoice ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Job Order ID</CTableHeaderCell>
                    <CTableHeaderCell>Bill To</CTableHeaderCell>
                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {data.map((invoice, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                            <CFormCheck />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            <Link to={`/invoices/${invoice.id}`}>
                                <div className="p-3">
                                    <strong>{get(invoice, 'invoiceId')}</strong>
                                </div>
                            </Link>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            <Link to={`/job-orders/${get(invoice, 'jobOrder.id')}`}>
                                <div className="p-3">
                                    <strong>{get(invoice, 'jobOrder.jobOrderId')}</strong>
                                </div>
                            </Link>
                        </CTableDataCell>
                        <CTableDataCell>
                            {/* <small className="text-medium-emphasis">
                                {`Order Date: ${moment(order['ord-date']).format('MM-DD-YYYY')}`}
                            </small> */}

                            {get(invoice, 'client.name')}
                        </CTableDataCell>
                        <CTableDataCell>
                            {/* <JobOrderStatusIcon data={get(invoice, 'status')} /> */}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            <div className="small text-medium-emphasis">Start Date:</div>
                            <strong>{moment(invoice.createdAt).format('MM-DD-YYYY')}</strong>
                        </CTableDataCell>
                        {/* <CTableDataCell className="text-center">
                            <div className="small text-medium-emphasis">Date:</div>
                            <strong>{moment(invoice.endDate).format('MM-DD-YYYY')}</strong>
                        </CTableDataCell> */}
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    );
};

InvoicesTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

InvoicesTable.defaultProps = {
    data: [],
};

export default InvoicesTable;
