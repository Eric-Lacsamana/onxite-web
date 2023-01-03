import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
} from '@coreui/react';
import { useMutation } from 'react-query';
import { FaEllipsisH, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { get } from 'lodash';

import { postVehicleRequest, putVehicleRequest } from 'src/views/vehicles/vehicles.fetch';
import VehicleBodyType from 'src/views/vehicles/components/VehicleBodyType';
import VehcileEngineType from 'src/views/vehicles/components/VehicleEngineType';
import VehicleSpecifications from 'src/views/vehicles/components/VehicleSpecifications';

const VehicleMaintenanceRequest = ({ data, children, onClose, visible }) => {
    const userInformation = get(JSON.parse(localStorage.getItem('auth')), 'user.userInformation');
    const dispatch = useDispatch();

    // const [visible, setVisible] = useState(false);
    // const [confirmationModal, setConfirmationModal] = useState({
    //     visible: false,
    //     message: null,
    // });

    const {
        register,
        watch,
        control,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            vehicle: data,
            complain: '',
        },
    });

    const { isLoading: isLoadingPost, mutate: mutatePost } = useMutation(postVehicleRequest, {
        onSuccess: (data) => {
            dispatch({
                type: 'ADD_TOAST',
                toast: {
                    header: 'Success',
                    body: (
                        <p>
                            Job Request: <strong>{data.jobOrderId}</strong> Submitted
                        </p>
                    ),
                },
            });
            // setVisible(false);
            reset();
        },
        onSettled: () => {
            onClose();
            reset();
        },
    });

    const handleSubmit = () => mutatePost({ vehicle: data, complain: watch('complain') });

    const handleClose = (e) => {
        e.stopPropagation();
        // setVisible(false);
        onClose();
    };

    // const updateWithprops = React.Children.map(children, (child, i) => {
    //     // props
    //     return React.cloneElement(child, {
    //         onClick: (e) => {
    //             e.stopPropagation();
    //             e.preventDefault();
    //             setVisible(true);
    //         },
    //     });
    // });

    return (
        <>
            {/* {updateWithprops} */}
            <CModal size="lg" alignment="center" visible={visible} onClose={onClose}>
                <CModalHeader>
                    <CModalTitle>Maintenance Request Form</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol>
                            <CRow>
                                <div>
                                    <VehicleSpecifications data={data} />
                                </div>
                            </CRow>
                            <CRow>
                                <div className="mb-3">
                                    <CFormLabel>Complain:</CFormLabel>
                                    <CFormTextarea
                                        rows="5"
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
                                    />
                                </div>
                            </CRow>
                            <CRow className="mb-1">
                                <CCol xxl={6}>
                                    <div className="small text-medium-emphasis">
                                        <CFormLabel>
                                            Requested By:{' '}
                                            <strong>
                                                {get(userInformation, 'firstName')}{' '}
                                                {get(userInformation, 'lastName')}
                                            </strong>
                                        </CFormLabel>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton disabled={isLoadingPost} color="secondary" onClick={handleClose}>
                        Close
                    </CButton>
                    <CButton disabled={isLoadingPost} onClick={handleSubmit} color="primary">
                        Submit
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

VehicleMaintenanceRequest.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.object,
    visible: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.node,
};

VehicleMaintenanceRequest.defaultProps = {
    data: {},
    onClose: () => {},
    visible: false,
    type: PropTypes.oneOf(['link', 'button', 'buttonIcon']),
    children: null,
};

export default VehicleMaintenanceRequest;
