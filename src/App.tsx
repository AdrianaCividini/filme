import RoutesApp from "./routes";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Header />
      <RoutesApp />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
