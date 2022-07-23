import React, { Component } from "react";
import { Modal, Table,Button, Form, Row, Col } from "react-bootstrap";
export class CheckTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
        studdata : []
    }   
  }    

  render() {   
    let s;
    if(this.props.stud.length>0 ){
      s=<Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
      <thead>
      <tr><th colSpan={4} className="text-white text-center">Registerd Student</th></tr>
          <tr>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Contact</th>
          </tr>
      </thead>
      <tbody>
          {this.props.stud.map(record=>{                                          
                 return( <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.firstName}</td>
                      <td>{record.lastName}</td>
                      <td>{record.contact}</td>
                                                  
                  </tr>)
              }
          )}
      </tbody>
</Table>     
    }

    return (
      
      <div className="container">
        <Modal {...this.props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Classroom</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-auto" style={{ width: "80%" }}>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion1">
                <Form.Label column sm="5">
                  Training Id
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder=" "
                    value={this.props.data.id}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion1">
                <Form.Label column sm="5">
                  Subject Name
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    placeholder=" "
                    value={this.props.data.subject}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formQuestion3">
                <Form.Label column sm="5">
                  Available Slots
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="number"
                    placeholder=""
                    value={this.props.data.slots}
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
                    type="number"
                    placeholder=""
                    value={this.props.data.fees}
                    disabled
                  />
                  
                </Col>
              </Form.Group>
              {s}
              <Form.Group as={Row} className="mb-3" controlId="formButton">
                <Col sm="5"></Col>
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

export default CheckTraining;
