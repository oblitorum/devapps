import React from 'react';
import { NavLink } from 'react-router-dom';

import { apps } from 'app/index';

import 'bulma/css/bulma.min.css';
import 'home/index.scss'

export class Home extends React.Component {
  render() {
    var appsArr = [];
    while (apps.length > 0)
      appsArr.push(apps.splice(0, 3))

    return (
      <div className="main">
        <div className="container is-fluid navbar-board">
          <nav className="navbar bg-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <span>DevApps</span>
              </a>
            </div>
          </nav>
        </div>

        <div className="container is-max-desktop search-board">
          <input className="input" type="text" placeholder="Search apps by name or keyword" />
          <button className="button bg-primary">Search</button>
        </div>

        <div className="container is-fullhd app-board">
          {appsArr.map((arr, i) => {
            return (
              <div key={i} className="columns">
                {arr.map((app, j) => {
                  return (
                    <div key={i*3+j} className="column is-one-third">
                      <div className="box app">
                        <article className="media">
                          <div className="media-left">
                            <figure className="image is-64x64">
                              <img src={require(`app/${app.icon}`).default} alt={app.name} />
                            </figure>
                          </div>
                          <div className="media-content">
                            <div className="content">
                              <strong className="name">{app.name}</strong>
                              <p className="desc">{app.desc}</p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          })}
        </div>
        <div className="space"></div>

        <footer className="my-footer bg-primary has-text-centered">
          <p>
            Copyright © 2021 Oblitorum. All rights reserved.
            <br/>
            <NavLink className="has-text-white" to="/attributions">See attributions</NavLink>
          </p>
        </footer>
      </div>
    )
  }
}