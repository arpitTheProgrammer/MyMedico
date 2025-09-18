import { useState } from 'react'

import './App.css'
import Home from './components/Home'
import DocLogin from './components/loginRegister/DocLogin'
import DocSignup from './components/loginRegister/DocSignup'

import { BrowserRouter,Route, Routes} from 'react-router-dom'
import PatLogin from './components/loginRegister/patLogin'
import PatSignup from './components/loginRegister/PatSignup'
import DocLoggedIn from './components/AfterLogged/DocLoggedIn'
import DocProfile from './components/AfterLogged/DocProfile'
import EditProfile from './components/AfterLogged/EditProfile'
import PatLoggedIn from './components/AfterPatientLogin.jsx/PatLoggedIn'
import PatProfile from './components/AfterPatientLogin.jsx/PatProfile'
import SearchDoctor from './components/AfterPatientLogin.jsx/SearchDoctor'

function App() {

  return (
    <>  
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/doctor-login' element={<DocLogin />} />
        <Route exact path='/doctor-signup' element={<DocSignup />} />
        <Route exact path='/pat-login' element={<PatLogin/>} />
        <Route exact path='/pat-signup' element={<PatSignup/>} />
        <Route exact path='/doc-home' element={<DocLoggedIn/>} />
        <Route exact path='/doc-profile' element={<DocProfile/>} />
        <Route exact path='/edit-profile' element={<EditProfile/>} />
        <Route exact path='/pat-home' element={<PatLoggedIn/>} />
        <Route exact path='/edit-pat-profile' element={<PatProfile/>} />
        <Route exact path='/search-doctor' element={<SearchDoctor/>}/>
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App
