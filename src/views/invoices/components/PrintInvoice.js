import React, { useState } from 'react';
import {
    CAvatar,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    // CFormCheck,
    // CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CImage,
    CListGroup,
    CListGroupItem,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CTable,
} from '@coreui/react';
import PropTypes from 'prop-types';

import { get } from 'lodash';
import Print from 'src/components/_global/Print';
import logo from 'src/assets/images/onxite_logo.png';
import numeral from 'numeral';

const PrintInvoice = ({ data }) => {
    return (
        <CRow>
            <CCol>
                <Print>
                    <CRow xxl={12}>
                        <CCol align="center">
                            <div className="mt-3 mb-5">
                                <CImage src={logo} style={{ width: '15%', height: '15%' }} />
                                <div style={{ fontSize: 12 }}>
                                    64D Aquino Street, West Grace Park
                                </div>
                                <div style={{ fontSize: 12 }}>
                                    Caloocan City | Tel: 0908 739 3919
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <div style={{ fontSize: 12 }}>
                                Invoice ID: <strong>{data.invoiceId}</strong>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <div style={{ fontSize: 12 }}>
                                Bill To: <strong>{get(data, 'client.name')}</strong>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <div className="mb-3" style={{ fontSize: 12 }}>
                                Job Order ID: <strong>{get(data, 'jobOrder.jobOrderId')}</strong>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CFormLabel>Vehicle:</CFormLabel>
                            <div className="ms-3">
                                <CRow>
                                    <CCol>
                                        <CRow>
                                            <div className="mb-3" style={{ fontSize: 15 }}>
                                                <div style={{ fontSize: 18 }}>
                                                    {get(data, 'jobOrder.vehicle.brand')}{' '}
                                                    {get(data, 'jobOrder.vehicle.modelName')}{' '}
                                                    {get(data, 'jobOrder.vehicle.yearModel') || ''}
                                                </div>
                                                <div className="text-medium-emphasis small">
                                                    <span>
                                                        Plate: {get(data, 'jobOrder.vehicle.plate')}
                                                    </span>{' '}
                                                </div>
                                            </div>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <div className="px-3" style={{ fontSize: 14 }}>
                                Items/Materials:
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <div className="px-3">
                                <CTable
                                    style={{ fontSize: 12 }}
                                    columns={[
                                        // {
                                        //     key: 'id',
                                        //     label: '#',
                                        //     _props: { scope: 'col' },
                                        // },
                                        {
                                            key: 'name',
                                            label: 'Item Name',
                                            _props: { scope: 'col' },
                                        },
                                        {
                                            key: 'quantity',
                                            label: 'Quantity',
                                            _props: { scope: 'col' },
                                        },
                                        {
                                            key: 'cost',
                                            label: 'Cost',
                                            _props: { scope: 'col' },
                                        },
                                        // {
                                        //     key: 'total',
                                        //     label: 'Total',
                                        //     _props: { scope: 'col' },
                                        // },
                                        // {
                                        //     key: 'heading_2',
                                        //     label: 'Heading',
                                        //     _props: { scope: 'col' },
                                        // },
                                    ]}
                                    items={get(data, 'lineItems', [])
                                        .filter((lineItem) => lineItem.type === 'materials')
                                        .map((lineItem, index) => ({
                                            id: index + 1,
                                            name: lineItem.name,
                                            quantity: lineItem.quantity,
                                            cost: lineItem.cost,
                                            total: lineItem.cost * lineItem.quantity,
                                            // heading_2: '@mdo',
                                            _cellProps: { id: { scope: 'row' } },
                                        }))}
                                />
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <div className="px-3" style={{ fontSize: 14 }}>
                                Services/Labor:
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <div className="px-3">
                                <CTable
                                    style={{ fontSize: 12 }}
                                    columns={[
                                        // {
                                        //     key: 'id',
                                        //     label: '#',
                                        //     _props: { scope: 'col' },
                                        // },
                                        {
                                            key: 'name',
                                            label: 'Description',
                                            _props: { scope: 'col' },
                                        },
                                        // {
                                        //     key: 'amount',
                                        //     label: 'Amount',
                                        //     _props: { scope: 'col' },
                                        // },
                                    ]}
                                    items={get(data, 'lineItems', [])
                                        .filter((lineItem) => lineItem.type === 'services')
                                        .map((lineItem, index) => ({
                                            id: index + 1,
                                            name: lineItem.name,
                                            amount: lineItem.cost,
                                            // heading_2: '@mdo',
                                            _cellProps: { id: { scope: 'row' } },
                                        }))}
                                />
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol />
                        <CCol />
                        <CCol>
                            <div>Amount: P{numeral(get(data, 'amount')).format('0,0')}</div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <div className="px-3">&nbsp;</div>
                    </CRow>
                    <CRow>
                        <CCol>
                            <div className="ms-3">Signature:</div>
                            <div className="ms-3">Date: </div>
                            &nbsp;
                        </CCol>
                        <CCol />
                        <CCol>
                            <div className="ms-5">Approved By:{'\t'}</div>
                            <div className="ms-5">Date:{'\t'}</div>
                        </CCol>
                    </CRow>
                </Print>
            </CCol>
        </CRow>
    );
};

PrintInvoice.propTypes = {
    data: PropTypes.object,
};
PrintInvoice.defaultProps = {
    data: {},
};

export default PrintInvoice;
