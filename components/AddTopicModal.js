import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
class AddTopicModel extends Component {
  constructor(props) {
    super(props);
    this.state ={
      topicName:"",
      startDate:this.setDate(),
      endDate:this.setDate(),
      eligible:"Beginner",      
      errors:{}
    }
   
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

  if (typeof this.state.topicName !== "undefined") {
    if (!this.state.topicName) {
      formIsValid = false;
      errors["topicName"] = "Cannot be empty";
    }
  }
  this.setState({ errors: errors });
  return formIsValid;
};
  handleSubmit = (e) => {      
    e.preventDefault();
    if(this.handleValidations()){
      let obj = {
        "id": 0,
    "topicName": this.state.topicName,
    "startDate": this.state.startDate,
    "endtDate": this.state.endDate,
    "eligible": this.state.eligible
    }
  fetch(`http://localhost:5177/api/Topics`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((result) => result);      
    window.location = `../${sessionStorage.getItem("userType").toLowerCase()}dashboard/topics`
    }
  };  
   render() {
     
    return (
      <div className="container">
        <Modal {...this.props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
            Add Topic Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-auto" style={{ width: "80%" }}>
              <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="3">
                  Topic Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Topic Name"
                    value={this.state.topicName}
                    onChange={(e) => this.setState({ topicName: e.target.value })}
                  />
                   <span style={{ color: "red" }}>
                    {this.state.errors["topicName"]}
                  </span>
                  {/*<span style={{ color: "red" }}>{errors["fname"]}</span>*/}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formUserId">
                <Form.Label column sm="3">
                  Start Date 
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="date"
                    value={this.state.startDate}                    
                    onChange={(e)=>this.setState({startDate:e.target.value})}
                    />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formUserId">
                <Form.Label column sm="3">
                  End Date 
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="date"
                    value={this.state.endDate}                    
                    onChange={e=>this.setState({endDate:e.target.value})}
                    />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formUserType">
            <Form.Label column sm="3">
                User Category
            </Form.Label>
            <Col sm="9">
                <Form.Select required onChange={(e)=>this.setState({eligible:e.target.value})}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                </Form.Select>
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

export default AddTopicModel;
