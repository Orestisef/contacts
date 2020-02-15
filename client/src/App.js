import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateContact from './components/createContact';
import EditContact from './components/editContact';
import Contacts from './components/contactsList';




function App() {
  return (
    <Router>
      <div className="container">
        {/*header*/}
        <nav style={{ marginTop: '20px'}} className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <Link to="/" className="navbar-brand" style={{fontFamily: 'Alfa Slab One'}}>Contacts</Link>
          <div className="navbar-collapse">
            <div className="navbar-nav ml-auto nav-item active">
              <Link to="/create" className="nav-item nav-link">Add Contact<i class="material-icons">group_add</i></Link>
            </div>
          </div>
        </nav>
        
        <Route path="/" exact component={ Contacts } />
        <Route path="/edit/:id" component={ EditContact } />
        <Route path="/create" component={ CreateContact} />
      </div>
    </Router>
  );
}

export default App;
