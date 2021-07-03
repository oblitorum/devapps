import React from 'react';
import { NavLink } from 'react-router-dom';

import { apps, AppType } from 'app/index';

import 'index.scss';
import 'home/index.scss';

type HomeProps = {};
type HomeState = {
  search: string,
  filterApps: AppType[]
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      filterApps: apps,
      search: '',
      ...props
    };
  }

  onSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      search: e.target.value
    });
  }

  onSearchEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.onSearchClick();
    }
  }

  onSearchClick() {
    const search = this.state.search.toLowerCase().trim();
    const filterApps = apps.filter((app) => {
      return app.name.toLowerCase().includes(search) || app.desc.toLowerCase().includes(search);
    });

    this.setState({
      filterApps
    });
  }

  render() {
    const { filterApps } = this.state;

    return (
      <div className="hero is-fullheight">
        <div className="hero-head">
          <nav className="has-text-white has-background-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a style={{fontSize: "1.5rem"}} className="navbar-item has-text-white" href="/">
                <span>DevApps</span>
              </a>
            </div>
          </nav>
        </div>

        <div className="hero-body is-flex-direction-column">
          <div style={{width: "100%"}} className="container is-flex-grow-1">
            <div className="container is-max-desktop is-flex mb-6">
              <input className="input mr-2" type="text" placeholder="Search apps by name or keyword" onKeyDown={this.onSearchEnter.bind(this)} onChange={this.onSearchInput.bind(this)} />
              <button className="button is-primary" onClick={this.onSearchClick.bind(this)}>Search</button>
            </div>

            <div className="container is-fullhd app-board">
              <div className="columns is-multiline">
              {filterApps.map((app, i) => {
                return (
                  <div key={i} className="column is-one-third">
                    <NavLink
                      to={{
                        pathname: '/exec',
                        state: {appIndex: i}
                      }}
                    >
                      <div className="box app is-clickable">
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
                    </NavLink>
                  </div>
                )
              })}
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