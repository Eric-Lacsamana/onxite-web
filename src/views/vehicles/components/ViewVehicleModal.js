import React, { useState } from 'react';
import {
    CModal,
    CModalBody,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CButton,
    CFormSwitch,
    CModalHeader,
    CModalFooter,
    CFormTextarea,
    CFormLabel,
    CFormInput,
} from '@coreui/react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import VehicleSpecifications from './VehicleSpecifications';

const ViewVehicleModal = ({ data, children, readOnly, onClose }) => {
    const [visible, setVisible] = useState(false);

    const updateWithprops = React.Children.map(children, (child, i) => {
        // props
        return React.cloneElement(child, { onClick: () => setVisible(true) });
    });
    return (
        <>
            {updateWithprops}
            <CModal size="lg" alignment="center" visible={visible} onClose={onClose}>
                <CModalHeader>
                    <CRow>
                        <div className="mb-1 text-medium-emphasis">
                            {' '}
                            <strong>{`${get(data, 'brand')} ${get(data, 'modelName')} ${
                                get(data, 'yearModel') || ''
                            }`}</strong>
                        </div>
                    </CRow>
                </CModalHeader>
                <CModalBody>
                    <CRow xxl={{ cols: 2 }}>
                        <CCol>
                            <CRow>
                                <div>
                                    <VehicleSpecifications data={data} />
                                </div>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <div>
                                        <hr />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol className="mb-1">
                                    <div className="small text-medium-emphasis">
                                        {/* <span>Status: </span>{' '} */}
                                        <CFormSwitch
                                            label="Running Condition"
                                            checked={data.runningCondition}
                                            id="formSwitchCheckDefaultNormal"
                                        />
                                        {/* <CIcon className="text-success" icon={cilCheckCircle} size="lg" /> */}
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol className="mb-1">
                                    <div className="small text-medium-emphasis">
                                        {/* <span>Status: </span>{' '} */}
                                        <CFormSwitch
                                            label="With Warning"
                                            checked={data.runningCondition}
                                            id="formSwitchCheckDefaultNormal"
                                        />
                                        {/* <CIcon className="text-success" icon={cilCheckCircle} size="lg" /> */}
                                    </div>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <div className="mb-3">
                                        <CFormLabel className="mb-1 small text-medium-emphasis">
                                            Note:
                                        </CFormLabel>
                                        <CFormTextarea rows={3} />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <div>
                                        <CFormLabel className="mb-1 small text-medium-emphasis">
                                            Location:
                                        </CFormLabel>
                                        <CFormInput />
                                    </div>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CRow>
                        <CCol align="right">
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                Close
                            </CButton>{' '}
                        </CCol>
                    </CRow>
                </CModalFooter>
            </CModal>
        </>
    );
};

ViewVehicleModal.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.object,
    readOnly: PropTypes.bool,
    // type: PropTypes.string,
    children: PropTypes.node,
};

ViewVehicleModal.defaultProps = {
    data: {},
    onClose: () => {},
    readOnly: false,
    // type: PropTypes.oneOf(['link', 'button', 'buttonIcon']),
    children: null,
};

export default ViewVehicleModal;
