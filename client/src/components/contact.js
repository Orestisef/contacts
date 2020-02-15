//this class represents the item in the contactList
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//confirmAlert and the next css is about alert message when user delete a contact
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


class Contact extends Component {

  constructor(props) {
      super(props);
      this.delete = this.delete.bind(this);


  }
  //when the user deletes a contact show an alert message
  delete(){
    confirmAlert({
     title: 'Delete Contact',
     message: 'Are you sure you want to delete this contact?',
     buttons: [
       {
         label: 'Yes',
         onClick: () => {
           axios.get('http://localhost:5000/contacts/delete/'+this.props.contact._id)
               .then(console.log('Deleted'))
               .catch(err => console.log(err));
         }
       },
       {
         label: 'No',
         onClick: () => {}
       }
     ]
    })

    }

  render() {
    //for loop to return array items from contact_email array
    const items= []
    for (const [index, value] of this.props.contact.contact_phone.entries()) {
      items.push(<li key={index}>{value}</li>)
    }
    return (
      <tr>
        <td>{this.props.contact.contact_name}</td>
        <td>{this.props.contact.contact_email}</td>
        <td>{this.props.contact.contact_address}</td>
        <td>{items}</td>
        <td>
          <Link to={"/edit/"+ this.props.contact._id}><button className="btn btn-outline-info btn-sm"> Edit </button></Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-outline-danger btn-sm right">Delete</button>
        </td>
      </tr>
    )
  }
}

export default Contact;
