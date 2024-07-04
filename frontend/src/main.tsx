import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'
import './index.css'
import { Provider } from 'react-redux'; 
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.baseURL = "https://quizzen-backend-git-master-hariskhan317s-projects.vercel.app/api/v1";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer
        closeOnClick
        autoClose={1000}
        position="top-center"
      />
      <App />
    </Provider>
  </BrowserRouter>
)
