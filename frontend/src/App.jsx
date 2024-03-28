import Home from './pages/Home';
import { configWeb3Modal } from './connections'
import "@radix-ui/themes/styles.css";

configWeb3Modal();

function App() {
  return (
  <div>
    <Home />
  </div>
  )
}

export default App
