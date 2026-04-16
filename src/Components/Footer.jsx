import React from 'react';

const Footer = () => (
  <footer className="footer-cinema d-flex flex-column align-items-center py-4 mt-5">
    <div className="footer-marquee mb-2">
      <marquee behavior="scroll" direction="left" scrollamount="6">
        🎬 Benvenuto su AlloCiné! Il cinema è la scrittura moderna il cui inchiostro è la luce. – Jean Cocteau 🎬
      </marquee>
    </div>
    <div className="footer-social mb-2">
      <a href="#" className="footer-icon mx-2" title="Instagram"><span role="img" aria-label="Instagram">📸</span></a>
      <a href="#" className="footer-icon mx-2" title="Twitter"><span role="img" aria-label="Twitter">🐦</span></a>
      <a href="#" className="footer-icon mx-2" title="GitHub"><span role="img" aria-label="GitHub">💻</span></a>
    </div>
    <div className="footer-credits text-center">
      <small>AlloCiné &copy; 2026 | Progetto portfolio di <b>Il Tuo Nome</b></small>
    </div>
  </footer>
);

export default Footer;
