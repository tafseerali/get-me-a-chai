import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingProvider } from "./context/LoadingContext";


export default function MainLayout({ children }) {
  return (
      <div>
        <LoadingProvider>
        <Navbar />
        {children}
      <Footer/>
        </LoadingProvider>
        </div>
  );
}
