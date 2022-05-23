import React, { FC, useEffect, useState } from 'react'
import { Table, Button, Form } from 'react-bootstrap'
import "./App.css"

const App: FC = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [contact, setContact] = useState<string>("")
  const [users, setUsers] = useState<any>("")
  const [userId, setUsersId] = useState<number>()

  // console.log(name,email,contact);

  //Get Data
  const getData = () => {
    fetch("http://localhost:4000/users").then((res) => {
      res.json().then((data) => {
        console.log(data);
        setUsers(data)
        setName(data[0].name)
        setEmail(data[0].email)
        setContact(data[0].contact)
        setUsersId(data[0].id)
      })
    })
  }

  //Post Data
  const addData = () => {
    const udata = { name, email, contact }
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(udata)
    }).then((res) => {
      res.json().then((data) => {
        console.log({ data });
        getData()
        setName("")
        setEmail("")
        setContact("")
      })
    })
  }

  //Update Data
  const selectUsers=(id:number)=>{
    // console.log(users[id - 1]);
    setName(users[id - 1].name)
    setEmail(users[id - 1].email)
    setContact(users[id - 1].contact) 
    setUsersId(users[id-1].id)
    scrollToTop()
  }

  const updateUser =(id:number)=>{
    // console.log(name,email,contact,userId);
    let data = {name,email,contact,userId}
    fetch(`http://localhost:4000/users/${userId}`,{
      method:"PUT",
      headers:{
        "Accept":"application/json",
        "content-type":"application/json"
      },
      body: JSON.stringify(data)
    }).then((res)=>{
      res.json().then((result)=>{
        console.log(result);
        getData()
      })
    })
    
  }

  //Delete Data 
  const deleteData = (id:number) => {
    fetch(`http://localhost:4000/users/${id}`,{
      method:"DELETE",
    }).then((res)=>{
      res.json().then((data)=>{
        getData()
      })
    })
  }

  const scrollToTop = ()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='App'>
      <h1>Users Component</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Control className='w-50 text-center m-auto  ' type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} /> <br /><br />
        <Form.Control className='w-50 text-center m-auto' type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <Form.Control className='w-50 text-center m-auto' type="text" placeholder='Enter Contact' value={contact} onChange={(e) => setContact(e.target.value)} /><br /><br />
        <Button type='submit' className='m-2' onClick={() => addData()}>Add New User</Button>
        <Button type='submit' onClick={() => updateUser(users.id)}>Update User</Button>
      </Form>

      <h1>Users Table</h1>
      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td>Sr no</td>
            <td>name</td>
            <td>email</td>
            <td>contact</td>
            <td>Action</td>
          </tr>
 
          {
            users && users.map((user: any, k: any) => (
              <tr key={k}>
                <td>{k + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td><Button variant="danger" onClick={() => deleteData(user.id)}>Delete</Button></td>
                <td><Button variant="primary" onClick={() => selectUsers(user.id)}>Update</Button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default App