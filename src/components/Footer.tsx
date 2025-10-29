import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      &copy; {new Date().getFullYear()} ZettaLab
    </footer>
  );
};

export default Footer;
