import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignupPage from './Pages/User/SignupPage'
import LoginPage from './Pages/User/LoginPage'
import Homepage from './Pages/User/Homepage';
import Sidebar from './Components/Users/Sidebar/Sidebar';
import AdminLogin from './Components/Admin/Login/Login'
import AdminHomePage from './Pages/Admin/AdminHomePage';
import ProfilePage from './Pages/User/ProfilePage';
import { useSelector } from 'react-redux';
import UserProfile from './Components/Users/Profile/UserProfile';
import Chat from './Pages/User/Chat/Chat';
import AdminPostPage from './Pages/Admin/AdminPost';
import AdminReportPage from './Pages/Admin/AdminReportPage';
import Explore from './Pages/User/Explore';
import Password from './Components/Users/Password/Password';
import NotFound from './Components/NotFound';
import ForgotPassword from './Components/Users/Password/ForgotPassword';

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>  
              <Route path='/signup' element={<SignupPage/>}/> 
              <Route path='/' element={<LoginPage/>}/>  
              <Route path='/home' element={<Homepage/>}/>
              <Route path='/profile/:username' element={<ProfilePage/>}/>
              <Route path='/userProfile' element={<UserProfile/>}/> 
              <Route path='/explore' element={<Explore/>}/> 
              <Route path='/chat' element={<Chat/>}/> 
              <Route path='/password' element={<Password/>}/>
              <Route path='/forgot/:id/:token' element={<ForgotPassword/>}/>  
              {/* <Route path='*' element={<NotFound/>}/>   */}
          </Routes>
          <Routes>  
          <Route path='/sidebar' element={<Sidebar/>}/>
              <Route path='/admin-users' element={<AdminHomePage/>}/> 
              <Route path='/admin-posts' element={<AdminPostPage/>}/> 
              <Route path='/admin-login' element={<AdminLogin/>}/>  
              <Route path='/admin-reports' element={<AdminReportPage/>}/>  
              {/* <Route path='*' element={<NotFound/>}/>   */}
          </Routes>
       </Router>
    </div>
  );
}

export default App;
