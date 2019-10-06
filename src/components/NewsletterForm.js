import React, { Component } from 'react';

export default class NewsletterForm extends Component {
  render() {
    return (
      <div className="centered-iframe">
        <iframe
          scrolling="no"
          style={{
            width: '100 % !important',
            height: '220px',
            border: '1px #ccc solid !important',
          }}
          src="https://buttondown.email/sanketgandhi876?as_embed=true"
        />
        {/* <form
          action="https://buttondown.email/api/emails/embed-subscribe/sanketgandhi876"
          method="post"
          target="popupwindow"
          onSubmit="window.open('https://buttondown.email/sanketgandhi876', 'popupwindow')"
          className="embeddable-buttondown-form"
        >
          <label htmlFor="bd-email">Enter your email</label>
          <input type="email" name="email" id="bd-email" />
          <input type="hidden" value="1" name="embed" />
          <input type="submit" value="Subscribe" />
          <p>
            <a href="https://buttondown.email" target="_blank">
              ✨
            </a>
          </p>
        </form> */}
      </div>
    );
  }
}
