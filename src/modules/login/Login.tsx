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

import { Button } from "@app/styles/common";
import { authLogin } from "@app/utils/oidc-providers";
import { Form, InputGroup } from "react-bootstrap";

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
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>योजना/कार्यक्रम वेवस्थापन</b>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t("आफ्नो विवरण हल्नुहोस")}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
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
                  placeholder="Password"
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
                  <label style={{ margin: 0, padding: 0, paddingLeft: "4px" }}>
                    {t("सम्झिनुहोस")}
                  </label>
                </div>
              </div>
              <div className="col-4">
                <Button
                  loading={isAuthLoading}
                  onClick={handleSubmit as any}
                >
                  {t("साइन इन")}
                </Button>
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
