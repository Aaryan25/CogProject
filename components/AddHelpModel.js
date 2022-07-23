import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
class AddHelpModel extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      des: "",
      dateofcreate: "",
      contact: "",
      usertype: "",
      errors: {},
    };
  }
  setDate = (separator='-') =>{
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}
  handleValidations = () => {
    let errors = {};
    let formIsValid = true;

    if (typeof this.state.des !== "undefined") {
      if (!this.state.des) {
        formIsValid = false;
        errors["des"] = "Cannot be empty";
      }
    }
    if (typeof this.state.contact !== "undefined") {
      if (!this.state.contact) {
        formIsValid = false;
        errors["contact"] = "Cannot be empty";
      } else if (!this.state.contact.match(/^[0-9]*$/)) {
        formIsValid = false;
        errors["contact"] = "Only numbers";
      } else if (this.state.contact.length !== 10) {
        formIsValid = false;
        errors["contact"] = "10 Digit number is required";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleSubmit = (e) => {      
    e.preventDefault();
    if (this.handleValidations()) {
        let obj = {
            id: 0,
            description: this.state.des,
            created: this.setDate(),
            usertype: sessionStorage.getItem("userType"),
            contact: this.state.contact,
            resolution: "Not Available"
        }
      fetch(`http://localhost:5177/api/Helps`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((result) => result);      
        window.location = `../${sessionStorage.getItem("userType").toLowerCase()}dashboard/help`
    }
  };  
   render() {
     
    return (
      <div className="container">
        <Modal {...this.props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Add Help Model {sessionStorage.getItem("userType")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-auto" style={{ width: "80%" }}>
              <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="3">
                  Description
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px", resize: "none" }}
                    rows={3}
                    value={this.state.des}
                    onChange={(e) => this.setState({ des: e.target.value })}
                  />
                   <span style={{ color: "red" }}>
                    {this.state.errors["des"]}
                  </span>
                  {/*<span style={{ color: "red" }}>{errors["fname"]}</span>*/}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formUserId">
                <Form.Label column sm="3">
                  Date Of Created
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="date"
                    placeholder="Enter UserId"
                    value={this.setDate()}                    
                    disabled
                    />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formQuestion1">
                <Form.Label column sm="3">
                  Enter Contact ?
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Contact"
                    value={this.state.contact}
                    onChange={(e) => this.setState({ contact: e.target.value })}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["contact"]}
                  </span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formButton">
                <Col sm="2"></Col>
                <Col sm="5">
                  <Button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
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

export default AddHelpModel;
