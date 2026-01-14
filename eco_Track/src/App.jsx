
import './App.css'
import Header from "./component/header"
import Dashboard from './pages/dashboard'
import Logs from './pages/Logs'
import ScreenSize from './ScreenSize'

function App() {

  return (
    <>
        <Header title = "EcoTrack - exp 1"/>
      <main>
        <Dashboard/>
        <Logs/>
        <ScreenSize/>
      </main>
    </>

)
}

export default App
