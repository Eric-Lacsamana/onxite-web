import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CCardHeader,
    CCardTitle,
    CButton,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownDivider,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilWarning, cilXCircle } from '@coreui/icons';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import avatar1 from 'src/assets/images/avatars/1.jpg';
import VehicleMaintenanceRequest from './VehicleMaintenanceRequest';
import ViewVehicleModal from 'src/views/vehicles/components/ViewVehicleModal';
import { FaEllipsisH } from 'react-icons/fa';

const VehicleTab = ({ data, onChange }) => {
    const [visible, setVisible] = useState(false);

    const handleOnCloseModal = () => {
        setVisible(false);
        onChange();
    };
    return (
        <>
            <ViewVehicleModal data={data}>
                <CCard
                    textColor="dark"
                    // className={`mb-3 border-light card d-block box-shadow-hover pointer`}
                    style={{ maxWidth: '18rem', cursor: 'pointer' }}
                >
                    <CCardHeader>
                        <CRow>
                            <CCol xxl={9}>
                                <div>
                                    <strong>{`${get(data, 'brand')} ${get(data, 'modelName')} ${
                                        get(data, 'yearModel') || ''
                                    }`}</strong>
                                </div>
                            </CCol>
                            <CCol xxl={3}>
                                <CDropdown variant="dropdown" onClick={(e) => e.stopPropagation()}>
                                    <CDropdownToggle
                                        variant="outline"
                                        color="secondary"
                                        placement="bottom-end"
                                        className="py-0"
                                        size="lg"
                                        style={{ border: 0 }}
                                        caret={false}
                                    >
                                        <FaEllipsisH />
                                    </CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem href="#" disabled>
                                            View
                                        </CDropdownItem>
                                        <CDropdownItem href="#" disabled>
                                            Edit
                                        </CDropdownItem>
                                        <CDropdownItem onClick={() => setVisible(true)}>
                                            Maintenance
                                        </CDropdownItem>
                                        <CDropdownDivider />
                                        <CDropdownItem disabled href="#">
                                            More...
                                        </CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol>
                                <div>
                                    <hr />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <div className="small text-medium-emphasis">
                                    <span>Location: </span>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol className="mb-1">
                                <div className="small text-medium-emphasis">
                                    <span>Running Condition: </span>{' '}
                                    <CIcon
                                        className={
                                            get(data, 'runningCondition')
                                                ? 'text-success'
                                                : 'text-danger'
                                        }
                                        icon={
                                            get(data, 'runningCondition')
                                                ? cilCheckCircle
                                                : cilXCircle
                                        }
                                        size="lg"
                                    />
                                </div>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </ViewVehicleModal>
            <VehicleMaintenanceRequest data={data} visible={visible} onClose={handleOnCloseModal} />
        </>
    );
};

VehicleTab.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
};

VehicleTab.defaultProps = {
    data: {},
    onChange: PropTypes.func,
};

export default VehicleTab;
