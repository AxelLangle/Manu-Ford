import { useState } from "react";
import "../../css/Hamburger.css";

export default function IconoHamburger() {
 const [isOpen, setIsOpen] = useState(false);
  
 return (
   <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
   </div>
 );
};
