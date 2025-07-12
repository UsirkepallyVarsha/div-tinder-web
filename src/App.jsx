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
import Chat from './components/chat.jsx'
import ContactPage from './components/ContactPage.jsx';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>

        <Routes>
        
          <Route path="" element={<Body />}>
            <Route path="/chat" element={<Chat/>}/>
          <Route path="/feed" element={<Feed/>}/>
            <Route path="" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
             <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests/>} />
              <Route path="/contact" element={<ContactPage/>}/>
              <Route path="/chat/:targetUserid" element={<Chat/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
