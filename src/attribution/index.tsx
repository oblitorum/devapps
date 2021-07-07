import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'common/navbar';

import 'index.scss';
import 'attribution/index.scss'

export class Attribution extends React.Component {
  render() {

    return (
      <div className="hero is-fullheight">
        <div className="hero-head">
          <Navbar />
        </div>

        <div className="hero-body is-flex-direction-column">
          <div style={{width: "100%"}} className="container is-flex-grow-1">
            <div className="container is-fullhd content-board">
              <div className="content"><h1>Icons</h1></div>
              <div className="columns is-multiline">
                <div className="column is-one-third">
                  <div className="box app-icon">
                    <article className="media">
                      <div className="media-left">
                        <figure className="image is-64x64">
                          <img src={require(`app/json-file.svg`).default} alt="Icon" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <div className="content">
                          <strong className="name">@Smashicons</strong>
                          <div className="desc">
                            <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="box app-icon">
                    <article className="media">
                      <div className="media-left">
                        <figure className="image is-64x64">
                          <img src={require(`app/xml-file.svg`).default} alt="Icon" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <div className="content">
                          <strong className="name">@Prettycons</strong>
                          <div className="desc">
                            <div>Icons made by <a href="https://www.flaticon.com/authors/prettycons" title="prettycons">prettycons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <footer className="p-4 has-text-white has-background-primary has-text-centered">
            <p>
              Copyright © 2021 Oblitorum. All rights reserved.
              <br/>
              <NavLink className="has-text-white" to="/attributions">See attributions</NavLink>
            </p>
          </footer>
        </div>
      </div>
    )
  }
}