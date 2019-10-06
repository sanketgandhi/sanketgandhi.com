import React, { Component } from 'react';
import sanket from '../../content/images/sanket-avatar.png';
// import patreon from '../../content/thumbnails/patreon.png';
// import kofi from '../../content/thumbnails/kofi.png';

export default class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <div className="flex-author">
            <div className="flex-avatar">
              <img className="avatar" src={sanket} alt="Sanket Gandhi" />
            </div>
            <div>
              <p>
                I’m <strong>Sanket Gandhi</strong>. I document everything I learn when I get time
                and help people how to make the world a better place with quality software
                development tools and practices.{' '}
                {/* <strong>
                  My site has no ads, sponsors, or bullshit. If you enjoy my content, please
                  consider supporting what I do.
                </strong> */}
              </p>

              {/* <div className="flex">
                <a
                  href="https://ko-fi.com/sanketgandhi"
                  className="donate-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={kofi} className="coffee-icon" alt="Coffee icon" />
                  Buy me a coffee
                </a>
                <a
                  className="patreon-button"
                  href="https://www.patreon.com/sanketgandhi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={patreon} height="50" width="50" /> Become a Patron
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </aside>
    );
  }
}
