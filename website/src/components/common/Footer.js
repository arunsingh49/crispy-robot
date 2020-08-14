import '../css/footer.scss';
import React from 'react';

const Footer = () => {
  return (
    <div className="lsw-footer">
      <div className="lsw-wrapper">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div className="lsw-copyright-footer">
            <p>
              © Copyright 2017 <a href="https://www.wellnez.in">Wellnez.in</a>
              <a href="https://www.wellnez.in/disclaimer"> | Disclaimer</a>
            </p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div className="lsw-social-footer">
            <a href="https://www.facebook.com/wellnez.in/">
              <span className="fa fa-facebook"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
