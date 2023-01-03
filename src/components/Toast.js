import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react';
import { get } from 'lodash';

const Toast = () => {
    const toaster = useRef();
    const dispatch = useDispatch();
    const toast = useSelector(
        (state) =>
            state.toast && (
                <CToast>
                    <CToastHeader closeButton>
                        <svg
                            className="rounded me-2"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                            role="img"
                        >
                            <rect width="100%" height="100%" fill="#4BB543"></rect>
                        </svg>
                        <strong className="me-auto">{get(state, 'toast.header')}</strong>
                        <small>7 min ago</small>
                    </CToastHeader>
                    <CToastBody>{get(state, 'toast.body')}</CToastBody>
                </CToast>
            ),
    );

    useEffect(() => {
        if (toast) {
            setTimeout(() => {
                dispatch({ type: 'REMOVE_TOAST', toast: 0 });
            }, 100);
        }
    }, [dispatch, toast]);

    return <CToaster ref={toaster} push={toast} placement="bottom-end" />;
};

export default React.memo(Toast);
