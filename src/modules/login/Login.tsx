import { setWindowClass } from "@app/utils/helpers";
import { Checkbox } from "@profabric/react-components";
import { setAuthentication } from "@store/reducers/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { authLogin } from "@app/utils/oidc-providers";
import { Image } from "@profabric/react-components";
import { Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: 4px 6px 5px;
  // opacity: 0.8;
  // --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
  // 0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const response = await authLogin(email, password);
      dispatch(setAuthentication(response as any));
      toast.success("लग-इन भयो!");
      setAuthLoading(false);

      navigate("/");
    } catch (error: any) {
      setAuthLoading(false);
      toast.error(error.message || "केहि समस्या भयो");
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("इमेल मिलेन").required("Required"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .max(30, "Must be 30 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  setWindowClass("hold-transition login-page");

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
          <span className="h3 font-weight-bold ">
            योजना/कार्यक्रम व्यस्थापन{" "}
          </span>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t("आफ्नो विवरण हाल्नुहोस्")}</p>
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
                  placeholder="पस्स्वोर्ड हाल्नुहोस्"
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

            <div className="row">
              <div className="col-8">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox checked={false} />
                  <label
                    style={{ marginTop: 5, padding: 0, paddingLeft: "4px" }}
                  >
                    {t("सम्झिनुहोस्")}
                  </label>
                </div>
              </div>
              <div className="col-4">
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
                  {t("साइन इन")}
                </button>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <Link to="/forgot-password">{t("विवरण बिर्शिनुभायो?")}</Link>
          </p>
          <p className="mb-0">
            <Link to="/register" className="text-center">
              {t("नया विवरण बनाउनुहोस्")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
