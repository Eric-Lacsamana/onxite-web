import React, { useEffect } from 'react';
import { CToast, CToastBody, CToastHeader } from '@coreui/react';
import { useDispatch } from 'react-redux';

export const useToast = (header, body) => {
    console.log('quam', header);
    const dispatch = useDispatch();
    // return dispatch({
    //     type: 'ADD_TOAST',
    //     toast: (
    //         <CToast>
    //             <CToastHeader closeButton>
    //                 <svg
    //                     className="rounded me-2"
    //                     width="20"
    //                     height="20"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     preserveAspectRatio="xMidYMid slice"
    //                     focusable="false"
    //                     role="img"
    //                 >
    //                     <rect width="100%" height="100%" fill="#007aff"></rect>
    //                 </svg>
    //                 <strong className="me-auto">{header}</strong>
    //                 <small>7 min ago</small>
    //             </CToastHeader>
    //             <CToastBody>{body}</CToastBody>
    //         </CToast>
    //     ),
    // });
};
