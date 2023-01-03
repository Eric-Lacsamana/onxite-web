import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
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
import { FaExclamationTriangle, FaEyeSlash, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { get } from 'lodash';
import { getJobOrder, putJobOrder } from './job-orders.fetch';
import moment from 'moment';

import Print from 'src/components/_global/Print';
import avatar1 from './../../assets/images/avatars/2.jpg';
// import JobOrders from './JobOrders';
import CrewSelect from '../employees/components/CrewSelect';
import LineItemsInput from './components/LineItemsInput';
import JobOrderStatusDropdown from './components/JobOrderStatusDropdown';
import VehicleBodyType from '../vehicles/components/VehicleBodyType';
import { postInvoice } from '../invoices/invoices.fetch';

const JobOrder = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState({
        visible: false,
        message: null,
    });
    const [invoiceConfirmationModal, setInvoiceConfirmationModal] = useState({
        visible: false,
        message: 'Confirm create invoice?',
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

    const {
        data: jobOrder,
        isFetching,
        isLoading,
        refetch,
    } = useQuery(['job-orders', id], getJobOrder, {
        placeholderData: [],
        enabled: !!id && !isDirty,
        // onError: (err) => {
        //     setConfirmationModal({
        //         message: err.message,
        //         visible: true,
        //     });
        // },
    });

    const { mutate, isLoading: isLoadingMutation } = useMutation(putJobOrder, {
        onSuccess: (data) => {
            // navigate('/job-orders');

            dispatch({
                type: 'ADD_TOAST',
                toast: {
                    header: 'Success',
                    body:
                        !jobOrder.verified && data.verified
                            ? 'Job Order Accepted'
                            : 'Job Order Updated',
                },
            });
            refetch();
        },
        onError: (err) => {
            const { error } = get(err, 'response.data');

            // setError(error);
        },
    });

    useEffect(() => {
        function setValues(defaultValue, newValue) {
            reset({
                ...defaultValue,
                ...newValue,
            });
        }

        if (get(jobOrder, 'id')) {
            setValues(getValues(), jobOrder);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobOrder, isFetching, refetch]);

    const handleCreateInvoice = async () => {
        const invoice = await postInvoice({
            jobOrder: get(jobOrder, 'id'),
            client: get(jobOrder, 'client.id'),
        });
        setInvoiceConfirmationModal({ visible: false });
        return navigate(`/invoices/${invoice.id}`);
    };

    const onSubmit = (data, e) => mutate({ ...data, prevLineItems: jobOrder.lineItems });
    const onError = () => console.log('TMD', {});

    return (
        <CForm id="job-order-form" onSubmit={handleSubmit(onSubmit, onError)}>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol xxl={12} align="center">
                            <div className="mt-5" style={{ fontSize: 35 }}>
                                OnXite
                            </div>
                            <div style={{ fontSize: 15 }}>Automotive Shop</div>
                        </CCol>
                    </CRow>
                    <CRow xxl={12}>
                        <CCol className="mt-5 px-5 mb-3">
                            <CRow>
                                <CCol>
                                    <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <div className="mb-3" style={{ fontSize: 25 }}>
                                            Job Order:{' '}
                                            <strong>{get(jobOrder, 'jobOrderId')}</strong>
                                        </div>
                                    </CCol>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <div className="mb-3">
                                            Client: <strong>{get(jobOrder, 'client.name')}</strong>
                                        </div>
                                    </CCol>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol className="mt-5 px-5 mb-3">
                            <CRow>
                                <CCol
                                    align="center"
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    xxl={12}
                                >
                                    {/* <div className="mb-3" style={{ fontSize: 25 }}>
                                        OnXite
                                    </div> */}
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <div className="mb-3">
                                            {/* Customer:{' '}
                                            <strong>{get(jobOrder, 'customer.name')}</strong> */}
                                        </div>
                                    </CCol>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol className="mt-5 px-5 mb-3">
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
                                            {moment(get(jobOrder, 'createdAt')).format(
                                                'MM-DD-YYYY',
                                            )}
                                        </strong>
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <div className="mb-3">
                                        {/* Customer: <strong>{get(jobOrder, 'customer.name')}</strong> */}
                                    </div>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <div className="px-5">
                            <CRow xxl={{ cols: 2 }}>
                                <CCol>
                                    <CFormLabel>Vehicle:</CFormLabel>
                                    <div className="ms-3 mt-1">
                                        <CRow>
                                            <CCol>
                                                <CRow>
                                                    <div className="mb-3">
                                                        <div style={{ fontSize: 25 }}>
                                                            {get(jobOrder, 'vehicle.brand')}{' '}
                                                            {get(jobOrder, 'vehicle.modelName')}{' '}
                                                            {get(jobOrder, 'vehicle.yearModel') ||
                                                                ''}
                                                        </div>
                                                        <div className="text-medium-emphasis">
                                                            <span>
                                                                Plate:{' '}
                                                                {get(jobOrder, 'vehicle.plate')}
                                                            </span>{' '}
                                                            | Type:{' '}
                                                            <VehicleBodyType
                                                                data={get(
                                                                    jobOrder,
                                                                    'vehicle.bodyType',
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="small text-medium-emphasis">
                                                            <span>
                                                                Status:{' '}
                                                                {get(jobOrder, 'vehicle.status')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CRow>
                                            </CCol>
                                        </CRow>
                                    </div>
                                </CCol>
                                <CCol>
                                    <CRow>
                                        <div className="mb-3">
                                            <CFormLabel>Complain:</CFormLabel>
                                            <CFormTextarea
                                                rows="8"
                                                placeholder="Type Here.."
                                                id="complain"
                                                {...register('complain', {
                                                    // required: true,
                                                    // valueAsDate: true,
                                                })}
                                                min={0}
                                                name="complain"
                                                autoComplete="off"
                                                aria-label="Complain"
                                                readOnly
                                            />
                                        </div>
                                    </CRow>
                                    <CRow>
                                        <CCol>
                                            <div className="text-medium-emphasis">
                                                Requested By:{' '}
                                                <span>
                                                    {get(jobOrder, 'requestedByUser.firstName')}{' '}
                                                    {get(jobOrder, 'requestedByUser.lastName')}
                                                </span>
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </div>
                    </CRow>
                    <CRow>
                        <CCol>
                            <hr />
                        </CCol>
                    </CRow>
                    <CRow xxl={{ cols: 2 }}>
                        <CCol>
                            <CFormLabel>Assignees:</CFormLabel>
                            <CRow xxl={{ cols: 3 }}>
                                <CCol xxl={12}>
                                    <div className="mb-3">
                                        <Controller
                                            name="assignees"
                                            control={control}
                                            // rules={{ required: true }}
                                            render={({ field }) => (
                                                <CrewSelect
                                                    defaultValues={field.value}
                                                    onChange={(data) => field.onChange(data)}
                                                />
                                            )}
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <div
                                    style={{
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        maxHeight: 150,
                                    }}
                                >
                                    {watch('assignees').length ? (
                                        <CListGroup>
                                            {watch('assignees').map((assignee) => (
                                                <CListGroupItem
                                                    component="a"
                                                    key={get(assignee, 'lastName')}
                                                >
                                                    <CRow>
                                                        <CCol xxl={1}>
                                                            <CAvatar size="md" color="secondary">
                                                                {get(assignee, 'firstName').charAt(
                                                                    0,
                                                                )}
                                                                {get(assignee, 'lastName').charAt(
                                                                    0,
                                                                )}
                                                            </CAvatar>{' '}
                                                        </CCol>
                                                        <CCol>
                                                            <div>
                                                                <span>
                                                                    <div>
                                                                        {`${get(
                                                                            assignee,
                                                                            'firstName',
                                                                        )} 
                                                            ${get(assignee, 'lastName')}`}
                                                                    </div>
                                                                    <div className="small text-medium-emphasis">
                                                                        <span>
                                                                            {get(
                                                                                assignee,
                                                                                'position',
                                                                            )}
                                                                        </span>{' '}
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </CListGroupItem>
                                            ))}
                                        </CListGroup>
                                    ) : (
                                        <CCol align="center">No Assignees</CCol>
                                    )}
                                </div>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow>
                                <div className="mb-3">
                                    <CFormLabel>Diagnosis:</CFormLabel>
                                    <CFormTextarea
                                        rows="8"
                                        placeholder="Type Here.."
                                        id="diagnosis"
                                        {...register('diagnosis', {
                                            // required: true,
                                            // valueAsDate: true,
                                        })}
                                        min={0}
                                        name="diagnosis"
                                        autoComplete="off"
                                        aria-label="Diagnosis"
                                    />
                                </div>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <div className="text-medium-emphasis">
                                        Prepared By:{' '}
                                        <span>
                                            {/* {get(jobOrder, 'requestedByUser.firstName')}{' '}
                                            {get(jobOrder, 'requestedByUser.lastName')} */}
                                        </span>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow className="mt-3 mb-3">
                        <CCol>
                            <hr />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CFormLabel>Services:</CFormLabel>
                            <CRow>
                                <div
                                    className="mb-3"
                                    style={{
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        maxHeight: 200,
                                    }}
                                >
                                    <LineItemsInput {...{ register, control }} type="services" />
                                </div>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CFormLabel>Materials:</CFormLabel>
                            <CRow>
                                <div
                                    className="mb-3"
                                    style={{
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        maxHeight: 200,
                                    }}
                                >
                                    <LineItemsInput {...{ register, control }} type="materials" />
                                </div>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow className="mt-3 mb-3">
                        <CCol>
                            <hr />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3" xxl={{ cols: 2 }}>
                        <CCol>
                            <CCol>
                                <CRow>
                                    <CCol xxl={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="inputStartDate">Start:</CFormLabel>
                                            <Controller
                                                name="startDate"
                                                control={control}
                                                // rules={{ required: true }}
                                                render={({ field }) => (
                                                    <CFormInput
                                                        type="date"
                                                        id="startDate"
                                                        // {...register('startDate', {
                                                        //     // required: true,
                                                        //     valueAsDate: true,
                                                        // })}
                                                        onChange={(e) =>
                                                            field.onChange(e.target.value)
                                                        }
                                                        min={moment(
                                                            jobOrder.startDate || new Date(),
                                                        ).format('YYYY-MM-DD')}
                                                        autoComplete="off"
                                                        placeholder="Start Date"
                                                        aria-label="start"
                                                        value={moment(field.value).format(
                                                            'YYYY-MM-DD',
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </CCol>
                                    <CCol xxl={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="inputEndDate">End:</CFormLabel>
                                            <Controller
                                                name="endDate"
                                                control={control}
                                                // rules={{ required: true }}
                                                render={({ field }) => (
                                                    <CFormInput
                                                        type="date"
                                                        id="endDate"
                                                        // {...register('endDate', {
                                                        //     // required: true,
                                                        //     valueAsDate: true,
                                                        // })}
                                                        onChange={(e) =>
                                                            field.onChange(e.target.value)
                                                        }
                                                        min={moment(watch('startDate')).format(
                                                            'YYYY-MM-DD',
                                                        )}
                                                        autoComplete="off"
                                                        placeholder="Start Date"
                                                        aria-label="start"
                                                        value={moment(field.value).format(
                                                            'YYYY-MM-DD',
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CCol>
                        <CCol>
                            <CRow>
                                <div className="mb-3">
                                    <CFormLabel>Work Status:</CFormLabel>
                                    <CFormTextarea
                                        rows="8"
                                        placeholder="Type Here.."
                                        id="completionOfWork"
                                        {...register('completionOfWork', {
                                            // required: true,
                                            // valueAsDate: true,
                                        })}
                                        min={0}
                                        name="completionOfWork"
                                        autoComplete="off"
                                        aria-label="Work Status"
                                    />
                                </div>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol></CCol>
                        <CCol>
                            <CRow>
                                <CFormLabel htmlFor="inputStartDate">Status:</CFormLabel>
                                <CCol xxl={6}>
                                    <div className="mb-3">
                                        <Controller
                                            id="status"
                                            name="status"
                                            control={control}
                                            // rules={{ required: true }}
                                            render={({ field }) => (
                                                <JobOrderStatusDropdown
                                                    value={field.value}
                                                    onChange={(data) => field.onChange(data)}
                                                />
                                                // <CFormSelect
                                                //     id="status"
                                                //     onChange={(data) => field.onChange(data)}
                                                //     name="status"
                                                //     value={field.value}
                                                //     options={[
                                                //         // 'Open this select menu',
                                                //         { label: 'New', value: 'new' },
                                                //         { label: 'Ongoing', value: 'ongoing' },
                                                //         {
                                                //             label: 'Completed',
                                                //             value: 'completed',
                                                //         },
                                                //     ]}
                                                // />
                                            )}
                                        />
                                    </div>
                                </CCol>
                                {watch('status') === 'new' ||
                                    watch('status') === 'ongoing' ||
                                    (jobOrder.status === 'completed' && (
                                        <CCol align="center" xxl={1}>
                                            <div className="mb-3">
                                                <CButton size="sm" variant="outline" color="danger">
                                                    <FaExclamationTriangle color="red" size={25} />
                                                </CButton>
                                            </div>
                                        </CCol>
                                    ))}
                                <CCol align="right" xxl={1}>
                                    <div className="mb-3">
                                        <CButton size="sm" variant="outline" color="dark">
                                            <FaEyeSlash size={25} />
                                        </CButton>
                                    </div>
                                </CCol>
                                <CCol>
                                    <div className="mb-3">
                                        <CButton
                                            size="sm"
                                            variant="outline"
                                            color="dark"
                                            onClick={() =>
                                                setInvoiceConfirmationModal({ visible: true })
                                            }
                                        >
                                            <FaFileInvoice size={25} />
                                        </CButton>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol align="right">
                            <div className="mb-3">
                                <CButton
                                    disabled={!isDirty}
                                    type="submit"
                                    form="job-order-form"
                                    color="primary"
                                >
                                    Save
                                </CButton>
                            </div>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CModal
                alignment="center"
                visible={confirmationModal.visible}
                onClose={() => setConfirmationModal({ visible: false })}
            >
                <CModalHeader>
                    <CModalTitle>Error</CModalTitle>
                </CModalHeader>
                <CModalBody>{confirmationModal.message}</CModalBody>
                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={() => setConfirmationModal({ visible: false })}
                    >
                        Close
                    </CButton>
                    <CButton color="primary">Save changes</CButton>
                </CModalFooter>
            </CModal>
            <CModal
                alignment="center"
                visible={invoiceConfirmationModal.visible}
                onClose={() => setInvoiceConfirmationModal({ visible: false })}
            >
                <CModalHeader>
                    <CModalTitle>Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>Confirm Create Invoice</CModalBody>
                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={() => setInvoiceConfirmationModal({ visible: false })}
                    >
                        Close
                    </CButton>
                    <CButton onClick={handleCreateInvoice} color="primary">
                        Create
                    </CButton>
                </CModalFooter>
            </CModal>
        </CForm>
    );
};

export default JobOrder;
