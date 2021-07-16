import React from 'react';
import { Link } from 'react-router-dom';

import FooterBG from 'design-system/assets/images/footer-img.jpg';
import LogoMobileWhite from 'design-system/assets/images/logo-mobile-white.svg';
import InstagramLogo from 'design-system/assets/icons/instagram.svg';
import TwitterLogo from 'design-system/assets/icons/twitter.svg';
import FBLogo from 'design-system/assets/icons/facebook.svg';
import YoutubeLogo from 'design-system/assets/icons/youtube.svg';
import PinterestLogo from 'design-system/assets/icons/pinterest.svg';

import './footer.scss';

const Footer = () => {
  return (
    <footer
      className="rf-footer"
      style={{ backgroundImage: `url(${FooterBG})` }}
    >
      <Link className="rf-footer-logo" to="/">
        <img src={LogoMobileWhite} alt="brand logo in footer" />
      </Link>
      <div className="footer-links-container">
        <Link to="/shop?gender=men">men</Link>
        <br className="rf-hide-desktop" />
        <br className="rf-hide-desktop" />
        <Link to="/shop?gender=women">women</Link>
        <br className="rf-hide-desktop" />
        <br className="rf-hide-desktop" />
        <Link to="/about">about</Link>
        <br className="rf-hide-desktop" />
        <br className="rf-hide-desktop" />
        <Link to="/contact">contact</Link>
        <br className="rf-hide-desktop" />
        <br className="rf-hide-desktop" />
        <Link to="/privacy">privacy</Link>
        <br className="rf-hide-desktop" />
        <br className="rf-hide-desktop" />
        <Link to="/terms">terms</Link>
      </div>
      <div className="rf-footer-social-links">
        <a
          href="//pinterest.com"
          target="_blank"
          className="rf-social-link"
          rel="noreferrer"
        >
          <img src={PinterestLogo} alt="Pinterest link" />
        </a>
        <a
          href="//instagram.com"
          target="_blank"
          className="rf-social-link"
          rel="noreferrer"
        >
          <img src={InstagramLogo} alt="Instagram link" />
        </a>
        <a
          href="//facebook.com"
          target="_blank"
          className="rf-social-link"
          rel="noreferrer"
        >
          <img src={FBLogo} alt="Facebook link" />
        </a>
        <br className="rf-hide-desktop" />
        <a
          href="//twitter.com"
          target="_blank"
          className="rf-social-link"
          rel="noreferrer"
        >
          <img src={TwitterLogo} alt="Twitter link" />
        </a>
        <a
          href="//youtube.com"
          target="_blank"
          className="rf-social-link"
          rel="noreferrer"
        >
          <img src={YoutubeLogo} alt="Youtube link" />
        </a>
      </div>
      <p className="rf-margin-t-xxl rf-text-align-c rf-text-sm rf-opacity-60">
        © 2021 Raffinato Apparel | All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
