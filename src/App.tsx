import { useWindowSize } from "@app/hooks/useWindowSize";
import { setWindowSize } from "@app/store/reducers/ui";
import { calculateWindowSize } from "@app/utils/helpers";
import ForgetPassword from "@modules/forgot-password/ForgotPassword";
import Login from "@modules/login/Login";
import Main from "@modules/main/Main";
import RecoverPassword from "@modules/recover-password/RecoverPassword";
import Register from "@modules/register/Register";

import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AllocationType from "@app/pages/settings/AllocationType";
import Contengency from "@app/pages/settings/Contengency";
import DeductionDetail from "@app/pages/settings/DeductionDetail";
import ExpenceType from "././pages/settings/ExpenceType";
import FieldType from "././pages/settings/FieldType";
import BudgetShrot from "./pages/BugetShrot";
import KaryakramSanchalan from "./pages/KaryakramSanchalanPrakiya";
import NayaYojana from "./pages/Nayayojana";
import Profile from "./pages/profile/Profile";
import CommitteeDescription from "./pages/report/CommitteeDescription";
import LanduseReport from "./pages/report/LandUseReport";
import PlanDetail from "./pages/report/PlanDetail";
import QuantitativeDetail from "./pages/report/QuantitativeDetail";
import { default as SamitiGathan } from "./pages/SamitiGathan";
import Bank from "./pages/settings/Bank";
import CommitteePosition from "./pages/settings/CommitteePosition";
import EmployeePosition from "./pages/settings/EmployeePosition";
import Employees from "./pages/settings/Employees";
import ExcelUpload from "./pages/settings/ExcelUpload";
import GenderTypes from "./pages/settings/GenderTypes";
import GrantTypes from "./pages/settings/GrantTypes";
import PlanForm from "./pages/settings/PlanForm";
import RegistrationList from "./pages/settings/RegistrationList";
import SubFieldType from "./pages/settings/SubFieldType";
import Terms from "./pages/settings/Terms";
import Units from "./pages/settings/Units";
import Yojana from "./pages/yojana_karyakram";
import YojanaSanchalan from "./pages/YojanaSanchalanPrakiya";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { setAuthentication } from "./store/reducers/auth";
import {
  GoogleProvider,
  getAuthStatus,
  getFacebookLoginStatus,
} from "./utils/oidc-providers";

const { VITE_NODE_ENV } = import.meta.env;

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isAppLoading, setIsAppLoading] = useState(true);

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
        getFacebookLoginStatus(),
        GoogleProvider.getUser(),
        getAuthStatus(),
      ]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
    } catch (error: any) {
      console.log("error", error);
    }
    setIsAppLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  useEffect(() => {
    if (location && location.pathname && VITE_NODE_ENV === "production") {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
      });
    }
  }, [location]);

  if (isAppLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<SamitiGathan />} />
            <Route path="/yojana" element={<Yojana />} />
            <Route path="/nayaYojana" element={<NayaYojana />} />
            <Route path="/yojanaSanchalan" element={<YojanaSanchalan />} />
            <Route path="/bugetShrot" element={<BudgetShrot />} />
            <Route
              path="/karyakramSanchalan"
              element={<KaryakramSanchalan />}
            />
            <Route
              path="/karyakram-sanchalan"
              element={<KaryakramSanchalan />}
            />
            <Route path="/naya-yojana" element={<NayaYojana />} />
            <Route
              path="/committeeDescription"
              element={<CommitteeDescription />}
            />
            <Route path="/landuseReport" element={<LanduseReport />} />
            <Route path="/planForm" element={<PlanForm />} />
            <Route path="/planDetail" element={<PlanDetail />} />
            <Route path="/committeePosition" element={<CommitteePosition />} />
            <Route path="/deductionDetail" element={<DeductionDetail />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/excel" element={<ExcelUpload />} />
            <Route path="/genderTypes" element={<GenderTypes />} />
            <Route path="/registrationList" element={<RegistrationList />} />
            <Route path="/subFieldtype" element={<SubFieldType />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/units" element={<Units />} />
            <Route path="/yojana" element={<Yojana />} />
            <Route path="/yojanaSanchalan" element={<YojanaSanchalan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/expenceType" element={<ExpenceType />} />
            <Route path="/fieldType" element={<FieldType />} />
            <Route path="/contengency" element={<Contengency />} />
            <Route path="/employeePosition" element={<EmployeePosition />} />
            <Route path="/grantType" element={<GrantTypes />} />
            <Route path="/allocationType" element={<AllocationType />} />
            <Route
              path="/quantitativeDetail"
              element={<QuantitativeDetail />}
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
};

export default App;
