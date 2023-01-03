import React from 'react';
import { CRow, CCol } from '@coreui/react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import VehcileEngineType from './VehicleEngineType';
import VehicleBodyType from './VehicleBodyType';

const VehicleSpecifications = ({ data }) => {
    return (
        <div>
            <CCol>
                <CRow>
                    <div className="mb-1 small text-medium-emphasis">
                        <span>Engine: {get(data, 'engineDescription')}</span>
                    </div>
                </CRow>
                <CRow>
                    <div className="mb-1 small text-medium-emphasis">
                        <span>
                            Body Type: <VehicleBodyType data={get(data, 'bodyType')} />
                        </span>
                    </div>
                </CRow>
                <CRow>
                    <div className="mb-1 small text-medium-emphasis">
                        <span>
                            Type: <VehcileEngineType data={get(data, 'engineType')} />
                        </span>
                    </div>
                </CRow>
                <CRow className="mb-1">
                    <div className="small text-medium-emphasis">
                        <span>Plate: {get(data, 'plate')}</span>
                    </div>
                </CRow>
            </CCol>
        </div>
    );
};

VehicleSpecifications.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.object,
    visible: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.node,
};

VehicleSpecifications.defaultProps = {
    data: {},
    onClose: () => {},
    visible: false,
    type: PropTypes.oneOf(['link', 'button', 'buttonIcon']),
    children: null,
};

export default VehicleSpecifications;
