import React, { Component } from 'react'
import {Button,Form,Badge} from 'react-bootstrap'
class Admindashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      count : 0,     
    }
  }
  logoutClick = (e) => {
    window.location = "/"
  }
  helpClick = (e) => {
    window.location = "/admindashboard/helpresolve"
    
  }
  checkHelpCount = async () =>{
    const data = await fetch("http://localhost:5177/api/Helps").then(res=>res.json());
    let obj = []
    data.forEach((row)=>{
      if(row.resolution==="Not Available")
      {
        obj.push(row);
      }
    })
    return await obj;
    
  }
  async componentDidMount(){
    const obj = await this.checkHelpCount();
    this.setState({count:obj.length})
  }
  topicClick = () =>{
    window.location = "/admindashboard/topics"
  }
  render() {
    if(sessionStorage.getItem("token") && sessionStorage.getItem("userType")==="Admin")
    {
      let badge;
      if(this.state.count===0)
        badge = <Badge bg="success">{this.state.count}</Badge>
      else
      badge = <Badge bg="danger">{this.state.count}</Badge>
      return (
        <>
        <Button className='float-end btn-danger mx-3' onClick={e=>this.logoutClick()} > Logout </Button>

        <Button className='float-end btn-primary mx-2' onClick={e=>this.helpClick()} > Help {badge} </Button>
        <Button className='float-end btn-primary mx-2' onClick={e=>this.topicClick()} > Topics </Button>

        <Form className="m-auto bg-dark mt-2" style={{ width: "100%" }}>
          <h2 className="float-center text-success mb-4" style={{ width: "100%" }}>
            {sessionStorage.getItem("userType")} Dashboard
          </h2>
          
        </Form>
        </>
      )
    }
    else{
      window.location = "/login";
    }
  }
}

export default Admindashboard