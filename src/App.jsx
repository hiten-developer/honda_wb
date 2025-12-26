import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/footer.css"
import ScrollToTop from "./components/ScrolltoTop";
import Home from "./pages/Home";
import Bikes from "./pages/NewBikes";
import BikeDetails from "./pages/BikeDetailsPage";
import Outlets from "./components/Outlets/Outlets";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/bikes",
      element: (
        <>
          <Navbar />
          <Bikes />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/bike/:id",
      element: (
        <>
          <Navbar />
          <BikeDetails />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
     {
      path: "/outlets",
      element: (
        <>
          <Navbar />
          <Outlets />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <AboutUs />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar />
          <ContactUs />
          <Footer />
          <ScrollToTop />
        </>
      ),
    }
  ]);
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;