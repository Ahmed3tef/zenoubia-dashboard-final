import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { UploadCountry, UploadGovernment } from './components';

import Sidebar from './components/Sidebar/Sidebar';
import UploadColor from './components/UploadForm/UploadColor';
import UploadSize from './components/UploadForm/UploadSize';
import {
  Login,
  Home,
  SubCategories,
  Products,
  Reports,
  Orders,
  Profile,
  Reviews,
  Contact,
  Countries,
  Governments,
  Cities,
} from './pages';

import Layout from './pages/Layout';
import { logout, tryLogin } from './store/reducers/auth';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(
    location.pathname.replace('/', '')
  );

  const token = useSelector((state) => state.auth.token);
  const expiresInMillis = useSelector((state) => state.auth.expiresInMillis);

  useEffect(() => {
    dispatch(tryLogin());
  }, []);

  useEffect(() => {
    if (expiresInMillis < 0) {
      dispatch(logout());
      navigate('/login');
    }
  }, [expiresInMillis]);

  return (
    <>
      {token && (
        <Layout className="bg-white min-vw-100 min-vh-100">
          <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <main className="p-5 main">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />

              <Route path="/subcategories" element={<SubCategories />} />
              <Route path="/products" element={<Products />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/sizes" element={<UploadSize />} />
              <Route path="/colors" element={<UploadColor />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/countries" element={<Countries />}>
                <Route path="upload-edit" element={<UploadCountry />} />
              </Route>
              <Route path="/governments" element={<Governments />}>
                <Route path="upload-edit" element={<UploadGovernment />} />
              </Route>
              <Route path="/cities" element={<Cities />}>
                <Route path="upload-edit" element={<UploadCountry />} />
              </Route>
            </Routes>
           
          </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
          />
        </Layout>
      )}
      {!token && <Login />}
    </>
  );
};

export default App;
