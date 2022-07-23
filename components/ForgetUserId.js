import React, { Component } from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'
class ForgetUserId extends Component {
    constructor(props) {
      super(props)
      this.handleSubmit=this.handleSubmit.bind(this);
      this.state = {
        que1: "",
        que2: "",
        que3: "",
        errors:{},
        a:''
      }
    
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
    handleSubmit =async (e)=>{
        e.preventDefault();
    if(this.handleValidationsQuetions())
    {
        const data = await fetch(`http://localhost:5177/api/Users/${this.state.que1}/${this.state.que2}/${this.state.que3}`,
        {
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
        })
        .then(res=>res.json())
        .then(result=>result);        
        if(data.length>0){
            this.setState({a:data});
        }
        else{
            this.setState({a:"Not Found"});
        }
        setTimeout(()=>{window.location = '/login'},3000);
    }    
}
  render() {  
    let s;
    if(this.state.a!=='' && this.state.a!=='Not Found')
    {
      s=<div className="alert alert-primary" role="alert">          
      User Id : {this.state.a[0]} and Username : {this.state.a[1]}
    </div>
    }    
    else if(this.state.a==='Not Found'){
        s=<div className="alert alert-danger" role="alert">          
        User Id : {this.state.a[0]}  
        </div>
    }
    return (
      <div className='container'>
          <Modal {...this.props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title >
                    Forgot Username
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            {s}
            </Modal.Body>
          </Modal>

      </div>
    )
  }
}

export default ForgetUserId