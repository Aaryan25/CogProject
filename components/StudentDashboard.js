import React, { Component } from 'react'
import {Button,Form} from 'react-bootstrap'
import StudentSkillRegister from './StudentSkillRegister';
import TrainingRegisterModel from './TrainingRegisterModel'
class StudentDashboard extends Component {
  constructor(props){
    super(props);  
    this.state={
      showTrainingModel:false,
      showStudentSkillRegister:false
    }  
  }
  logoutClick = (e) => {
    window.location = "./"
  }
  helpClick = (e) => {
    window.location = "./studentdashboard/help"
  }

  render() {
    
    if(sessionStorage.getItem("token") && sessionStorage.getItem("userType")==="Student")
    {
      let closeTrainingModel = () => {this.setState({showTrainingModel:false})}
      let closeStudentRegister = () => {this.setState({showStudentSkillRegister:false})}

      return (
        <>
        <Button className='float-end btn-danger mx-3' onClick={e=>this.logoutClick()} > Logout </Button>

        <Button className='float-end btn-primary mx-2' onClick={e=>this.helpClick()} > Help </Button>

        <Button className='float-end btn-primary  mx-2' onClick={e=>this.setState({showTrainingModel:true})} > Classroom </Button>
        <Button className='float-end btn-primary  mx-2' onClick={e=>this.setState({showStudentSkillRegister:true})} > Skills </Button>

        <Form className="m-auto bg-dark mt-2" style={{ width: "100%" }}>
          <h2 className="float-center text-success mb-4" style={{ width: "100%" }}>
            {sessionStorage.getItem("userType")} Dashboard
          </h2>

        </Form>
        <TrainingRegisterModel 
        show={this.state.showTrainingModel}
        onHide={closeTrainingModel}
        />
        <StudentSkillRegister 
        show={this.state.showStudentSkillRegister}
        onHide={closeStudentRegister}
        />
        </>
      )
    }
    else{
      window.location = "/login";
    }
  }
}

export default StudentDashboard