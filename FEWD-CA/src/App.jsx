import './App.css'
import Book from './Components/Books'
import Form from './Components/Form'
import {Link, Routes, Route} from 'react-router-dom'

function App(){
  return(
    <>
      <nav>
        <div className='image'>
        
        </div>
        <div className='about-and-contact'>
        
        <Link className='hi' to='/reg'><button className='Register'>Register</button></Link>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Book/>}/>
        <Route path='/reg' element={<Form/>}/>
      </Routes>
    </>
  )
}

export default App