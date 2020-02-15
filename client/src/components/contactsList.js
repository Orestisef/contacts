//class that shows all contacts
import React, { Component } from 'react';
import Contact from './contact'
import axios from 'axios';

class ContactsList extends Component {

  constructor(props) {
      super(props);
      this.state = {
        contacts: []
      };
  }
  //Component Lifecycle methods
  //request server and retrive a list of contacts (mount and update an instance)
  componentDidMount() {
    axios.get('http://localhost:5000/contacts/')
         .then(res => {
           this.setState({
             contacts: res.data
           })
         })
          .catch((err)=>{
            console.log(err);
         })
  }

  componentDidUpdate() {
    axios.get('http://localhost:5000/contacts/')
         .then(res => {
           this.setState({
             contacts: res.data
           })
         })
          .catch((err)=>{
            console.log(err);
         })
  }

  contactList() {
    //create contact items from the data.
    return this.state.contacts.map((currentContact, index)=>{
      return <Contact contact={ currentContact } key={index} />
    });
  }


  render() {
    return (
      <div>

        <table className="table" style={{ marginTop: 40 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number/s</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.contactList() }
          </tbody>
        </table>
      </div>
      )
    }
  }


export default ContactsList;
