import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Home } from './home';
import { useEffect, useState } from 'react';
import { LogoLoading } from './components/LogoLoading';


export function App() {
  const [isLogoLoading, setIsLogoLoading] = useState(true)

  useEffect(() => {
    const timingDelayInSeconds = 1000 * 4

    const delay = setTimeout(() => {
      setIsLogoLoading(false)
    }, timingDelayInSeconds)

    return () => {
      clearTimeout(delay)
    }
  }, [])

  return (
    <>
      {isLogoLoading ? (
        <LogoLoading />
      ) : (
        <>
          <ToastContainer />
          <Home />
        </>
      )}
    </>
  );
}
