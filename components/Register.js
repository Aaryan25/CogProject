import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SecreteQuetions from './SecreteQuetions';

function Register() {
    const setDate = (separator='-') =>{
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
    const [showSecreteQue,setShowSecreteQue] =  useState(false);
    const [fname,setFName] = useState("");
    const [lname,setLName] = useState("");
    const [dob,setDOB] = useState(setDate);
    const [contact,setContact] = useState("");
    const [gender,setGender] = useState("Male");
    const [userid,setUserId] = useState("");
    const [usertype,setUserType] = useState("Tutor");
    const [confirmpass,setConfirmPass] = useState("");
    const [pass,setPass] = useState("");
    const [errors,setErros] = useState({});

    const resetForm = () => {
        setShowSecreteQue(false);
        setFName("");
        setLName("");
        setDOB(setDate());
        setContact("");
        setGender("Male");
        setUserId("");
        setUserType("Tutor");
        setConfirmPass("");
        setPass("");
        setErros({});

    }
    const getUsername = async () =>{
        let usernames = await fetch("http://localhost:5177/api/username",
        {
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
        })
        .then(res=>res.json())
        .then(result=>result);
        return await usernames; 
      }

    const handleValidation = async () => {
        
        let errors = {};
        let formIsValid = true;

        if (typeof fname !== "undefined") {
            if (!fname) {
                formIsValid = false;
                errors["fname"] = "Cannot be empty";
              }    
            else if (!fname.match(/^[A-Za-z]*$/)) {
            formIsValid = false;
            errors["fname"] = "Only letters";
          }
        }
        if (typeof lname !== "undefined") {
            if (!lname) {
                formIsValid = false;
                errors["lname"] = "Cannot be empty";
              }    
            else if (!lname.match(/^[A-Za-z]*$/)) {
            formIsValid = false;
            errors["lname"] = "Only letters";
          }
        }
        if (typeof dob !== "undefined") {
            if (!dob) {
                formIsValid = false;
                errors["dob"] = "Cannot be empty";
              }    
        }
        if (typeof contact !== "undefined") {
            if (!contact) {
                formIsValid = false;
                errors["contact"] = "Cannot be empty";
              }    
            else if (!contact.match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["contact"] = "Only numbers";
            }
            else if (contact.length!==10) {
                formIsValid = false;
                errors["contact"] = "10 Digit number is required";
          }
        }
        if (typeof userid !== "undefined") {
            if (!userid) {
                formIsValid = false;
                errors["userid"] = "Cannot be empty";
              }    
        }
        if (typeof pass !== "undefined") {
            if (!pass) {
                formIsValid = false;
                errors["pass"] = "Cannot be empty";
              }    
        }
        if (typeof confirmpass !== "undefined") {
            if (!confirmpass) {
                formIsValid = false;
                errors["confirmpass"] = "Cannot be empty";
              }    
              else if(pass!==confirmpass){
                formIsValid = false;
                errors["confirmpass"] = "Confirm pass should be equal to password";
              }
        }

        let usernaslist = await getUsername();
        console.log(usernaslist)
        if(usernaslist.includes(userid))
        {
            formIsValid = false;
            errors["userid"] = "Username already present";
        }
        setErros(errors);
        return await formIsValid;
      }
    let showModelClose =()=>setShowSecreteQue(false);
  return (
    <Form className='m-auto mt-5' style={{width:"30%"}}> 
     
      <h2 className="text-center mb-4 text-white" style={{width:"100%"}}>Register Page</h2>
        <Form.Group as={Row} className="mb-3" controlId="formFirstName">
            <Form.Label className="text-white" column sm="5">
                First Name
            </Form.Label>
            <Col sm="7">
                <Form.Control required name='fname' type="text" placeholder="Enter First Name" value={fname} onChange={(e)=>setFName(e.target.value)} />
                <span style={{ color: "red" }}>{errors["fname"]}</span>
            </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formLastName">
            <Form.Label className="text-white" column sm="5">
                Last Name
            </Form.Label>
            <Col sm="7">
                <Form.Control required name='lname' type="text" placeholder="Enter Last Name" value={lname} onChange={(e)=>setLName(e.target.value)} />
                <span style={{ color: "red" }}>{errors["lname"]}</span>
            </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formDOB">
            <Form.Label className="text-white" column sm="5">
                Date Of Birth
            </Form.Label>
            <Col sm="7">
                <Form.Control type="Date" name='dob' max={setDate()} required value={dob} onChange={(e)=>{setDOB(e.target.value);console.log(dob)}} />
                <span style={{ color: "red" }}>{errors["dob"]}</span>
            </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formContact">
            <Form.Label className="text-white" column sm="5">
                Contact Number
            </Form.Label>
            <Col sm="7">
                <Form.Control type="tel" required value={contact} onChange={(e)=>setContact(e.target.value)} />
                <span style={{ color: "red" }}>{errors["contact"]}</span>
            </Col>
      </Form.Group>
      <Form.Group as={Row} required className="mb-3" controlId="formGender">
            <Form.Label className="text-white" column sm="5">
                Gender
            </Form.Label>
            <Col sm="3" className='mt-2 text-white'>
            <Form.Check type='radio' id={`male`} label={`Male`} name="gender"
            defaultChecked={gender === "Male"} 
            onClick={(e)=>setGender(e.target.value)} value="Male"  />
            </Col>
            <Col sm="2" className='mt-2 text-white'>
            <Form.Check type='radio' id={`female`} label={`Female`} name="gender"
            defaultChecked={gender === "Female"} 
            onClick={(e)=>setGender(e.target.value)} value="Female" />
            </Col>
            <span style={{ color: "red" }}>{errors["gender"]}</span>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formUserType">
            <Form.Label className="text-white" column sm="5">
                User Category
            </Form.Label>
            <Col sm="7">
                <Form.Select required onChange={(e)=>setUserType(e.target.value)}>
                    <option value="Tutor">Tutor</option>
                    <option value="Student">Student</option>
                </Form.Select>
            </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formUserId">
            <Form.Label className="text-white" column sm="5">
                Username
            </Form.Label>
            <Col sm="7">
                <Form.Control required type="text" placeholder="Enter Username" vlaue={userid} onChange={(e)=>setUserId(e.target.value)}/>
                <span style={{ color: "red" }}>{errors["userid"]}</span>
            </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPass">
            <Form.Label className="text-white" column sm="5">
                Password
            </Form.Label>
            <Col sm="7">
                <Form.Control required type="password" placeholder="Enter Password" vlaue={pass} onChange={(e)=>setPass(e.target.value)}/>
                <span style={{ color: "red" }}>{errors["pass"]}</span>
            </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formConfirmPass">
            <Form.Label className="text-white" column sm="5">
                Confirm Password
            </Form.Label>
            <Col sm="7">
                <Form.Control required type="password" placeholder="Confirm Password" vlaue={confirmpass} onChange={(e)=>setConfirmPass(e.target.value)}/>
                <span style={{ color: "red" }}>{errors["confirmpass"]}</span>
            </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formSubmit">
            <Col sm="6">
                <Button className="col-12" type="submit" value="submit"  onClick={async (e) => {e.preventDefault();if(await handleValidation()){ setShowSecreteQue(true)}}}> Submit </Button>
                <SecreteQuetions
                show={showSecreteQue}
                onHide={showModelClose}
                data = {{               
                    id: 0,
                    firstName: fname,
                    lastName: lname,
                    dob: dob,
                    contact: contact,
                    gender: gender,
                    usertype: usertype,
                    username: userid,
                    pass: pass,                   
            }}
              />   
            </Col>
            <Col sm="6">
            <Button className="col-12 ml-5 btn btn-primary" variant="outline" type="reset" onClick={(e)=>resetForm()} >
            Reset
          </Button>
            </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formSubmit">
      <Link className="btn btn-primary col-12" to="/login">
          Login
        </Link>
        </Form.Group>

  </Form>
  )
}

export default Register