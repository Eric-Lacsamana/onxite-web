import { CFormSelect } from '@coreui/react';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
const JobOrderStatusDropdown = ({ onChange, value }) => {
    return (
        <CFormSelect
            aria-label="Default select example"
            onChange={(e) => onChange(e.target.value)}
            options={[
                { label: 'Job Request', value: 'new' },
                { label: 'Processing', value: 'processing' },
                { label: 'Ongoing', value: 'ongoing' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' },
                { label: 'Rejected', value: 'rejected' },
            ]}
            value={value}
        />
    );
};

JobOrderStatusDropdown.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.object,
    // readOnly: PropTypes.bool,
    // type: PropTypes.string,
    // children: PropTypes.node,
};

JobOrderStatusDropdown.defaultProps = {
    value: null,
    onClose: () => {},
};

export default JobOrderStatusDropdown;
