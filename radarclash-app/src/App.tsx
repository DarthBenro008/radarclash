import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/pages/login';
import Home from '@/pages/home';
import CreateClash from './pages/create-clash';
import ClashRoom from './pages/clash-room';
 
const OKTO_CLIENT_API_KEY = import.meta.env.VITE_OKTO_SDK;
 
function App() {
  return (
    <Router>
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-clash" element={<CreateClash />} />
          <Route path="/clash-room" element={<ClashRoom />} />
        </Routes>
      </OktoProvider>
    </Router>
  );
}
export default App;