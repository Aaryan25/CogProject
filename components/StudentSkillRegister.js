import React, { Component } from "react";
import { Modal, Button, Table, Row, Col, Form } from "react-bootstrap";
class StudentSkillRegister extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      skill: "Python",
      skillData: [],
      errors: {},
      updateData: {},
      a: "",
    };
  }
  async refreshData() {
    try {
      const d = await fetch(
        `http://localhost:5177/api/Skills/GetSkills/${
          this.state.skill
        }/${sessionStorage.getItem("id")}`
      )
        .then((response) => response.json())
        .then((data) => data);
      this.setState({ a: "Data Available" });
      return await d;
    } catch (err) {
      this.setState({ a: "Data Not Available" });
      return [];
    }
  }

  handleValidations = async () => {
    let errors = {};
    let formIsValid = true;

    if (typeof this.state.skill !== "undefined") {
      if (!this.state.skill) {
        formIsValid = false;
        errors["skill"] = "Cannot be empty";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.handleValidations()) {
      const data = await this.refreshData();
      console.log(data);
      await this.setState({ skillData: data });
      console.log(data);
    }
  };
  bookClick = async (e,record) => {
    let obj = {      
      id: record.id,
      tutorId: record.tutorId,
      skillName: record.skillName,
      trainerName: record.trainerName,
      timeSlot: record.timeSlot,
      studList: record.studList+sessionStorage.getItem("id")+",",
    };
    console.log(obj)
    await fetch(`http://localhost:5177/api/Skills/${record.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
    window.location = `../${sessionStorage.getItem("userType").toLowerCase()}dashboard`
    
  };
  render() {
    const data = this.state.skillData;
    let s;
    if (this.state.a === "Data Not Available") {
      s = (
        <div className="alert alert-danger" role="alert">
          Data Not Available
        </div>
      );
    } else {
      s = (
        <Table className="mt-4 text-white" variant="dark" bordered size="sm">
          <thead>
            <tr>
              <th colSpan={4} className="text-white text-center">
                Student Skill Register
              </th>
            </tr>
            <tr>
              <th>Id</th>
              <th>Trainer Name</th>
              <th>Time Slot</th>
              <th>Book Slot</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => {
              return (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.trainerName}</td>
                  <td>{record.timeSlot}</td>
                  <td>
                    <Button onClick={(e) => this.bookClick(e, record)}>
                      Book
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
    return (
      <div className="container">
        <Modal {...this.props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Skill Model {sessionStorage.getItem("userType")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-auto" style={{ width: "80%" }}>
              <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="2">
                  Skill
                </Form.Label>
                <Col sm="7">
                  <Form.Select
                    value={this.state.skill}
                    onChange={(e) => this.setState({ skill: e.target.value })}
                  >
                    <option value={"Python"}>Python</option>
                    <option value={"Java"}>Java</option>
                    <option value={"C#"}>C#</option>
                    <option value={"C"}>C</option>
                    <option value={"HTML"}>HTML</option>
                    <option value={"CSS"}>CSS</option>
                    <option value={"React"}>React</option>
                    <option value={"Javascript"}>Javascript</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {this.state.errors["skill"]}
                  </span>
                  {/*<span style={{ color: "red" }}>{errors["fname"]}</span>*/}
                </Col>
                <Col sm="3">
                  <Button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Search Trainer
                  </Button>
                </Col>
              </Form.Group>
            </Form>
            {s}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default StudentSkillRegister;
