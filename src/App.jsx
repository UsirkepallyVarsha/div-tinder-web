import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/navbar.jsx';
import Login from './components/Login.jsx';
import Profile from './components/profile.jsx';
import Body from './components/Body.jsx';
import appStore from './utils/appStore.js';
import Feed from './components/Feed.jsx';
import Connections from './components/Connections.jsx';
import Requests from './components/Requests.jsx';


function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="feed" element={<Feed/>}/>
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
             <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
