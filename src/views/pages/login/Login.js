import React, { useEffect, useState } from 'react';
import { Route, useNavigate, Link, Navigate } from 'react-router-dom';

import {
    CAlert,
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { get } from 'lodash';
import { postLogin } from './login.fetch';

const Login = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem('auth')),
        'isLoggedIn',
    );
    const [error, setError] = useState(null);

    const {
        register,
        watch,
        control,
        getValues,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const { mutate: mutateLogin, isLoading } = useMutation(postLogin, {
        onSuccess: (data) => {
            setIsLoggedIn(true);
            // console.log('succs', data);
            // return navigate('/dashboard');
        },
        onError: (err) => {
            const { error } = get(err, 'response.data');

            setError(error);
        },
    });

    const onSubmit = (data, e) => mutateLogin(getValues());
    const onError = () => console.log('TMD', {});

    // const handleLogin = () => {
    //     setError(null);
    //     mutateLogin(getValues());
    // };

    if (isLoggedIn) {
        return <Navigate replace to="/dashboard" />;
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm
                                        id="login-form-hook"
                                        onSubmit={handleSubmit(onSubmit, onError)}
                                    >
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">
                                            Sign In to your account
                                        </p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete="off"
                                                id="identifier"
                                                {...register('identifier', {
                                                    // required: true,
                                                    // valueAsDate: true,
                                                })}
                                                name="identifier"
                                                aria-label="Username"
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="off"
                                                id="password"
                                                {...register('password', {
                                                    // required: true,
                                                    // valueAsDate: true,
                                                })}
                                                name="password"
                                                aria-label="Password"
                                                onEnter
                                            />
                                        </CInputGroup>
                                        {error && (
                                            <CRow>
                                                <CAlert color="danger" align="center">
                                                    {error.message}
                                                </CAlert>
                                            </CRow>
                                        )}
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    disabled={isLoading}
                                                    type="submit"
                                                    form="login-form-hook"
                                                    color="dark"
                                                    className="px-4"
                                                >
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                {/* <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton> */}
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard
                                className="text-white  py-5"
                                style={{ width: '44%', backgroundColor: 'black' }}
                            >
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>OnXite</h2>
                                        <p>Your one stop automotive shop.</p>
                                        <Link to="/register">
                                            <CButton
                                                // style={{
                                                //     backgroundColor: 'whitesmoke',
                                                //     color: 'black',
                                                // }}
                                                color="success"
                                                className="mt-3"
                                                active
                                                tabIndex={-1}
                                            >
                                                Inquire Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Login;
