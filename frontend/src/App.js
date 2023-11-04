import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedPage from './components/ProtectedPage';
import Spinner from './components/Spinner';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Productinfo from './pages/Productinfo';


function App() {

  const { loading } = useSelector(state => state.loaders)


  return (

    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedPage>  <Home />  </ProtectedPage>} />
          <Route path='/product/:id' element={<ProtectedPage>  <Productinfo />  </ProtectedPage>} />
          <Route path='/profile' element={<ProtectedPage>  <Profile />  </ProtectedPage>} />
          <Route path='/admin' element={<ProtectedPage>  <Admin />  </ProtectedPage>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
