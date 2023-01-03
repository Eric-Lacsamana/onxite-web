import api, { attachToken, detachToken } from '../../../utils/api';

export const postLogin = async (payload) => {
    detachToken();

    const { user, jwt } = await api.post('/auth/local', payload).then(({ data }) => data);

    attachToken(jwt);

    const userData = await api.get('/users/me').then(({ data }) => data);

    localStorage.setItem(
        'auth',
        JSON.stringify({
            jwt,
            user: {
                ...user,
                ...userData,
            },
            isLoggedIn: true,
        }),
    );
};
