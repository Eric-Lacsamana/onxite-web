import React from 'react';

import PropTypes from 'prop-types';

const VehicleBodyType = ({ data, hideLabel }) => {
    // eslint-disable-next-line default-case
    switch (data) {
        case 'sedan':
            return <span className="medium text-medium-emphasis">Sedan</span>;
        case 'hatch':
            return <span className="medium text-medium-emphasis">Hatch Back</span>;
        case 'suv':
            return <span className="medium text-medium-emphasis">SUV</span>;
        case 'forklift':
            return <span className="medium text-medium-emphasis">Fork Lift</span>;
        case 'grab_lift':
            return <span className="medium text-medium-emphasis">Grab Lift</span>;
        case 'motorcycle':
            return <span className="medium text-medium-emphasis">Motorcycle</span>;
        case 'four_wheeler':
            return <span className="medium text-medium-emphasis">4 Wheeler</span>;
        case 'six_wheeler':
            return <span className="medium text-medium-emphasis">6 Wheeler</span>;
        case 'grablift':
            return <span className="medium text-medium-emphasis">Grab Lift</span>;
    }
};

VehicleBodyType.propTypes = {
    data: PropTypes.string,
    hideLabel: PropTypes.bool,
};

VehicleBodyType.defaultProps = {
    data: '',
    hideLabel: false,
};

export default VehicleBodyType;
