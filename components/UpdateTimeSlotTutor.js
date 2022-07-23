import React, { Component } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
class UpdateTimeSlotTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      errors: {},
    };
  }
  handleValidations = () => {
    let errors = {};
    let formIsValid = true;

    if (typeof this.state.time !== "undefined") {
      if (!this.state.time) {
        formIsValid = false;
        errors["time"] = "Cannot be empty";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleSubmit = (e) => {
    if (this.handleValidations()) {
      let obj = {
        id: this.props.data.id,
        tutorId: this.props.data.tutorId,
        skillName: this.props.data.skillName,
        trainerName: this.props.data.trainerName,
        timeSlot: this.state.time,
        studList: "",
      };
      console.log(obj);
      fetch(`http://localhost:5177/api/Skills/${this.props.data.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        window.location = `../${sessionStorage.getItem("userType").toLowerCase()}dashboard`

    }
  };

  render() {
    return (
      <div className="container">
        <Modal {...this.props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Time Slot</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-auto" style={{ width: "80%" }}>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion1">
                <Form.Label column sm="5">
                  Skill Name
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    disabled
                    value={this.props.data.skillName}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion3">
                <Form.Label column sm="5">
                  Time Slot
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="time"
                    value={this.state.time}
                    onChange={(e) => this.setState({ time: e.target.value })}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["time"]}
                  </span>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formButton">
                <Col sm="2"></Col>
                <Col sm="5">
                  <Button
                    className="btn btn-primary"
                    onClick={(e) => {
                      this.handleSubmit();
                    }}
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

export default UpdateTimeSlotTutor;
