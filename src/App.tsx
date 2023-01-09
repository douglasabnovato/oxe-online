import React from 'react';

import AppBar from "./components/AppBar"
import Banner from "./components/Banner"
import ListEnterprises from './components/ListEnterprises';

import './styles/App.css';

function App() {
  return (
    <div>
      <AppBar />
      <Banner />
      <ListEnterprises />
    </div>
  );
}

export default App;
