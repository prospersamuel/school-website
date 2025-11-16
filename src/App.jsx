import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import VerifyEmailPage from "./pages/Login/VerifyEmailPage";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/Notfound";
import LoginPage from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import CoursesTab from "./pages/Dashboard/tabs/CoursesTab";
import ProfileTab from "./pages/Dashboard/tabs/ProfileTab";
import OverviewTab from "./pages/Dashboard/tabs/OverviewTab";

function AppContent() {

  return (
    <>
      <Toaster reverseOrder={false} position="bottom-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} >
        <Route path="profile" element={<ProfileTab/>} />
        <Route path="overview" element={<OverviewTab/>} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
