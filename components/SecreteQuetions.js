import React, { Component } from "react";

import {Modal,Button,Row,Col,Form} from 'react-bootstrap'

class SecreteQuetions extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      que1: "",
      que2: "",
      que3: "",
      errors:{},
      a:''
    };
  }
  handleValidationsQuetions = () =>{
    let errors = {};
    let formIsValid = true;
    
    if (typeof this.state.que1 !== "undefined") {
        if (!this.state.que1) {
            formIsValid = false;
            errors["que1"] = "Cannot be empty";
          }    
        else if (!this.state.que1.match(/^[A-Za-z]*$/)) {
        formIsValid = false;
        errors["que1"] = "Only letters";
      }
    }
    if (typeof this.state.que2 !== "undefined") {
        if (!this.state.que2) {
            formIsValid = false;
            errors["que2"] = "Cannot be empty";
          }    
        else if (!this.state.que2.match(/^[A-Za-z]*$/)) {
        formIsValid = false;
        errors["que2"] = "Only letters";
      }
    }
    if (typeof this.state.que3 !== "undefined") {
        if (!this.state.que3) {
            formIsValid = false;
            errors["que3"] = "Cannot be empty";
          }    
        else if (!this.state.que1.match(/^[A-Za-z]*$/)) {
        formIsValid = false;
        errors["que1"] = "Only letters";
      }
    }
    this.setState({errors:errors});
    return formIsValid;  
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.handleValidationsQuetions())
    {
        let obj = this.props.data;
        obj.que1=this.state.que1;
        obj.que2=this.state.que2;
        obj.que3=this.state.que3;

        console.log(obj);
        
        fetch("http://localhost:5177/api/Users",
        {
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(result=>console.log(result));        
        this.setState({a:"User Added Suucessfully"}); 
        
        setTimeout(()=>{window.location = '/login'},2000);

    }    
  }
  render() {
    let s;
    if(this.state.a!=='')
    {
      s=<div className="alert alert-primary" role="alert">

      {this.state.a}
    </div>
    }
    return (
      <div className="container">
        
        <Modal {...this.props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Secrete Quetions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {s}
            <Form className="m-auto" style={{ width: "80%" }}>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion1">
                <Form.Label column sm="5">
                  Enter your first pet name ?
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Enter First Pet Name"
                    value={this.state.que1}
                    onChange={(e) => this.setState({ que1: e.target.value })}
                  />
                  <span style={{ color: "red" }}>{this.state.errors["que1"]}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion2">
                <Form.Label column sm="5">
                  Enter your favourite food ?
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Enter Favourite Food"
                    value={this.state.que2}
                    onChange={(e) => this.setState({ que2: e.target.value })}
                  />
                <span style={{ color: "red" }}>{this.state.errors["que2"]}</span>

                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion3">
                <Form.Label column sm="5">
                  Enter favourite city ?
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Enter Favourite City"
                    value={this.state.quee}
                    onChange={(e) => this.setState({ que3: e.target.value })}
                  />
                  <span style={{ color: "red" }}>{this.state.errors["que3"]}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formButton">
                <Col sm="2"></Col>
                <Col sm="5">
                  <Button className="btn btn-primary" onClick={this.handleSubmit}>Submit</Button>
                </Col>
                <Col sm="5">
                  <Button
                    className="btn btn-primary"
                    varient="danger"
                    onClick={this.props.onHide}
                  >
                    Close
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SecreteQuetions;
