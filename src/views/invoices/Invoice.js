import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useFieldArray, useForm, useFormState } from 'react-hook-form';
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
import { getInvoice } from './invoices.fetch';

import Print from 'src/components/_global/Print';
import PrintInvoice from './components/PrintInvoice';

const Invoice = () => {
    const { id } = useParams();

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, watch, control, getValues, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            lineItems: [],
            createdAt: null,
            amount: 0,
            status: '',
            jobOrder: {},
        },
    });

    const { dirtyFields, isDirty } = useFormState({
        control,
    });

    const {
        data: invoice,
        isFetching,
        isLoading,
        refetch,
    } = useQuery(['invoices', id], getInvoice, {
        placeholderData: {},
        // enabled: !!id,
        // onError: (err) => {
        //     setConfirmationModal({
        //         message: err.message,
        //         visible: true,
        //     });
        // },
    });
    console.log('invoice', invoice);
    // const { mutate, isLoading: isLoadingMutation } = useMutation(putJobOrder, {
    //     onSuccess: (data) => {
    //         // navigate('/job-orders');

    //         dispatch({
    //             type: 'ADD_TOAST',
    //             toast: {
    //                 header: 'Success',
    //                 body:
    //                     !jobOrder.verified && data.verified
    //                         ? 'Job Order Accepted'
    //                         : 'Job Order Updated',
    //             },
    //         });
    //         refetch();
    //     },
    //     onError: (err) => {
    //         const { error } = get(err, 'response.data');

    //         // setError(error);
    //     },
    // });

    useEffect(() => {
        function setValues(defaultValue, newValue) {
            reset({
                ...defaultValue,
                ...newValue,
            });
        }

        if (get(invoice, 'id')) {
            setValues(getValues(), invoice);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoice, isFetching, refetch]);

    return (
        <>
            <CCard className="px-5">
                <CCardBody>
                    <CRow>
                        <CCol>
                            {/* <CRow xxl={12}>
                                <CCol align="center">
                                    <div className="mt-3 mb-5">
                                        <h5>Onxite Automotive</h5>
                                    </div>
                                </CCol>
                            </CRow> */}
                            <CRow>
                                <CCol>
                                    <div className="mb-3">
                                        <h5>
                                            Invoice ID: <strong>{invoice.invoiceId}</strong>
                                        </h5>
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CFormLabel>Bill To:</CFormLabel>
                                    <div className="ms-3">
                                        <strong>{get(invoice, 'client.name')}</strong>
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <div className="mb-3">
                                        Job Order ID:{' '}
                                        <strong>{get(invoice, 'jobOrder.jobOrderId')}</strong>
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
                                                    <div className="mb-3">
                                                        <div style={{ fontSize: 18 }}>
                                                            {get(invoice, 'jobOrder.vehicle.brand')}{' '}
                                                            {get(
                                                                invoice,
                                                                'jobOrder.vehicle.modelName',
                                                            )}{' '}
                                                            {get(
                                                                invoice,
                                                                'jobOrder.vehicle.yearModel',
                                                            ) || ''}
                                                        </div>
                                                        <div className="text-medium-emphasis">
                                                            <span>
                                                                Plate:{' '}
                                                                {get(
                                                                    invoice,
                                                                    'jobOrder.vehicle.plate',
                                                                )}
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
                                    <div>
                                        <hr />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <div className="px-3">
                                        <h6>Items/Materials:</h6>
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <div className="px-3">
                                        <CTable
                                            columns={[
                                                {
                                                    key: 'id',
                                                    label: '#',
                                                    _props: { scope: 'col' },
                                                },
                                                {
                                                    key: 'name',
                                                    label: 'Item Name',
                                                    _props: { scope: 'col' },
                                                },
                                                {
                                                    key: 'amount',
                                                    label: 'Amount',
                                                    _props: { scope: 'col' },
                                                },
                                                // {
                                                //     key: 'heading_2',
                                                //     label: 'Heading',
                                                //     _props: { scope: 'col' },
                                                // },
                                            ]}
                                            items={watch('lineItems')
                                                .filter((lineItem) => lineItem.type === 'materials')
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
                                <CCol>
                                    <div>
                                        <hr />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <div className="px-3">
                                        <h6>Services/Labor:</h6>
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <div className="px-3">
                                        <CTable
                                            columns={[
                                                {
                                                    key: 'id',
                                                    label: '#',
                                                    _props: { scope: 'col' },
                                                },
                                                {
                                                    key: 'name',
                                                    label: 'Description',
                                                    _props: { scope: 'col' },
                                                },
                                                {
                                                    key: 'amount',
                                                    label: 'Amount',
                                                    _props: { scope: 'col' },
                                                },
                                            ]}
                                            items={watch('lineItems')
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
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <PrintInvoice data={invoice} />
        </>
    );
};

export default Invoice;
