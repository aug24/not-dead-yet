import type { FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import About from './components/About'
import './App.css'

const App: FunctionComponent = () => {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <div className="App">
      <Header />
      {showAbout ? (
        <About onBack={() => setShowAbout(false)} />
      ) : (
        <MainContent />
      )}
      <Footer onAbout={() => setShowAbout(true)} showAboutLink={!showAbout} />
    </div>
  )
}

export default App
