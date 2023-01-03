import React from 'react';

import PropTypes from 'prop-types';

const VehcileEngineType = ({ data, hideLabel }) => {
    // eslint-disable-next-line default-case
    switch (data) {
        case 'diesel':
            return <span className="medium text-medium-emphasis">Diesel</span>;
        case 'unleaded':
            return <span className="medium text-medium-emphasis">Unleaded</span>;
        case 'electric':
            return <span className="medium text-medium-emphasis">Electric</span>;
    }
};

VehcileEngineType.propTypes = {
    data: PropTypes.string,
    hideLabel: PropTypes.bool,
};

VehcileEngineType.defaultProps = {
    data: '',
    hideLabel: false,
};

export default VehcileEngineType;
