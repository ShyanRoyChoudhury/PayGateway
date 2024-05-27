import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import PaymentPage from './PaymentPage';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/paymentpage' element={<PaymentPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
