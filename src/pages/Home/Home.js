import React from 'react';
import Functionalities from './utils/Functionalities.js';
import HeroSection from './utils/HeroSection.js';
import Footer from 'components/Footer.js';
import Navbar from 'components/Navbar.js';
import PrettyLine from 'components/PrettyLine.js';

function Home() {
  return (
    <>
      <Navbar
        appBarParameters={{ position: "fixed" }}
        scrollToColorParameters={{ transparentBackgroundColor: "transparent", nonTransparentBoxShadow: ""}}
      />
      <HeroSection />
      <PrettyLine />
      <Functionalities />
      <PrettyLine />
      <Footer />
    </>
  );
}

export default Home;