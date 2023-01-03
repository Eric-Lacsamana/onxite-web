import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { get } from 'lodash';

const JobOrderStatusIcon = ({ data, hideLabel }) => {
    // eslint-disable-next-line default-case
    switch (data) {
        case 'new':
            return (
                <span className="small text-medium-emphasis">
                    <span className="circle-dot" style={{ backgroundColor: 'gray' }} />{' '}
                    {!hideLabel ? 'New' : null}
                </span>
            );
        case 'processing':
            return (
                <span className="small text-medium-emphasis">
                    <span className="circle-dot" style={{ backgroundColor: 'blue' }} />{' '}
                    {!hideLabel ? 'Processing' : null}
                </span>
            );
        case 'ongoing':
            return (
                <span className="small text-medium-emphasis">
                    <span className="circle-dot" style={{ backgroundColor: 'orange' }} />{' '}
                    {!hideLabel ? 'Ongoing' : null}
                </span>
            );
        case 'completed':
            return (
                <span className="small text-medium-emphasis">
                    <span className="circle-dot" style={{ backgroundColor: 'green' }} />{' '}
                    {!hideLabel ? 'Completed' : null}
                </span>
            );
        case 'cancelled':
            return (
                <span className="small text-medium-emphasis">
                    <span className="circle-dot" style={{ backgroundColor: 'red' }} />{' '}
                    {!hideLabel ? 'Cancelled' : null}
                </span>
            );
    }
};

JobOrderStatusIcon.propTypes = {
    data: PropTypes.string,
    hideLabel: PropTypes.bool,
};

JobOrderStatusIcon.defaultProps = {
    data: '',
    hideLabel: false,
};

export default JobOrderStatusIcon;
