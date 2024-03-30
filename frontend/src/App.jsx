import Home from './pages/Home';import { 
  createBrowserRouter, 
  Route, 
  createRoutesFromElements, 
  RouterProvider 
} from "react-router-dom";
import Chat from './pages/Chat';
import { configWeb3Modal } from './connections'
import "@radix-ui/themes/styles.css";

configWeb3Modal();

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
  <Route index element={<Home />} />
  <Route path='/chat' element={<Chat />} />
  </Route>
))

function App() {
  return (
  <div className='max-w-[1440px] mx-auto'>
    <RouterProvider router={router} />
  </div>
  )
}

export default App
