import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Home } from './home';


export function App() {
  return (
    <>
      <ToastContainer />
      <Home />
    </>
  );
}
