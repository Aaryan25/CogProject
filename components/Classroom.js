import React, { Component } from 'react'
import {Button,Form,Table} from 'react-bootstrap'
import AddClassroomModel from './AddClassroomModel'
class Classroom extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            showAddClassroomModel:false
        }
    }
    fetchData = async () =>{
        const data= await fetch("http://localhost:5177/api/ClassroomTrainings").then(res=>res.json())
        console.log(data)
        return await data;
    }
    async componentDidMount(){
        let obj = await this.fetchData()
       
        this.setState({data:obj})
        console.log(this.state.data)
    }
  render() {
      if(sessionStorage.getItem("userType")==="Tutor")
    {
        let back = () =>window.location = `/${sessionStorage.getItem("userType").toLowerCase()}dashboard`
        let closeAddClassroomModel = () =>{this.setState({showAddClassroomModel:false})}
        return (
        <>
        <Button className='float-end btn-success mx-3' onClick={back} > Back </Button>
        <Form className="m-auto mt-2" style={{ width: "50%" }}>
          <h2 className="text-center mb-4 text-warning" style={{ width: "100%" }}>
            Classroom {sessionStorage.getItem("userType")}
          </h2>

        </Form>
        <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
           <thead>
           <tr><th colSpan={6} className="text-white text-center">Classroom Details</th></tr>
               <tr>
                   <th>Id</th>
                   <th>Subject</th>
                   <th>Date</th>
                   <th>Venue</th>
                   <th>Slots</th>
                   <th>Fees</th>
               </tr>
           </thead>
           <tbody>
              {
                  this.state.data.map(row=>{
                      return(
                      <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.subject}</td>
                          <td>{row.tDate}</td>
                          <td>{row.venue}</td>
                          <td>{row.slots}</td>
                          <td>{row.fees}</td>
                      </tr>)
                  })
              }
           </tbody>
     </Table>
     <Button onClick={(e)=>{this.setState({showAddClassroomModel:true})}}>Add Classroom</Button>
    <AddClassroomModel 
        show={this.state.showAddClassroomModel}
        onHide={closeAddClassroomModel}
    />
        </>
    )}
    else{
        window.location="/"
    }
  }
}

export default Classroom