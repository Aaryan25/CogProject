import React, { Component } from 'react'
import {Button,Form,Table} from 'react-bootstrap'
import CheckTraining from './CheckTraining';
import TrainerSkillModal from './TrainerSkillModal';

class TutorDashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      classroomData :[],
      showHelpResolveModel:false,
      studedata : [],
      singledata : {},
      data:[],
      showSkillModal:false     
    }
  }
  refreshData(){
    fetch("http://localhost:5177/api/ClassroomTrainings").then(response => response.json()).then(data=>this.setState({classroomData:data}));
}
componentDidMount(){
  this.refreshData();
}
componentDidUpdate(){
  this.refreshData();
} 
  logoutClick = (e) => {
    window.location = "./"
  }
  helpClick = (e) => {
    window.location = "/tutordashboard/help"
  }
  classRoomClick = () => {
    window.location = "/tutordashboard/classroom"
  }
  skillClick = () =>{
      this.setState({showSkillModal:true})
  }
  checkClick = async (e,id) =>{
    e.preventDefault();
    await this.state.classroomData.forEach(r=>{
      if(r.id===id){              
          this.setState({singledata:r})
      }
  })
  if(this.state.singledata.studentsList!=="")
  {
    let d = this.state.singledata.studentsList;
  if(d!=="" || d!==" " || d!==null || d!==undefined)
  {   
    let ans = []
    let arr = d.split(',');
    for(let i=0;i<arr.length-1;i++){
      const l = await fetch(`http://localhost:5177/api/Users/${arr[i]}`).then(res=>res.json()).then(result=>result)
      ans.push(l)
    }
    this.setState({data:ans});
  }

}
else{
  this.setState({data:[]})
}
   this.setState({showHelpResolveModel:true})
    
    
}
  render() {
    if(sessionStorage.getItem("token") && sessionStorage.getItem("userType")==="Tutor")
    {
      let closeHelpResolveModel =() => {this.setState({showHelpResolveModel:false}); this.setState({studedata:[]})} 
      let closeSkillModal =() => {this.setState({showSkillModal:false})} 

      const data = this.state.classroomData;  
      
      return (
        <>
        <Button className='float-end btn-danger mx-3' onClick={e=>this.logoutClick()} > Logout </Button>

        <Button className='float-end btn-primary mx-2' onClick={e=>this.helpClick()} > Help </Button>
        <Button className='float-end btn-primary  mx-2' onClick={e=>this.classRoomClick()} > Classroom </Button>
        <Button className='float-end btn-primary mx-2' onClick={e=>this.skillClick()} > Skill </Button>
        
        <Form className="m-auto bg-dark mt-2" style={{ width: "100%" }}>
          <h2 className="float-center text-success mb-4" style={{ width: "100%" }}>
            {sessionStorage.getItem("userType")} Dashboard
          </h2>

        </Form>
        <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
           <thead>
           <tr><th colSpan={7} className="text-white text-center">Classroom Details</th></tr>
               <tr>
                   <th>Id</th>
                   <th>Subject</th>
                   <th>Date</th>
                   <th>Venue</th>
                   <th>Slots</th>
                   <th>Fees</th>
                   <th>Details</th>
               </tr>
           </thead>
           <tbody>
               {data.map(record=>{
                      return( <tr key={record.id}>
                           <td>{record.id}</td>
                           <td>{record.subject}</td>
                           <td>{record.tDate}</td>
                           <td>{record.venue}</td>
                           <td>{record.slots}</td>
                           <td>{record.fees}</td>  
                           <td><Button  onClick={(e)=>this.checkClick(e,record.id)}>Check Details</Button></td>                                                       
                       </tr>)
                   }
               )}
           </tbody>
     </Table>
     <CheckTraining 
     
     stud={this.state.data}
     
    data = {this.state.singledata}
  show={this.state.showHelpResolveModel}
  onHide={closeHelpResolveModel}
/> 
<TrainerSkillModal 
   
  show={this.state.showSkillModal}
  onHide={closeSkillModal}
/> 
        </>
      )
    }
    else{
      window.location = "/login";
    }
  }
}

export default TutorDashboard