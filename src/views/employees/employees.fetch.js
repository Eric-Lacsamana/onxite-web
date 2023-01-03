import { ENDPOINTS } from 'src/constants/api';
import { thenCallbackRQ } from 'src/utils/helpers';
import api from 'src/utils/api';

export const getEmployees = async (params) => {
    const result = await api.get(ENDPOINTS.EMPLOYEES, { params }).then(thenCallbackRQ);
    return result;
};
