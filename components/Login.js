import React, { Component } from "react";
import { Form, Button,Row ,Col} from "react-bootstrap";

import { Link } from "react-router-dom";
import ForgetUserId from "./ForgetUserId";
import ForgetPassword from "./ForgotPassword";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      showForgetUserIdShow: false,
      showForgetPasswordShow: false,
      errors:{}
    };
  }
  handleValidations = () =>{
    let errors = {};
    let formIsValid = true;
    
    if (typeof this.state.email !== "undefined") {
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
          }    
    }
    if (typeof this.state.pass !== "undefined") {
      if (!this.state.pass) {
          formIsValid = false;
          errors["pass"] = "Cannot be empty";
        }    
  }
    this.setState({errors:errors});
    return formIsValid;  
  }
  resetForm = () => {
    this.setState({
      email: "",
      pass: "",
      showForgetUserIdShow: false,
      showForgetPasswordShow: false,
      errors:{}
    })
 }

  buttonClick = async (e) => {
    e.preventDefault();
    if(this.handleValidations())
    {
      let obj = {
        id: 0,
  firstName: "string",
  lastName: "string",
  dob: "2022-05-13T04:50:44.168Z",
  contact: "string",
  gender: "string",
  usertype: "string",
  username: this.state.email,
  pass: this.state.pass,
  que1: "string",
  que2: "string",
  que3: "string"

      }
      const data = await fetch("http://localhost:5177/api/Token",
      {
      method:"POST",
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
      })
      .then(res=>res.json())
      .then(result=>result);
      if(data==="Invalid credentials"){
        this.resetForm();
        this.setState({errors:{pass:"Enter valid password or username"}})
      }
      else{
        sessionStorage.setItem("token",data[0])
        sessionStorage.setItem("id",data[1])
        sessionStorage.setItem("userType",data[2])
        sessionStorage.setItem("name",data[3])
        if(data[2]==="Student")
          window.location = "./studentdashboard"
          if(data[2]==="Admin")
          window.location = "./admindashboard"
          if(data[2]==="Tutor")
          window.location = "./tutordashboard"
      }

    }
  };
  render() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("name");

    let showModelClose =()=>this.setState({showForgetUserIdShow:false});
    let showPassModelClose =()=>this.setState({showForgetPasswordShow:false});

    return (
      <Form className="m-auto mt-5" style={{ width: "25%" }}>
        <h2 className="text-center text-white mb-4" style={{width:"100%"}}>Login Page</h2>
        
        <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
          <Form.Label className="text-white">Username</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Username"
            value={this.state.email}
            name="email"
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

        </Form.Group>

        <Form.Group className="mb-3 col-12" controlId="formBasicPassword">
          <Form.Label  className="text-white">Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            value={this.state.pass}
            name="pass"
            onChange={(e) => {
              this.setState({ pass: e.target.value });
            }}
          />
          <span style={{ color: "red" }}>{this.state.errors["pass"]}</span>
        </Form.Group>
        <div className="row m-2">
          <Button
            className="col-4 border text-white btn btn-primary"
            variant="outline"
            type="submit"
            onClick={this.buttonClick}
          >
            Login
          </Button>
          <div className="col-4"></div>
          <Button className="col-4 ml-5 border text-white btn btn-primary" variant="outline" type="reset" onClick={(e)=>this.resetForm()} >
            Reset
          </Button>
        </div>
        <div className="row mb-2">
          <Form.Group controlId="formBasicPassword">   
          <Row> 
            <Col className="p-0 m-0 mt-1 mb-1 col-6">     
            <Button
            variant="link"
              className="link-primary text-white text-decoration-none"
              onClick={() => this.setState({ showForgetUserIdShow: true })}>
              Forgot Username?              
            </Button>
            <ForgetUserId
                show={this.state.showForgetUserIdShow}
                onHide={showModelClose}
              />     
              </Col>
              <Col className="p-0 mt-1 mb-1 col-6">    
            <Button        
            variant="link"  
              className="link-primary text-white text-decoration-none"
              onClick={() => this.setState({ showForgetPasswordShow: true })}
            >
              Forgot Password?
              
            </Button>

            <ForgetPassword
                show={this.state.showForgetPasswordShow}
                onHide={showPassModelClose}
              />    
              </Col>
              </Row>     
          </Form.Group>
        </div>

        <Link className="btn border text-white btn btn-primary col-12" to="/register">
          Register
        </Link>
      </Form>
    );
  }
}
