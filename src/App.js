import logo from './logo.svg';
import './App.css';
import { Nav } from './components/Nav';
  
import { Todo} from './components/Todo';
import { List } from './components/List';
import { Route, Routes } from 'react-router-dom';
import { Detail } from './Detail';
import { Signup } from './components/Signup';
import { Login } from './components/Login';

function App() {
  return (
    <> 
    <div>
      {/* <Form/> */}
    {/* <Nav/> 
     <Todo/> 
     <List/> */}

<Routes>

<Route path='/' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
  <Route path='todo/:mytodo' element={<Signup/>}/>
  <Route path='/todo' element={<Todo/>}/>
</Routes>





  



    </div>
    


    </>

  );
}

export default App;
