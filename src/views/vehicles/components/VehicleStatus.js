import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { get } from 'lodash';

const VehicleStatus = ({ data, hideLabel }) => {
    // eslint-disable-next-line default-case
    switch (data) {
        case 'running':
            return (
                <span className="small text-medium-emphasis">
                    <span className="circle-dot" style={{ backgroundColor: 'green' }} />{' '}
                    {!hideLabel ? 'Running' : null}
                </span>
            );
        case 'down':
            return (
                <span className="small text-medium-emphasis">
                    <span className="circle-dot" style={{ backgroundColor: 'red' }} />{' '}
                    {!hideLabel ? 'Down' : null}
                </span>
            );
        case 'pending':
            return (
                <span className="small text-medium-emphasis">
                    <span className="circle-dot" style={{ backgroundColor: 'gray' }} />{' '}
                    {!hideLabel ? 'Pending' : null}
                </span>
            );
    }
};

VehicleStatus.propTypes = {
    data: PropTypes.string,
    hideLabel: PropTypes.bool,
};

VehicleStatus.defaultProps = {
    data: '',
    hideLabel: false,
};

export default VehicleStatus;
