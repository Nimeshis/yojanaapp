import { setWindowClass } from '@app/utils/helpers';
import { Checkbox } from '@profabric/react-components';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { setAuthentication } from '@app/store/reducers/auth';
import { authLogin } from '@app/utils/oidc-providers';
import { Image } from "@profabric/react-components";
import styled from "styled-components";

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: 4px 6px 5px;
  // opacity: 0.8;
  // --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
  // 0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const Register = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const register = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const response = await authLogin(email, password);
      dispatch(setAuthentication(response as any));
      toast.success('Registration is success');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed');
      setAuthLoading(false);
    }
  };

  const registerByGoogle = async () => {
    try {
      setGoogleAuthLoading(true);
      // const response = await GoogleProvider.signinPopup();
      // dispatch(setAuthentication(response as any));
      // setGoogleAuthLoading(false);
      // toast.success('Authentication is succeed!');
      // navigate('/');
      throw new Error('Not implemented');
    } catch (error: any) {
      toast.error(error.message || 'Failed');
      setGoogleAuthLoading(false);
    }
  };

  const registerByFacebook = async () => {
    try {
      setFacebookAuthLoading(true);
      // const response = await facebookLogin();
      // dispatch(setAuthentication(response as any));
      // setFacebookAuthLoading(false);
      // navigate('/');
      throw new Error('Not implemented');
    } catch (error: any) {
      setFacebookAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordRetype: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      passwordRetype: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      register(values.email, values.password);
    },
  });

  setWindowClass('hold-transition register-page');

  return (
    <div className="register-box">
      <div className="card card-outline card-success">
        <div className="card-header text-center">
        <Link to="/" className="brand-link">
            <StyledBrandImage
              src="./src/assets/nepallogo.png"
              alt="Nepal Sarkar Logo"
              width={50}
              height={50}
              rounded
            />
          </Link>
          <span className="h3 font-weight-bold ">
            योजना/कार्यक्रम व्यस्थापन{" "}
          </span>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('नयाँ विवरण दर्ता गर्नुहोस्')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="इमेल हाल्नुहोस्"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="पास्स्वोर्ड हाल्नुहोस्"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="passwordRetype"
                  name="passwordRetype"
                  type="password"
                  placeholder="पुन पास्वोर्ड हाल्नुहोस्"
                  onChange={handleChange}
                  value={values.passwordRetype}
                  isValid={touched.passwordRetype && !errors.passwordRetype}
                  isInvalid={touched.passwordRetype && !!errors.passwordRetype}
                />

                {touched.passwordRetype && errors.passwordRetype ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordRetype}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-7">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox checked={false} />
                  <label style={{ margin: 0, padding: 0, paddingLeft: '4px' }}>
                    <span>मलाई यो <Link to="/">सर्तहरु</Link>{' '} मंजुर छ </span>
                    
                  </label>
                </div>
              </div>
              <div className="col-5">
              <button
                  className="btn-success"
                  onClick={handleSubmit as any}
                  style={{
                    borderRadius: "50px",
                    padding: "8px 8px",
                    marginLeft: "23px",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {t("दर्ता गर्नुहोस")}
                </button>
              </div>
            </div>
          </form>
          
          <Link to="/login" className="text-center">
            {t('म संघ विवरण छ')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
