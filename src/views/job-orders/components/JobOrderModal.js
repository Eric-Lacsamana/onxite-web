import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, useFormState } from 'react-hook-form';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CCardHeader,
    CCardTitle,
    CButton,
    CFormInput,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormTextarea,
    CListGroupItem,
    CListGroup,
    CForm,
    CAvatar,
    CFormSelect,
} from '@coreui/react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { get } from 'lodash';

import { getJobOrder, putJobOrder } from 'src/views/job-orders/job-orders.fetch';
import moment from 'moment';
import VehicleSpecifications from 'src/views/vehicles/components/VehicleSpecifications';

const JobOrderModal = ({ data, children, readOnly, onClose }) => {
    const userRole = get(JSON.parse(localStorage.getItem('auth')), 'user.role');
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    // const {
    //     data: jobOrder,
    //     isFetching,
    //     isLoading,
    //     refetch,
    // } = useQuery(['job-orders', data.id], getJobOrder, {
    //     placeholderData: [],
    //     enabled: !!data.id,
    //     // onError: (err) => {
    //     //     setConfirmationModal({
    //     //         message: err.message,
    //     //         visible: true,
    //     //     });
    //     // },
    // });

    const { mutate, isLoading } = useMutation(putJobOrder, {
        onSuccess: (d) => {
            // navigate('/job-orders');
            dispatch({
                type: 'ADD_TOAST',
                toast: {
                    header: 'Success',
                    body: !data.verified && d.verified ? 'Job Order Accepted' : 'Job Order Updated',
                },
            });

            onClose();
            setVisible(false);
        },
        onError: (err) => {
            const { error } = get(err, 'response.data');

            // setError(error);
        },
    });

    const { register, watch, control, getValues, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            vehicle: {},
            assignees: [],
            complain: '',
            diagnosis: '',
            completionOfWork: '',
            lineItems: [],
            startDate: null,
            endDate: null,
            itemName: '',
            quantity: 0,
            cost: 0,
            status: '',
            requestedByUser: {},
        },
    });

    const { dirtyFields, isDirty } = useFormState({
        control,
    });

    useEffect(() => {
        function setValues(defaultValue, newValue) {
            reset({
                ...defaultValue,
                ...newValue,
            });
        }

        if (get(data, 'id')) {
            setValues(getValues(), data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(data), visible]);

    const onSubmit = (data, e) => mutate({ ...data, prevLineItems: data.lineItems });
    const onError = () => console.log('TMD', {});
    const updateWithprops = React.Children.map(children, (child, i) => {
        // props
        return React.cloneElement(child, { onClick: () => setVisible(true) });
    });
    const handleCancelRequest = () => mutate({ id: data.id, status: 'cancelled' });

    const renderButton = () => {
        // eslint-disable-next-line default-case
        switch (userRole.type) {
            case 'operations_manager':
                return (
                    <CButton disabled={isLoading} type="submit" form="form-hook" color="primary">
                        {!data.verified ? 'Accept' : 'Confirm'}
                    </CButton>
                );
            case 'client_user':
                return !data.verified && data.status === 'new' ? (
                    <CButton
                        disabled={isLoading}
                        // type="submit"
                        // form="form-hook"
                        onClick={handleCancelRequest}
                        color={!data.verified && data.status ? 'danger' : 'primary'}
                    >
                        Cancel
                    </CButton>
                ) : null;
        }
    };

    return (
        <>
            {updateWithprops}
            <CModal size="lg" alignment="center" visible={visible} onClose={onClose}>
                <CModalBody>
                    <CForm id="form-hook" onSubmit={handleSubmit(onSubmit, onError)}>
                        <CCard>
                            <CCardHeader>
                                <CRow xxl={12}>
                                    <CCol className="">
                                        <CRow>
                                            <CCol>
                                                <CCol
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                    xl={12}
                                                    xxl={12}
                                                >
                                                    <div className="mb-3" style={{ fontSize: 25 }}>
                                                        {data.verified ? 'Job Order' : 'Request'}{' '}
                                                        ID:{' '}
                                                        <strong>{get(data, 'jobOrderId')}</strong>
                                                    </div>
                                                </CCol>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol>
                                        <CRow>
                                            <CCol
                                                align="right"
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                xl={12}
                                                xxl={12}
                                            >
                                                <div className="mb-3">
                                                    Date:{' '}
                                                    <strong>
                                                        {moment(get(data, 'createdAt')).format(
                                                            'MM-DD-YYYY',
                                                        )}
                                                    </strong>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <div>
                                        <CCol>
                                            <CFormLabel>Vehicle:</CFormLabel>

                                            <div className="mb-3">
                                                <VehicleSpecifications data={data.vehicle} />
                                            </div>
                                        </CCol>
                                    </div>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <hr />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <div className="mb-3">
                                        <CFormLabel>Complain:</CFormLabel>
                                        <CFormTextarea
                                            rows={5}
                                            id="complain"
                                            name="complain"
                                            autoComplete="off"
                                            aria-label="Complain"
                                            readOnly
                                            value={data.complain}
                                        />
                                    </div>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <div className="text-medium-emphasis">
                                            Requested By:{' '}
                                            <span>
                                                {get(data, 'requestedByUser.firstName')}{' '}
                                                {get(data, 'requestedByUser.lastName')}
                                            </span>
                                        </div>
                                    </CCol>
                                </CRow>
                                {data.verified && (
                                    <>
                                        <CRow>
                                            <CCol>
                                                <hr />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <div className="mb-3">
                                                <CFormLabel>Diagnosis:</CFormLabel>
                                                <CFormTextarea
                                                    rows={5}
                                                    id="diagnosis"
                                                    name="diagnosis"
                                                    autoComplete="off"
                                                    aria-label="Diagnosis"
                                                    readOnly={userRole.type === 'client_user'}
                                                    value={watch('diagnosis')}
                                                    placeholder={
                                                        userRole.type === 'client_user'
                                                            ? ''
                                                            : 'Type Here'
                                                    }
                                                    {...register('diagnosis', {
                                                        // required: true,
                                                        // valueAsDate: true,
                                                    })}
                                                />
                                            </div>
                                        </CRow>
                                        <CRow className="mb-3" xxl={{ cols: 1 }}>
                                            <CCol>
                                                <CCol>
                                                    <CRow>
                                                        {data.startDate && (
                                                            <CCol xxl={6}>
                                                                <div className="mb-3">
                                                                    Start Sched:{' '}
                                                                    <strong>
                                                                        {moment(
                                                                            data.startDate,
                                                                        ).format('YYYY-MM-DD')}
                                                                    </strong>
                                                                </div>
                                                            </CCol>
                                                        )}
                                                        {data.endDate && (
                                                            <CCol xxl={6}>
                                                                <div className="mb-3">
                                                                    Est. Date of Finish:{' '}
                                                                    <strong>
                                                                        {moment(
                                                                            data.endDate,
                                                                        ).format('YYYY-MM-DD')}
                                                                    </strong>
                                                                </div>
                                                            </CCol>
                                                        )}
                                                    </CRow>
                                                </CCol>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <hr />
                                            </CCol>
                                        </CRow>

                                        {data.status === 'completed' && (
                                            <CRow>
                                                <div className="mb-3">
                                                    <CFormLabel>Work Status:</CFormLabel>
                                                    <CFormTextarea
                                                        rows={5}
                                                        id="completionOfWork"
                                                        name="completionOfWork"
                                                        autoComplete="off"
                                                        aria-label="completionOfWork"
                                                        readOnly
                                                        value={data.completionOfWork}
                                                    />
                                                </div>
                                            </CRow>
                                        )}
                                    </>
                                )}
                                <CRow>
                                    <CCol align="right">
                                        <CButton
                                            color="secondary"
                                            onClick={() => setVisible(false)}
                                        >
                                            Close
                                        </CButton>{' '}
                                        {renderButton()}
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};

JobOrderModal.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.object,
    readOnly: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.node,
};

JobOrderModal.defaultProps = {
    data: {},
    onClose: () => {},
    readOnly: false,
    type: PropTypes.oneOf(['link', 'button', 'buttonIcon']),
    children: null,
};

export default JobOrderModal;
