import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Detail = () => {
  const [listData, setListData] = useState([])




        const{mytodo}=useParams();

        useEffect(() => {
            fetch(`https://jsonplaceholder.typicode.com/todos/${mytodo}`)
              .then(response => response.json())
              .then(json => setListData(json))
          }, [])
        
  return (

    <div>
<h1>{listData.title}</h1>

    </div>
  )
}
