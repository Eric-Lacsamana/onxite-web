import React, { useRef, useState } from 'react';
import { CButton, CCard, CCardBody } from '@coreui/react';
import ReactToPrint from 'react-to-print';
import PropTypes from 'prop-types';

const Print = ({ children }) => {
    const componentRef = useRef();

    return (
        <div>
            <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            />
            <div className="print" ref={componentRef}>
                {children}
            </div>
        </div>
    );
};
export default Print;

Print.propTypes = {
    children: PropTypes.node,
};
Print.defaultProps = {
    children: null,
};
