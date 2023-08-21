import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete, MdEditAttributes } from 'react-icons/md'

export const List = () => {
  const [data, setData] = useState('')
  const [listData, setListData] = useState([])
  const [edit, setEdit] = useState(false)
  const[editIndex,setEditIndex]=useState()

  function addList(){
 setListData([...listData,data])
 console.log(listData)
 setData('')



  }



   const todoData=(event)=>{

    setData(event.target.value)


   }

  const edits = (index) => {
    setData(listData[index])
     setEdit(true)
     setEditIndex(index)
   
  }



  const cancel = (index)=> {

      console.log(index)

      listData.splice(index, 1)
      setListData([...listData])
    }


  

  const updateList=(index)=>{

    setData(listData[index])
    setEdit(true)



  }

  function updateFunction(index){
     const temparr=([...listData])
     temparr[index]=data
     setListData(temparr)
     setData('')
   

  }



  const arr = listData.map((data, index) => {




    return (


      <div>
        <input type='checkbox' />

        <div>
          <button type='text' onClick={() => { edits(index) }}><AiFillEdit /></button>
          <button type='text' onClick={() => { cancel(index) }}><MdDelete /></button>

        </div>


        <div>





        </div>





      </div>
    )
  }
  )





  return (

    <div>

      <div className='imagecontainer'>

        <h1> TO DO LIST</h1>

        <img className='image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy85A5DrA9ZuHJVkLWXZdw6b-fkuBUMlnIbQ&usqp=CAU' />


      </div>



      <div className='maincontainer'>
        <div className='todocontainer'>


          <input type="text" onChange={todoData} value={data} />





        {edit?  <button type="text" onClick={() => updateFunction(editIndex)}>update</button>:<button type="text" onClick={addList}> Add</button>}      
 
 <h3>List to be done</h3>

    {arr}
 
  </div>
      </div>
      </div>








      )

}
