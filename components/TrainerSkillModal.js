import React, { Component } from "react";
import { Modal, Button,Table, Row, Col, Form } from "react-bootstrap";
import UpdateTimeSlotTutor from "./UpdateTimeSlotTutor";
class TrainerSkillModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      skill : "Python",
      skillData :[],
      errors:{},
      showUpdateSlotModal:false,
      updateData:{},
      a:''
    };
  }
  refreshData(){
    fetch(`http://localhost:5177/api/Skills/id?id=${sessionStorage.getItem("id")}`).then(response => response.json()).then(data=>this.setState({skillData:data}));
}
componentDidMount(){
    this.refreshData();
}
componentDidUpdate(){
    this.refreshData();
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
    const list = await fetch(`http://localhost:5177/api/Skills/skills/check?check=${sessionStorage.getItem("id")}`).then(res=>res.json())
    if(list.includes(this.state.skill))
    {
      formIsValid = false;
      errors["skill"] = "Already Available"; 
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleSubmit = async (e) => {      
    e.preventDefault();
    if (this.handleValidations()) {
        let obj = {
            id: 0,
            tutorId: sessionStorage.getItem("id"),
            skillName: this.state.skill,            
            trainerName: sessionStorage.getItem("name"),
            timeSlot: "",
            studList: ""
        }
      await fetch(`http://localhost:5177/api/Skills/id?id=${sessionStorage.getItem("id")}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((result) => result);

    }
  };  
  updateClick = (id) =>{
    this.state.skillData.forEach(element => {
      if(element.id===id){
        this.setState({updateData:element})
      }
    });
   this.setState({showUpdateSlotModal:true})
  }
  deleteClick = (id) =>{
    fetch(`http://localhost:5177/api/Skills/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }        
      })
  }
  detailsClick = (record) =>{
      if(record.studList!==""){
        this.setState({a:record.studList})
      }
      else{
        this.setState({a:""})
      }
  }
   render() {
    const data = this.state.skillData;    
    let closeUpdateSlotModal = () => {this.setState({showUpdateSlotModal:false})}
    let check;
    if(this.state.a!==""){
        check = 
        <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
        <thead>
        <tr><th colSpan={6} className="text-white text-center">Registerd Skills Student Id</th></tr>
            <tr className="text-center" >
                <th>Id</th>
            </tr>
        </thead>
        <tbody>
            {this.state.a.split(",").map(record=>{                                               
                   return( <tr className="text-center" key={record}>
                        <td>{record}</td>                       
                    </tr>)
                }
            )}
        </tbody>
  </Table>
    }
    else{
      check=<></>
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
                    Add
                  </Button>
                </Col>
              </Form.Group>
            </Form>
            <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
           <thead>
           <tr><th colSpan={6} className="text-white text-center">Trainer Skills</th></tr>
               <tr>
                   <th>Id</th>
                   <th>Skill</th> 
                   <th>Time Slot</th>
                   <th>Details</th>     
                   <th>Update Slot</th>     
                   <th>Remove</th>              
               </tr>
           </thead>
           <tbody>
               {data.map(record=>{                                               
                      return( <tr key={record.id}>
                           <td>{record.id}</td>
                           <td>{record.skillName}</td>                                                       
                           <td>{record.timeSlot}</td>                                                       
                           <td><Button onClick={(e)=>this.detailsClick(record)}>Details</Button> </td>
                           <td><Button onClick={(e)=>this.updateClick(record.id)}>Update</Button> </td>
                           <td><Button onClick={(e)=>this.deleteClick(record.id)}>Delete</Button> </td>                                                       
                       </tr>)
                   }
               )}
           </tbody>
     </Table>
     <UpdateTimeSlotTutor 
     data={this.state.updateData}
     show={this.state.showUpdateSlotModal}
     onHide={closeUpdateSlotModal}
     />
     {check}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default TrainerSkillModal;
