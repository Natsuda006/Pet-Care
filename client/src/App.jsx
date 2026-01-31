import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="min-h-screen bg-blue-50 font-sans text-base-content flex flex-col">
      <Navbar />
      <main className="p-4 flex-grow"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default App;