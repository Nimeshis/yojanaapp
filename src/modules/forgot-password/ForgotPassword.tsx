import { setWindowClass } from '@app/utils/helpers';
import { Image } from '@profabric/react-components';
import { useFormik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from "styled-components";
import * as Yup from 'yup';


const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: 4px 6px 5px;
  // opacity: 0.8;
  // --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    // 0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const ForgotPassword = () => {
  const [t] = useTranslation();

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      toast.warn('Not yet functional');
      console.log('values', values);
    },
  });

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
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
      <span className="h3 font-weight-bold ">योजना/कार्यक्रम व्यस्थापन </span>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('आफ्नु इमेल हालेर सजिलै नयाँ पास्स्वोर्ड पाउनुहोस्')}</p>
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
            <div className="row">
              <div className="col-md-12 ">
              <button
                  className="btn-success"
                  onClick={handleSubmit as any}
                  style={{
                    borderRadius: "50px",
                    padding: "8px 8px",
                    // marginLeft: "23px",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {t("नयाँ पास्स्वोर्ड पाउनुहोस्")}
                </button>              </div>
            </div>
          </form>
          <p className="mt-3 mb-1">
            <Link to="/login">{t('लग-इन पेजमा जानुहोस')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
