import React from 'react';

import PropTypes from 'prop-types';

const VehicleTransmission = ({ data, hideLabel }) => {
    switch (data) {
        case 'diesel':
            return <span className="medium text-medium-emphasis">Manual Transmission</span>;
        case 'unleaded':
            return <span className="medium text-medium-emphasis">Automatic Transmission</span>;
        case 'electric':
            return (
                <span className="medium text-medium-emphasis">
                    Continuously Variable Transmission
                </span>
            );
        default:
            return null;
    }
};

VehicleTransmission.propTypes = {
    data: PropTypes.string,
    hideLabel: PropTypes.bool,
};

VehicleTransmission.defaultProps = {
    data: '',
    hideLabel: false,
};

export default VehicleTransmission;
