import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/pages/login';
import Home from '@/pages/home';
 
const OKTO_CLIENT_API_KEY = import.meta.env.VITE_OKTO_SDK;
 
function App() {
  return (
    <Router>
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </OktoProvider>
    </Router>
  );
}
export default App;