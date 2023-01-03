import React from 'react';
import { CFooter } from '@coreui/react';

const AppFooter = () => {
    return (
        <CFooter>
            <div>
                <a
                    href="https://www.facebook.com/OnXite-Automotive-103975652469460/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    OnXite
                </a>
                <span className="ms-1">&copy; 2022.</span>
            </div>
            <div className="ms-auto">
                <span className="me-1">Powered by</span>
                <a
                    href="https://www.facebook.com/X89111189"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    X Industries
                </a>
            </div>
        </CFooter>
    );
};

export default React.memo(AppFooter);
