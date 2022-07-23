import React, { Component } from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'
class ForgetPassword extends Component {
    constructor(props) {
      super(props)
      this.handleSubmit=this.handleSubmit.bind(this);
      this.state = {
        que1: "",
        que2: "",
        que3: "",
        id:'',
        pass:'',
        confirmpass:'',
        errors:{}, 
        a:{}      
      };
    }
    handleValidationsQuetions = () =>{
        let errors = {};
        let formIsValid = true;
        
        if (typeof this.state.id !== "undefined") {
            if (!this.state.id) {
                formIsValid = false;
                errors["id"] = "Cannot be empty";
              }    
            else if (!this.state.id.match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["id"] = "Only Number Requried";
          }
        }

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
        if(this.state.a!==undefined && Object.keys(this.state.a).length>0) 
        {
    
        if (typeof this.state.pass !== "undefined") {
            if (!this.state.pass) {
                formIsValid = false;
                errors["pass"] = "Cannot be empty";
              }    
        }
        if (typeof this.state.confirmpass !== "undefined") {
            if (!this.state.confirmpass) {
                formIsValid = false;
                errors["confirmpass"] = "Cannot be empty";
              }    
              else if(this.state.pass!==this.state.confirmpass){
                formIsValid = false;
                errors["confirmpass"] = "Confirm pass should be equal to password";
              }
        }
    }
        this.setState({errors:errors});
        return formIsValid;  
      }
      handleSubmitForConfirm = (e) =>{
        e.preventDefault();
        if(this.handleValidationsQuetions())
        {
            this.state.a.pass=this.state.pass;            
            fetch(`http://localhost:5177/api/Users/${this.state.a.id}`,
            {
            method:"PUT",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.a)
            })
            .then(res=>res.json())
            .then(result=>result);
            alert("Password change successfully");
            window.location = "/login";
        }
    };
           
    handleSubmit = async (e)=>{
        e.preventDefault();
        if(this.handleValidationsQuetions())
        {
            const obj = await fetch(`http://localhost:5177/api/Users/${this.state.id}/${this.state.que1}/${this.state.que2}/${this.state.que3}`,
            {
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
            .then(res=>res.json())
            .then(result=>result);    
            console.log(obj);        
            if(obj !== undefined && obj !== {} && obj.status!==404 ){
                this.setState({a:obj})
            }
            else{
                alert("Provide correct answers. ")
            }
        }
    }
  render() {      
      let s=<><Form.Group as={Row} className="mb-3" controlId="formButton">
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
    </Form.Group></>;
      if(this.state.a!==undefined && Object.keys(this.state.a).length>0) 
    {
      s=<><Form.Group as={Row} className="mb-3" controlId="formPass">
      <Form.Label column sm="5">
        Enter New Password
      </Form.Label>
      <Col sm="7">
        <Form.Control
          type="password"
          placeholder="Enter New Password"
          value={this.state.pass}
          onChange={(e) => this.setState({ pass: e.target.value })}
        />
        <span style={{ color: "red" }}>{this.state.errors["pass"]}</span>
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formConfirmPass">
    <Form.Label column sm="5">
      Enter Confirm Password
    </Form.Label>
    <Col sm="7">
      <Form.Control
        type="password"
        placeholder="Enter Confirm Password"
        value={this.state.confirmpass}
        onChange={(e) => this.setState({ confirmpass: e.target.value })}
      />
      <span style={{ color: "red" }}>{this.state.errors["confirmpass"]}</span>
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="formButton">
                <Col sm="2"></Col>
                <Col sm="5">
                  <Button className="btn btn-primary" onClick={this.handleSubmitForConfirm}>Submit</Button>
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
  </>
    }  
    return (
      <div className='container'>
          <Modal {...this.props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title >
                    Forgot Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form className="m-auto" style={{ width: "80%" }}>
            <Form.Group as={Row} className="mb-3" controlId="formUserId">
                <Form.Label column sm="5">
                  Enter UserId 
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Enter UserId"
                    value={this.state.id}
                    onChange={(e) => this.setState({ id: e.target.value })}
                  />
                  <span style={{ color: "red" }}>{this.state.errors["id"]}</span>
                </Col>
              </Form.Group>

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
              {s}
 
            </Form>
                    
            </Modal.Body>
          </Modal>

      </div>
    )
  }
}

export default ForgetPassword