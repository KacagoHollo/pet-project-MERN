import './App.css';

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';

import Home from './pages/Home';
// import About from './pages/About';
import Profile from './pages/Profile';
import Organization from './pages/Organization';
import Callback from './pages/Callback';
import Protected from './components/Protected';
import Register from './pages/Register';
import Update from './pages/Update';
import UpdateOrg from './pages/UpdateOrg';


function App() {

  return (
    <div className="App">
    
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/about' element={<About />} /> */}
          <Route path='/profile' element={(
            <Protected> 
              <Profile />
            </Protected>
          )}/>
          <Route path='/update' element={(
            <Protected> 
              <Update />
            </Protected>
          )}/>
          <Route path='/organization' element={
          (
            <Protected> 
              <Organization />
            </Protected>
          )
          }/>
          <Route path='/organization/update' element={
          (
            <Protected> 
              <UpdateOrg />
            </Protected>
          )
          }/>
          <Route path='/callback/:provider' element={<Callback />} />
          <Route path='/register' element={
            <Protected>
              <Register />
            </Protected>
          } />
        </Routes>
    </div>
  );
}

export default App;
