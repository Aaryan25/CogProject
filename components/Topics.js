import React, { Component } from 'react'
import {Form,Button,Table} from 'react-bootstrap'
import AddTopicModal from './AddTopicModal'
import TopicUpdateModal from './TopicUpdateModal'
class Topics extends Component {
    constructor(props) {
      super(props)    
      this.state = {
         showTopicModal:false,
         showUpdateModal:false,
         topicData:[],
         data2:[]
      }
    }
    refreshData(){
      fetch("http://localhost:5177/api/Topics").then(response => response.json()).then(data=>this.setState({topicData:data}));
  }
  componentDidMount(){
      this.refreshData();
  }
  componentDidUpdate(previousProps, previousState) {
      if (previousProps.phrase !== this.props.phrase) {
        this.refreshData();
      }
  }
    logoutClick = (e) => {
        window.location = "/"
      }
      backClick = (e) => {
        window.location = "/admindashboard"
        
      }
      updateClick = (e,record)=>{        
          this.setState({data2:record})
          console.log(record);
          this.setState({showUpdateModal:true})
        }
    
  render() {
    const data = this.state.topicData;   
      let closeTopicModal = () => {this.setState({showTopicModal:false})}
      let closeUpdateModal = () => {this.setState({showUpdateModal:false})}

      return (
        <>        <Button className='float-end btn-danger mx-3' onClick={e=>this.logoutClick()} > Logout </Button>

        <Button className='float-end btn-primary mx-2' onClick={e=>this.backClick()} > Back </Button>

        <Form className="m-auto bg-dark mt-2" style={{ width: "100%" }}>
        <h2 className="text-success mb-4" style={{ width: "100%" }}>
          Topic Addition
        </h2>        
      </Form>
      <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
           <thead>
           <tr><th colSpan={6} className="text-white text-center">Available Topics </th></tr>
               <tr>
                   <th>Id</th>
                   <th>Topic Name</th>
                   <th>Start Date</th>
                   <th>End Date</th>
                   <th>Eligible</th>
                   <th>Update Topic</th>

               </tr>
           </thead>
           <tbody>
           {data.map(record=>{                                               
                           return( <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.topicName}</td>
                                <td>{record.startDate}</td>
                                <td>{record.endtDate}</td>
                                <td>{record.eligible}</td>                                                            
                                <td><Button onClick={(e)=>this.updateClick(e,record)}>Update</Button></td>                                                            
                            </tr>)
                      }
                    )}
           </tbody>
     </Table>
     <Button onClick={(e)=>this.setState({showTopicModal:true})}>Add Topics</Button>
      <AddTopicModal 
      show={this.state.showTopicModal}
      onHide={closeTopicModal}
      />
       <TopicUpdateModal 
       data1={this.state.data2}
      show={this.state.showUpdateModal}
      onHide={closeUpdateModal}
      />
      
      </>

    )
  }
}

export default Topics