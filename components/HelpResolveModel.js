import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
class HelpResolveModel extends Component {
  constructor(props) {
    super(props);
    console.log(props.data)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      des: "",     
      errors: {},
    };
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

    this.setState({ errors: errors });
    return formIsValid;
  };
  handleSubmit = (e) => {      
    e.preventDefault();
    if (this.handleValidations()) {
        let obj = {
            id: this.props.data.id,
            description: this.props.data.description,
            created: this.props.data.created,
            usertype: this.props.data.usertype,
            contact: this.props.data.contact,
            resolution: this.state.des
        }
      fetch(`http://localhost:5177/api/Helps/${this.props.data.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((result) => result);      
        window.location = `../${sessionStorage.getItem("userType").toLowerCase()}dashboard/helpresolve`
    }
  };  
   render() {
     
    return (
      <div className="container">
        <Modal {...this.props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Resolve Help Model {sessionStorage.getItem("userType")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-auto" style={{ width: "80%" }}>
            <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="3">
                  Help Id :
                </Form.Label>
                <Form.Label column sm="7">
                  {this.props.data.id}
                </Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="3">
                  Help Description 
                </Form.Label>
                <Form.Label column sm="7">
                  {this.props.data.description}
                </Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="3">
                  Help Created Date 
                </Form.Label>
                <Form.Label column sm="7">
                  {this.props.data.created}
                </Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="3">
                  Help UserType 
                </Form.Label>
                <Form.Label column sm="7">
                  {this.props.data.usertype}
                </Form.Label>
            </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="3">
                  Resolution
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

export default HelpResolveModel;
