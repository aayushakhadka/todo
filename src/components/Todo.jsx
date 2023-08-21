import { toBeInTheDocument } from '@testing-library/jest-dom/matchers'
import React, { useEffect, useState } from 'react'
import './todo.css'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import {BiLogOut} from 'react-icons/bi'


export const Todo = () => {

  const [data, setData] = useState('')
  const [listData, setListData] = useState([])
  const [edit, setEdit] = useState(false)
  const [editIndex, setEditIndex] = useState()
  const [check, setCheck] = useState([])
  // const [title, setTitle] = useState([])
  // const[brief,setBrief]=useState([])

  const[titleData,setTitleData]=useState({
    title:"",
    brief:""


  })


  const [fetchTodo, setFetchTodo] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/todo').then(response => response.json().then(res => setListData(res.data)))
  }, [fetchTodo])



  const cancel = (id,index) => {
    console.log(index)

    listData.splice(index, 1)
    setListData([...listData])
    

    try {
      fetch(`http://localhost:3000/delete-todo/${id}`, {
        headers:{
          'Content-Type':"application/json"
        },
        method: "DELETE",
        body: JSON.stringify({
          title:titleData.title,
          brief:titleData.brief
        })

      })
      setTitleData('')

      setFetchTodo(!fetchTodo)

    }
    catch (error) {
      console.log(error)

    }

  }


  const edits = (id,index) => {
    console.log(id, "iddd")

    setData(listData[index])
    setTitleData({
      title:listData[index].title,
      brief:listData[index].brief
    })
    setEdit(true)
    setEditIndex(id)
  }



  function Addlist() {
    setListData([...listData, data])

    setCheck((prev) => [...prev, false])


    // console.log(title)

    try {
      fetch('http://localhost:3000/todo', {
        headers:{
          'Content-Type':"application/json"
        },
        method: "POST",
        body: JSON.stringify({
          title:titleData.title,
          brief:titleData.brief
        })

      })
      setTitleData('')

      setFetchTodo(!fetchTodo)

    }
    catch (error) {
      console.log(error)

    }


    // 

  }



  const updateList = (index) => {


    setData(listData[data ,index])
    setEdit(true)


  }

   


    

  

  const todoData = (event) => {

    const value=event.target.value
     const name=event.target.name

     setTitleData(prev=>({...prev,[name]:value}))

     console.log(titleData, value, name)
  }

  function updatefunction(id,index) {
    const temparr = [...listData]
    setListData(temparr)
    setEdit(false)
    setData('')
    try {
      fetch(`http://localhost:3000/update-todo/${editIndex}`, {
        headers:{
          'Content-Type':"application/json"
        },
        method: "PUT",
        body: JSON.stringify({
          title:titleData.title,
          brief:titleData.brief
        })
      })

      setTitleData('')
      setFetchTodo(!fetchTodo)




         }
          catch (error) {
            console.log(error)

         }



        }
      
  
  



  const arr = listData?.map((data, index) => {
 console.log(listData)

    return (


      <>

        




        <div className='todoList'>

        
          <div style={{display:'flex', flexDirection:"column"}}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <input className="checkbox" type="checkbox" onChange={() => {
              const temp = [...check]
              temp[index] = !temp[index]
              setCheck(temp)
            }}
              value={check[index]} />

            {check[index] ? <del>{data?.title}</del> : <Link to={`/todo/${data?.id}`}>{data?.title}</Link>}


          </div>
          <p>{data?.brief}</p>
          </div>

          <div className='buttoncontainer'>
            <button onClick={() => { edits(data?._id,index) }} className='edit' ><AiFillEdit /></button>


            <button onClick={() => { cancel(data?._id,index) }} className="edit"><MdDelete /></button>




          </div>
        </div>


      </>

    )
  }
  )

  return (


    <>

    <div style={{display:"flex",flexDirection:"row",justifyContent:"end"}}>
<Link className='route'to='/login'>
      <BiLogOut style={{ height:"30px",width:"30px", marginRight:"40px"}}/>
      
      </Link>
      </div>


      <div className='container'>


        <h2 className="todo">TO DO LIST</h2>
        <img className='image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy85A5DrA9ZuHJVkLWXZdw6b-fkuBUMlnIbQ&usqp=CAU' />



      </div>

      <div className='pcontainer'>
        <p>Simple App to manage your daily to-do</p>

      </div>




      <div className='todoContainer'>



        <div className='maincontainer'>

        <div style={{display:"flex",justifyContent:"left",alignItems:"left"}}> 


<h4 className='title'>Title</h4>


</div>


          <div className='main' >
            <div className='TODO' >




              <input type="text" onChange={todoData} className='inputbox'  placeholder='enter your todo' name='title' value={titleData.title} />

              <h4 className='brief'>Brief</h4>

    <input type="text" onChange={todoData} className='inputbox' placeholder='enter your todo ' name='brief' value={titleData.brief}/>



    {edit ? <button onClick={() => updatefunction(editIndex)} className='button'>update</button> :

                <button onClick={Addlist} className='button'>Add</button>
              }

             <div className='divider'>

             </div>



              <h3 className='list'> List to be done</h3>
              {arr}
            </div>
          </div>

        </div>



      </div>

    </>



  )

}
