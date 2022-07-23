import React, { Component } from "react";
import { Col, Row, Form, Button, Modal } from "react-bootstrap";
class TrainingRegisterModel extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      venue: "",
      fees: "",
      slots: "",
      date: "",
      errors: {},
      subject: "Python",
      subjectsdata: [],
      subjectID: [],
      id: 0,
      stud:"",
      a: "",
    };
  }
  fetchSubject = async () => {
    const d = await fetch(
      `http://localhost:5177/api/ClassroomTrainings/subjects/${sessionStorage.getItem("id")}`
    ).then((res) => res.json());
    return await d;
  };
  fetchIdSubjects = async () => {
    let ids = await fetch(
      `http://localhost:5177/api/ClassroomTrainings/subjects/${this.state.subject}/${sessionStorage.getItem("id")}`
    ).then((res) => res.json());
    return await ids;
  };
  fethcData = async () => {
    let ids = await fetch(
      `http://localhost:5177/api/ClassroomTrainings/${this.state.id}`
    ).then((res) => res.json());
    this.setState({
      fees: ids.fees,
      venue: ids.venue,
      slots: ids.slots,
      date: ids.tDate,
      stud:ids.studentsList
    });
  };

  async componentDidMount() {
    let subjects = await this.fetchSubject();
    this.setState({ subjectsdata: subjects, subject: subjects[0] });

    let ids = await this.fetchIdSubjects(this.state.subject);
    this.setState({ subjectID: ids, id: ids[0] });
  }
  onselectChange = async () => {
    let ids = await this.fetchIdSubjects(this.state.subject);
    await this.setState({ subjectID: ids, id: ids[0] });
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.subjectID !== this.state.subjectID) {
      this.onselectChange();
    }
    if (prevState.id !== this.state.id) this.fethcData();
    else if (prevState.subjectID !== this.state.subjectID) this.fethcData();
    else this.fethcData();
  }
  handleValidationsQuetions = () => {
    let errors = {};
    let formIsValid = true;

    if (typeof this.state.venue !== "undefined") {
      if (!this.state.venue) {
        formIsValid = false;
        errors["venue"] = "Cannot be empty";
      } else if (!this.state.venue.match(/^[A-Za-z]*$/)) {
        formIsValid = false;
        errors["venue"] = "Only letters";
      }
    }
    if (typeof this.state.slots !== "undefined") {
      if (!this.state.slots) {
        formIsValid = false;
        errors["slots"] = "Cannot be empty";
      }
    }
    if (typeof this.state.fees !== "undefined") {
      if (!this.state.fees) {
        formIsValid = false;
        errors["fees"] = "Cannot be empty";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.subject);
    if (this.handleValidationsQuetions()) {
      let userId = sessionStorage.getItem("id");
      let obj = {
        id: this.state.id,
        subject: this.state.subject,
        tDate: this.state.date,
        venue: this.state.venue,
        slots: this.state.slots - 1,
        fees: this.state.fees,
        studentsList: this.state.stud+userId + ",",
      };
      
      console.log(obj);
      this.setState({ a: "Registered Suucessfully" });
      console.log(`http://localhost:5177/api/ClassroomTrainings/${obj.id}`);
      await fetch(`http://localhost:5177/api/ClassroomTrainings/${obj.id}`,
      {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj)
      });
      console.log(obj);
      setTimeout(() => {
        window.location = "/studentdashboard";
      }, 2000);
    }
  };
  render() {
    let s;
    if (this.state.a !== "") {
      s = (
        <div className="alert alert-primary" role="alert">
          {this.state.a}
        </div>
      );
    }
    return (
      <div className="container">
        <Modal {...this.props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Register for training</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {s}
            <Form className="m-auto" style={{ width: "80%" }}>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion1">
                <Form.Label column sm="5">
                  Select Subject
                </Form.Label>
                <Col sm="7">
                  <Form.Select
                    required
                    value={this.state.subject}
                    onChange={async (e) => {
                      this.setState({ subject: e.target.value });
                    }}
                  >
                    {this.state.subjectsdata.map((r) => {
                      return (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion1">
                <Form.Label column sm="5">
                  Select Id
                </Form.Label>
                <Col sm="7">
                  <Form.Select
                    required
                    value={this.state.id}
                    onChange={(e) => {
                      this.setState({ id: e.target.value });
                    }}
                  >
                    {this.state.subjectID.map((r) => {
                      return (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion3">
                <Form.Label column sm="5">
                  Venue
                </Form.Label>
                <Col sm="7">
                  <Form.Control type="text" value={this.state.venue} disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion3">
                <Form.Label column sm="5">
                  Available Slots
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="0"
                    value={this.state.slots}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion3">
                <Form.Label column sm="5">
                  Fees
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="0"
                    value={this.state.fees}
                    disabled
                  />
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

export default TrainingRegisterModel;
