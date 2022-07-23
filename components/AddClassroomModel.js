import React, { Component } from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'
class AddClassroomModel extends Component {
    constructor(props) {
      super(props)
      this.handleSubmit=this.handleSubmit.bind(this);
      this.state = {
        subject: "",
        venue: "",
        slot: "",
        fees: "",
        errors:{},
        dob:this.setDate(),
       
      }
    
    }
    setDate = (separator='-') =>{
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
    handleValidationsQuetions = () =>{
        let errors = {};
        let formIsValid = true;
        
        if (typeof this.state.subject !== "undefined") {
            if (!this.state.subject) {
                formIsValid = false;
                errors["subject"] = "Cannot be empty";
              }    
            else if (!this.state.subject.match(/^[A-Za-z]*$/)) {
            formIsValid = false;
            errors["subject"] = "Only letters";
          }
        }
        if (typeof this.state.venue !== "undefined") {
            if (!this.state.venue) {
                formIsValid = false;
                errors["venue"] = "Cannot be empty";
              }    
            else if (!this.state.venue.match(/^[A-Za-z]*$/)) {
            formIsValid = false;
            errors["venue"] = "Only letters";
          }
        }
        if (typeof this.state.fees !== "undefined") {
            if (!this.state.fees) {
                formIsValid = false;
                errors["fees"] = "Cannot be empty";
              }    
            else if (!this.state.fees.match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["fees"] = "Only numbers";
          }
        }
        if (typeof this.state.slot !== "undefined") {
            if (!this.state.slot) {
                formIsValid = false;
                errors["slot"] = "Cannot be empty";
              }    
            else if (!this.state.slot.match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["slot"] = "Only numbers";
          }
        }

        this.setState({errors:errors});
        return formIsValid;  
      }
    handleSubmit =async (e)=>{
        e.preventDefault();
    if(this.handleValidationsQuetions())
    {
        let obj = {
            "id": 0,
            "subject": this.state.subject,
            "tDate": this.state.dob,
            "venue": this.state.venue,
            "slots": this.state.slot,
            "fees": this.state.fees,
            "studentsList": ""
          }
        await fetch(`http://localhost:5177/api/ClassroomTrainings`,
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
        window.location = `../${sessionStorage.getItem("userType").toLowerCase()}dashboard/classroom`         
    }    
}
  render() {  
    
    return (
      <div className='container'>
          <Modal {...this.props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title >
                    Add Classroom Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form className="m-auto" style={{ width: "80%" }}>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion1">
                <Form.Label column sm="5">
                  Enter Subject 
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Enter Subject "
                    value={this.state.subject}
                    onChange={(e) => this.setState({ subject: e.target.value })}
                  />
                  <span style={{ color: "red" }}>{this.state.errors["subject"]}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formDOB">
            <Form.Label className="" column sm="5">
                Date Of Training
            </Form.Label>
            <Col sm="7">
                <Form.Control type="Date" name='dob' max={this.setDate()} required value={this.state.dob} onChange={(e)=>{this.setState({dob:e.target.value});}} />                
            </Col>
      </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formQuestion2">
                <Form.Label column sm="5">
                  Enter Venue 
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder="Enter Venue"
                    value={this.state.venue}
                    onChange={(e) => this.setState({ venue: e.target.value })}
                  />
                <span style={{ color: "red" }}>{this.state.errors["venue"]}</span>

                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion3">
                <Form.Label column sm="5">
                  Enter Available Slots
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="number"
                    placeholder="Enter Available Slots"
                    value={this.state.slot}
                    onChange={(e) => this.setState({ slot: e.target.value })}
                  />
                  <span style={{ color: "red" }}>{this.state.errors["slot"]}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion3">
                <Form.Label column sm="5">
                  Enter Fees
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="number"
                    placeholder="Enter Fees"
                    value={this.state.fees}
                    onChange={(e) => this.setState({ fees: e.target.value })}
                  />
                  <span style={{ color: "red" }}>{this.state.errors["fees"]}</span>
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
    )
  }
}

export default AddClassroomModel