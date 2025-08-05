import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import FootSection from './common_view/components/footer.jsx';
import Header from './common_view/components/Logo _title.jsx';

import Dashboard from "./PatientView/Components/pa_dashboard.jsx";
import Dashboard_2 from "./staff_view/components/st_dashboard.jsx";
import Dashboard_3 from "./Admin_view/components/ad_dashboard.jsx";
import Dashboard_4 from "./Doctor_view/components/doc_dashboard.jsx";

import Login from './common_view/pages/login.jsx';
import Register from './PatientView/pages/Register.jsx';
import Home from './common_view/pages/home.jsx';
import AboutUs from './common_view/pages/about_us.jsx';
import UploadResult from './staff_view/pages/add_results.jsx';
import DoctorAppointment from './PatientView/pages/channel_doc.jsx';
import TestBooking from './PatientView/pages/schedule_test.jsx';
import RemovePanel from './Admin_view/pages/Removings.jsx';
import AnnouncementTable from './common_view/pages/announcements.jsx';
import AnnouncementPage from './staff_view/pages/update_annou.jsx';
import PaymentResultReport from './Admin_view/pages/Histo_report.jsx';
import DoctorSlotsPage from './Doctor_view/pages/appoin_for_me.jsx';
import PatientAppointmentsPage from './PatientView/pages/my_bookings.jsx';
import PaymentsPage from './staff_view/pages/payments.jsx';
import PaymentBill from './staff_view/pages/bill.jsx';
import AddAdminForm from './Admin_view/pages/add-admin.jsx';
import AddStaffForm from './Admin_view/pages/add-staff.jsx';
import AddTestForm from './Admin_view/pages/add-test.jsx';
import Doctorform from './Admin_view/pages/add-doctor.jsx';
import Addings from './Admin_view/pages/addings.jsx';
import SearchDoctors from './common_view/pages/search_doctor.jsx';
import SearchTests from './common_view/pages/search_test.jsx';
import PrivacyPolicy from './common_view/pages/privacy_policy.jsx';
import TermsAndConditions from './common_view/pages/terms_con.jsx';
import Frontpage from './common_view/pages/Frontpage.jsx';
import Front_nav from './common_view/components/front_navbar.jsx';
import Front from './common_view/components/front.jsx';
import handleLogout from './common_view/pages/logout.jsx';
import Nav_bar_1 from './Admin_view/components/ad_nav_bar.jsx';
import Logout from './common_view/pages/logout.jsx';
function App() {
  console.log('App loaded');

  return (
   <>
      
    

    <Router>

      <Routes>
        <Route path='/' element={<Front />} />
  <Route path='/' element={<Home />} />
  <Route path='/home' element={<Home />} />
  <Route path='/aboutus' element={<AboutUs />} />
  <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />
  <Route path='/dashboard' element={<Dashboard />} />
  <Route path='/add-staff' element={<AddStaffForm />} />
  <Route path='/add-test' element={<AddTestForm />} />
  <Route path='/add-doctor' element={<Doctorform />} />
  <Route path='/add-admin' element={<AddAdminForm />} />
  <Route path='/search-doctors' element={<SearchDoctors />} />
  <Route path='/search-tests' element={<SearchTests />} />
  <Route path='/announcements' element={<AnnouncementTable />} />
  <Route path='/addings' element={<Addings />} />
  <Route path='/reports' element={<PaymentResultReport />} />
  <Route path='/removings' element={<RemovePanel />} />
  <Route path='/privacy' element={<PrivacyPolicy />} />
  <Route path='/searchDoc' element={<SearchDoctors />} />
  <Route path='/searchTest' element={<SearchTests />} />
  <Route path='/termsCon' element={<TermsAndConditions />} />
  <Route path='/appointForDoc' element={<DoctorSlotsPage />} />
  <Route path='/channelDoc' element={<DoctorAppointment />} />
  <Route path='/testBook' element={<TestBooking />} />
  <Route path='/MyBooking' element={<PatientAppointmentsPage />} />
  <Route path='/results' element={<UploadResult />} />
  <Route path='/payBill' element={<PaymentBill />} />
  <Route path='/addpay' element={<PaymentsPage />} />
  <Route path='/addAnnoucement' element={<AnnouncementPage />} />
  <Route path='/Frontpage' element={<Frontpage/>}/>
  <Route path='/logout'element={<Logout/>}/>
</Routes>

     
    </Router>
    </>
  );
}

export default App;
