import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Navbar from '../../components/Navbar'
import { createLink, deleteLink, editLink, getLinks } from '../../utils/links'
import {Flash} from '../../components/Flash/flash'

const Dashboard = () => {
  const history = useHistory()
  if(!localStorage.getItem('token')) {
    setTimeout(() => {
      window.flash('You need to be logged in', 'warning')
    }, 100)
    history.push('/')
  }
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      let res = await getLinks(localStorage.getItem('token'))
      console.log(res)
      setData(res.data)
    }
    fetchData()
    return () => {
      'cleanup'
    }
  }, [])
  const handleClick = async e => {
    e.preventDefault()
    console.log(e.target.title.value)
    console.log(e.target.link.value)
    console.log('Submit')
    if (true) {
      console.log('Validated')
      let newLink = (await createLink(
        {title: e.target.title.value, url: e.target.link.value}, 
        localStorage.getItem('token')
      )).data
      console.log(newLink)
      setData([
        {
          _id: newLink.id,
          title: newLink.title,
          link: newLink.url,
          shortened_url: newLink.shortened_url
        },
        ...data
      ])
      window.flash('New Shortened link created successfully', 'success')
      setClicked(false)
    }
  }
  return (
    <div>
      <Navbar /> <br /><hr />
      <Flash />
      Dashboard page <br /> <hr />
      {
      !clicked ? 
      <button onClick={() => {setClicked(true)}}>New URL</button> :
      <form onSubmit={handleClick}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text"  name="title" />
        </div>

        <div>
          <label htmlFor="link">Link</label>
          <input type="url"  name="link" />
        </div>

        <button>Create</button>
      </form>
      
      } <br /> <hr />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
            <th>Shortened URL</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map(ele => {
            return <Link 
                      key={ele._id} 
                      ele={ele}
                      handleDelete={async identifier => {
                        let data = await deleteLink(identifier, localStorage.getItem('token'))
                        console.log(data)
                        setData(data.filter(d => d._id !== ele._id))
                        window.flash('Shortened link deleted successfully', 'success')
                      }} 
                      handleEdit ={async payload =>{
                        await editLink(payload._id, payload)
                        setData(data.map(d => d._id === payload._id? payload : d))
                        window.flash('New Shortened link edited successfully', 'success')
                        setClicked(true)
                      }}
                    />
          })}
        </tbody>
      </table>
    </div>
  )
}

const Link = ({ele, handleDelete, handleEdit}) => {
  return (
    <tr>
      <td>{ele.title}</td>
      <td>{ele.url}</td>
      <td>{ele.shortened_url}</td>
      <td><button onClick={() => {
        let payload = {
          ...ele
        }
        handleEdit(payload)
        }}>Edit</button>
      </td>
      <td><button onClick={() => {handleDelete(ele.identifier)}}>Delete</button></td>
    </tr>
  )
}

export default Dashboard
