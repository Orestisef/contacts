//class that lets the user to create a new contact.
//in order to create a new contact this class communicates with the data of your server.
//When a new contact is created immediately calls the "/" route and as a result contacts list
//is updated.
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const emailRegex = RegExp( /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+).*$/ );
const phoneRegex = RegExp(/^[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);

const initialState = {
  contact_name: '',
  contact_email: '',
  contact_phone:[],
  contact_nameError: '',
  contact_emailError: '',
  contact_phoneError: ''
}

class CreateContact extends Component {
  constructor(props) {
    super(props);

    //lexical bind  of this keyword.
    this.onChangeContactName = this.onChangeContactName.bind(this);
    this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
    this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
    this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = initialState;
  }

  onChangeContactName(e) {
    this.setState({
       contact_name: e.target.value
    });
  }

  onChangeContactEmail(e) {
    this.setState({
       contact_email: e.target.value
    });
  }

  onChangeContactAddress(e) {
    this.setState({
       contact_address: e.target.value
    });
  }

  onChangeContactPhone(e, index) {
    this.state.contact_phone[index] = e.target.value;
    //set the changed state..
    this.setState({
       contact_phone: this.state.contact_phone
    });
    console.log(this.state.contact_phone)
  }

  //simple validation methode for name-email-phone
  validate = () => {
    let contact_nameError='';
    let contact_emailError= '';
    let contact_phoneError= '';

    //check if this fields are blank and min max input
    if ( (!this.state.contact_name) || (this.state.contact_name.length < 3)) {
      contact_nameError = '*minimum 3 characters required';
    }

    if ( (!this.state.contact_email) || (!emailRegex.test(this.state.contact_email))) {
      contact_emailError = '*invalid email address';
    }

    if  ((this.state.contact_phone.length === 0))  {
      contact_phoneError = '*must put a phone number';
    }

    //check the eatch phone from the phone array
    for (const [index, value] of this.state.contact_phone.entries()) {
      console.log(value)
      console.log(this.state.contact_phoneError)
      if ( (!(value.length === 10) || !phoneRegex.test(value))) {
        contact_phoneError = '*invalid phone-s. Must include 10 digits eatch.';
      }
    }
    //setState the errors
    this.setState({contact_nameError, contact_emailError, contact_phoneError});
    if (contact_nameError || contact_emailError || contact_phoneError) {
      return false;
    }
    //validation ok
    return true;
    };

   onSubmit(e) {
    //prevent defaulte behavior of the browser
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      //create new contact object
      const newContact = {
          contact_name: this.state.contact_name,
          contact_email: this.state.contact_email,
          contact_address: this.state.contact_address,
          contact_phone: this.state.contact_phone,
          contact_nameError: this.state.contact_nameError,
          contact_emailError: this.state.contact_emailError,
          contact_phoneError: this.state.contact_phoneError
       };

       //post call with new object
       axios.post('http://localhost:5000/contacts/add', newContact)
            .then(res => console.log(res.data));

       this.props.history.push('/');

       //set initial state
       this.setState(initialState);
      }
    }
    // add phones to an array
    addPhone(e) {
      e.preventDefault();

      this.setState({contact_phone: [...this.state.contact_phone,'']})
    }
    //remove the item at the index
    handleRemove(index) {
      //prevent defaulte behavior of the browser
      index.preventDefault();
      //delete phone input number field
      this.state.contact_phone.splice(-1)

      this.setState({contact_phone: this.state.contact_phone})
    }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3 style={{textAlign: 'center'}} >Create a New Conatct</h3>
        <form onSubmit={ this.onSubmit }>

          <div className="row">
            <div className="form-group col">
              <label>* Full Name: </label>
              <input type="text"
                    className="form-control"
                    value={this.state.contact_name}
                    onChange={this.onChangeContactName}
                    />
              {/*//screen errors*/}
              <div style={{ color: "red" }}>
                {this.state.contact_nameError}
              </div>
            </div>


            <div className="form-group col">
              <label>* Email Address: </label>
              <input type="text"
                    className="form-control"
                    value={this.state.contact_email}
                    onChange={this.onChangeContactEmail}
                    />
              {/*//screen errors*/}
              <div style={{ color: "red" }}>
                {this.state.contact_emailError}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col">
              <label>Street Address: </label>
              <input type="text"
                    className="form-control"
                    value={this.state.contact_address}
                    onChange={this.onChangeContactAddress}
                    />
            </div>


            <div className="form-group col">
              <label>*Phone Number: </label>
              {
                this.state.contact_phone.map((phone, index) => {
                  return (
                    <div  key={index}>
                    <input type="text"
                          className="form-control"
                          value={phone}
                          onChange={(e)=>this.onChangeContactPhone(e, index)}
                          />
                    </div>
                    )
                  })
              }
              {/*//screen errors*/}
              <div style={{ color: "red" }}>
                {this.state.contact_phoneError}
              </div>

              <button style={{ marginRight: '10px', marginTop: '10px', textAlign: 'right' }} className="btn btn-outline-success btn-sm" onClick={(e) =>this.addPhone(e)}>Add Phone</button>
              <button style={{ marginTop: '10px'}} className="btn btn-outline-danger btn-sm" onClick={(index) =>this.handleRemove(index)}>Delete</button>
            </div>
          </div>

          <p style={{ color: "red", position: "absolute",right: '20%' }}>*required fields</p>
          <div className="form-group">
          <input type="submit" value="Create Contact" className="btn btn-primary" />
          </div>
      </form>
        {/*//back to home*/}
        <div className="form-group">
          <Link to={"/"}><button onclick="/" className="btn btn-warning btn-sm">back</button></Link>
        </div>

      </div>

      )
    }
  }


export default CreateContact;
