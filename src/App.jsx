import { useState, useEffect } from 'react'
import Loader from './Loader'

import LandingPage from './LandingPage'

export default function App() {
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    // Show the loader for 2.5s, then reveal the page.
    // Swap this for a real check (e.g. images/data loaded) if you have one.
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])
 
  if (loading) {
    return <Loader />
  }
 
  return <LandingPage />
}