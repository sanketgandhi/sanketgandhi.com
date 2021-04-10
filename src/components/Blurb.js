import React from 'react';

import sanket from '../../static/logos/logo-512.png';

export default function Blurb({ title, children }) {
  return (
    <section className="blurb">
      <div className="container">
        <div>
          <h1>{title}</h1>
          {children}
        </div>
        <div>
          <img src={sanket} alt="Sanket" className="avatar" />
        </div>
      </div>
    </section>
  );
}
