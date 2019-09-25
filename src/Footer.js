import React from 'react';
import config from './config';

function Footer(props) {
  return (
    <footer className="footer">
      <div className="columns">
        <div className="column has-text-left">
          <p>
            o grze: <a href={`${config.gameAdres}about.html`}>tutaj</a>
          </p>
        </div>
        <div className="column has-text-right">
          <p>
            autor: <a href={config.githubRepo}>A.M.</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
