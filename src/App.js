import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import MyTasks from './Pages/MyTasks/MyTasks';
import PageLoading from './Pages/PageLoading/PageLoading';
import RequreAuth from './Pages/RequreAuth/RequreAuth';
import Header from './Pages/Shared/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={
          <RequreAuth>
            <Home />
          </RequreAuth>
        } />
        <Route path='/tasks' element={
          <RequreAuth>
            <MyTasks />
          </RequreAuth>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/loading' element={<PageLoading />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
