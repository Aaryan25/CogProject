import React, { Component } from 'react'
import {Table,Button,Form} from 'react-bootstrap'
import HelpResolveModel from './HelpResolveModel'
class HelpResolve extends Component {
    constructor(props){
        super(props)
        this.state={
            helpdData:[],
            showHelpResolveModel:false,
            singledata : {}
        }
    }
    checkHelpData = async () =>{
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
        const obj = await this.checkHelpData();
        this.setState({helpdData:obj})
      }
      resolveClick = async (e,id) =>{
            e.preventDefault();
            this.setState({showHelpResolveModel:true})
            await this.state.helpdData.forEach(r=>{
                if(r.id===id){
                    console.log(r)
                    this.setState({singledata:r})
                }
            })
      }
  render() {
    let closeHelpResolveModel =() => {this.setState({showHelpResolveModel:false})} 
    return (
        <>
        <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
        <thead>
        <tr><th colSpan={5} className="text-white text-center">Help Requested Resolve</th></tr>
            <tr>
                <th>Id</th>
                <th>Description</th>
                <th>UserType</th>
                <th>Contact</th>              
                <th>Resolve</th>
            </tr>
        </thead>
        <tbody>
            {
            this.state.helpdData.map(record=>{
                return(
                    <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.description}</td>
                    <td>{record.usertype}</td>
                    <td>{record.contact}</td>
                    <td><Button onClick={(e)=>this.resolveClick(e,record.id)}>Resolve</Button></td>                                                
                </tr>)
            })
            }
        </tbody>
  </Table>
  <HelpResolveModel
    data = {this.state.singledata}
  show={this.state.showHelpResolveModel}
  onHide={closeHelpResolveModel}
/>  </>
    )
  }
}

export default HelpResolve