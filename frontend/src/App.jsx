import './App.css'
import CanvasPage from './pages/CanvasPage'
import { Buffer } from 'buffer';
window.global = window;
window.Buffer = Buffer;

function App() {

  return (
    <>
      <CanvasPage></CanvasPage>
    </>
  )
}

export default App
