import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/footer.css";
import ScrollToTop from "./components/ScrolltoTop";
import Home from "./pages/Home";
import Bikes from "./pages/NewBikes";
import BikeDetails from "./pages/BikeDetailsPage";
import Outlets from "./components/Outlets/Outlets";
import Service from "./components/Service_Component/Service";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import Finance from "./components/Finance/Finance";
import Brochures from "./components/Brochures/Brochures";
import Insurance from "./components/Insurance/Insurance";
import FAQ from "./components/Faq/FAQ";
import Gallery from "./components/Gallery/Gallery";
import Exchange from "./components/Exchange/Exchange";
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
      path: "/service",
      element: (
        <>
          <Navbar />
          <Service />
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
    },
    {
      path: "/finance",
      element: (
        <>
          <Navbar />
          <Finance />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/brochures",
      element: (
        <>
          <Navbar />
          <Brochures />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/insurance",
      element: (
        <>
          <Navbar />
          <Insurance />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/faq",
      element: (
        <>
          <Navbar />
          <FAQ />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/gallery",
      element: (
        <>
          <Navbar />
          <Gallery />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/exchange",
      element: (
        <>
          <Navbar />
          <Exchange />
          <Footer />
          <ScrollToTop />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
