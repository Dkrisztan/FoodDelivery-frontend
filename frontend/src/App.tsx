import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login.tsx';
import { Home } from './components/Home.tsx';
import { Registration } from './components/Registration.tsx';
import { Profile } from './components/Profile.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Registration />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
