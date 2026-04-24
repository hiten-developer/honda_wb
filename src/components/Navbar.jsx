import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/nav.css";

const Navbar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const submenuRef = useRef(null);
  const moreButtonRef = useRef(null);

  const submenuItems = [
    { name: "Finance", link: "/finance" },
    { name: "Brochures", link: "/brochures" },
    { name: "Insurance", link: "/insurance" },
    { name: "FAQ", link: "/faq" },
    { name: "Gallery", link: "/gallery" },
    { name: "Exchange", link: "/exchange" },
  ];

  const isMoreActive = submenuItems.some(
    (item) => item.link === location.pathname,
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(
        !(currentScrollPos > prevScrollPos && currentScrollPos > 70),
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        !event.target.closest(".nav-menu") &&
        !event.target.closest(".hamburger")
      ) {
        closeMenu();
      }

      if (moreOpen) {
        const isMoreButton =
          moreButtonRef.current && moreButtonRef.current.contains(event.target);
        const isSubmenu =
          submenuRef.current && submenuRef.current.contains(event.target);

        if (!isMoreButton && !isSubmenu) {
          setMoreOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen, moreOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setMoreOpen(false);
    }
  };

  const toggleMoreMenu = (e) => {
    e.stopPropagation();
    setMoreOpen(!moreOpen);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setMoreOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setMoreOpen(false);
    }
  };

  const handleSubmenuClick = () => {
    setMoreOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

      <section id="nav">
        <nav className={`simple-navbar ${isVisible ? "show" : "hide"}`}>
          <div className="nav-logo">
            <div className="honda-logo">
              <NavLink to="/" onClick={closeMenu}>
                <img
                  src="https://images.dealersites.cardekho.com/2954/logo.png"
                  alt="Honda Logo"
                />
              </NavLink>
            </div>
            <div className="madhika-logo">
              <NavLink to="/" onClick={closeMenu}>
                <img src="images/madhika_logo.png" alt="Madhika Logo" />
              </NavLink>
            </div>
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? "✕" : "☰"}
          </div>

          <div className={`nav-menu ${menuOpen ? "mobile-open" : ""}`}>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/bikes"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              New Bikes
            </NavLink>
            <NavLink
              to="/outlets"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              Outlets
            </NavLink>
            <NavLink
              to="/service"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              Service
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              Contact Us
            </NavLink>

            <div
              className="nav-submenu-container"
              ref={submenuRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                ref={moreButtonRef}
                className={`more-btn ${isMoreActive ? "nav-link-active" : ""} ${moreOpen ? "more-open" : ""}`}
                onClick={toggleMoreMenu}
              >
                More
                <span className="mobile-arrow">▼</span>
              </span>

              <div className={`submenu ${moreOpen ? "show-submenu" : ""}`}>
                {submenuItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    onClick={handleSubmenuClick}
                    className={({ isActive }) =>
                      isActive ? "nav-link-active" : ""
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
