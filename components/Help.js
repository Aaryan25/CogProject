import React, { Component } from "react";
import { Form,Button,Table } from "react-bootstrap";
import AddHelpModel from './AddHelpModel'
class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
        helpData :[],
        des: "",
      showHelpModel:false
    };
  }
  refreshData(){
    fetch("http://localhost:5177/api/Helps").then(response => response.json()).then(data=>this.setState({helpData:data}));
}
componentDidMount(){
    this.refreshData();
}
componentDidUpdate(){
    this.refreshData();
} 
  

  render() {
    if (
      sessionStorage.getItem("token") 
    ) {
        let back = () =>window.location = `/${sessionStorage.getItem("userType").toLowerCase()}dashboard`
        
        const data = this.state.helpData;   
        let closeHelpModel =() => {this.setState({showHelpModel:false})} 
      return (
          <>
        <Button className='float-end btn-success mx-3' onClick={back} > Back </Button>

        <Button className='float-end btn-success mx-3' onClick={e=>this.setState({showHelpModel:true})} > Add Help </Button>

        <AddHelpModel
                show={this.state.showHelpModel}
                onHide={closeHelpModel}
              />  
        <Form className="m-auto mt-5" style={{ width: "50%" }}>
          <h2 className="text-center mb-4 text-white" style={{ width: "100%" }}>
            Help {sessionStorage.getItem("userType")}
          </h2>

        </Form>
        <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
                <thead>
                <tr><th colSpan={4} className="text-white text-center">Help Requested</th></tr>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Contact</th>
                        <th>Resolution</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(record=>{
                        if(record.usertype===sessionStorage.getItem("userType") && record.resolution==="Not Available")
                        {                            
                           return( <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.description}</td>
                                <td>{record.contact}</td>
                                <td>{record.resolution}</td>
                                                            
                            </tr>)
                        }}
                    )}
                </tbody>
          </Table>
          <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
           <thead>
           <tr><th colSpan={4} className="text-white text-center">Help Requested Completed</th></tr>
               <tr>
                   <th>Id</th>
                   <th>Description</th>
                   <th>Contact</th>
                   <th>Resolution</th>
               </tr>
           </thead>
           <tbody>
               {data.map(record=>{
                   if(record.usertype===sessionStorage.getItem("userType") && record.resolution!=="Not Available")
                   {                            
                      return( <tr key={record.id}>
                           <td>{record.id}</td>
                           <td>{record.description}</td>
                           <td>{record.contact}</td>
                           <td>{record.resolution}</td>
                                                       
                       </tr>)
                   }}
               )}
           </tbody>
     </Table>
        </>
      );
    } else {
      window.location = "./";
    }
  }
}

export default Help;
