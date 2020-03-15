import React from 'react';
import './App.css';
import '../node_modules/antd/dist/antd.min.css';
import './styles/index.scss';
import NavBar from './components/NavBar/NavBar';
import Layout from './components/Layout/Layout';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Landing from './pages/Landing/Landing'

function App() {
  return(
    <Router>
      <div className="App">
        <NavBar/>
        <Layout>
          <Route exact path="/" component={Landing}/>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
