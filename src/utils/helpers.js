import numeral from 'numeral';
import moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from 'src/constants/formats';

export const currencyFormat = (value) => `P ${numeral(value).format('0,0.00')}`;

export const formatDate = (date) => moment(date).format(DATE_FORMAT);

export const formatTime = (date) => moment(date).format(TIME_FORMAT);

export const buildLocalAddress = (address) => {
    if (!address) return null;

    return `${address.line1 || ''} ${address.line2 || ''} ${address.brgy || ''} ${
        address.city || ''
    }`;
};

export const getFieldError = (err) => {
    const { data: responseData } = err.response;
    const { data: apiResponse } = responseData;

    if (Array.isArray(apiResponse) && apiResponse.length) {
        const { messages } = apiResponse[0];
        if (Array.isArray(messages) && messages.length) {
            const { field, message } = messages[0];

            if (!field) return { message };

            return {
                field: field[0],
                message,
            };
        }
    } else if (apiResponse) {
        const apiErrorKeys = Object.keys(apiResponse);

        if (apiErrorKeys.length) {
            const errorKey = apiErrorKeys[0];
            const errorMessage = apiResponse[errorKey];

            return {
                field: errorKey,
                message: errorMessage,
            };
        }
        return null;
    }
    return null;
};

export const getApiError = (errorResponse) => {
    if (
        typeof errorResponse === 'object' &&
        errorResponse.data &&
        Array.isArray(errorResponse.data) &&
        errorResponse.data.length > 0
    ) {
        const field = errorResponse.data[0].messages[0].field[0];
        const { message } = errorResponse.data[0].messages[0];
        return {
            field,
            message,
        };
    }
    if (
        typeof errorResponse === 'object' &&
        errorResponse.data &&
        typeof errorResponse.data === 'object'
    ) {
        const { data: errorData } = errorResponse;
        const errorKeys = Object.keys(errorData);

        if (errorKeys.length === 1 && errorKeys[0] === 'statusCode') {
            return {
                message: 'Something went wrong, if issue persists, contact support',
            };
        }

        Object.keys(errorData).forEach((key) => {
            return {
                field: key,
                message: errorResponse.data[key],
            };
        });
    } else if (typeof errorResponse === 'object' && errorResponse.error && errorResponse.message) {
        return {
            message: errorResponse.message,
        };
    }

    return { message: 'Error: Something went wrong' };
};

export const getErrorMessage = (err) => {
    const { data: responseData } = err.response;
    if (responseData) {
        return `${responseData.error}: ${responseData.message}`;
    }
    return 'Error: Something went wrong';
};

export const mapOptions = (valueKey, labelKey) => {
    return (option) => ({
        label: option[labelKey],
        value: option[valueKey],
        ...option,
    });
};

export const getNextPageParams = (count) => (lastPage, pages) => {
    const allItems = pages?.flat() || [];
    if (allItems?.length === count) {
        return undefined;
    }

    return pages.length;
};

export const thenCallbackRQ = ({ data: { data } }) => data;

export const getInvalid = (key, errors, touched) => errors[key] && touched[key];

export const getError = (key, errors, touched) => touched[key] && errors[key];

export const capitalizedWords = (string) => {
    const arrString = string.split(' ');
    for (var i = 0; i < arrString.length; i++) {
        arrString[i] = arrString[i].charAt(0).toUpperCase() + arrString[i].slice(1);
    }
    return arrString.join(' ');
};
