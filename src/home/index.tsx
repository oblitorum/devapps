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
    const search = this.state.search.trim();
    const filterApps = apps.filter((app) => {
      return app.name.includes(search) || app.desc.includes(search);
    });

    this.setState({
      filterApps
    });
  }

  render() {
    const { filterApps } = this.state;
    var appsArr: AppType[][] = [], i = 0;
    while (filterApps.length > i) {
      var tmpArr: AppType[] = []
      for (var j = 0; i < filterApps.length && j < 3; i++, j++) {
        tmpArr.push(filterApps[i]);
      }
      appsArr.push(tmpArr);
    }

    return (
      <div className="main">
        <div className="container is-fluid navbar-board">
          <nav className="navbar has-background-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <span>DevApps</span>
              </a>
            </div>
          </nav>
        </div>

        <div className="search-board container is-max-desktop">
          <input className="input" type="text" placeholder="Search apps by name or keyword" onKeyDown={this.onSearchEnter.bind(this)} onChange={this.onSearchInput.bind(this)} />
          <button className="button has-background-primary" onClick={this.onSearchClick.bind(this)}>Search</button>
        </div>

        <div className="container is-fullhd app-board">
          {appsArr.map((arr, i) => {
            return (
              <div key={i} className="columns">
                {arr.map((app, j) => {
                  return (
                    <div key={i*3+j} className="column is-one-third">
                      <NavLink
                        to={{
                          pathname: '/exec',
                          state: {appIndex: i*3+j}
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
                  );
                })}
              </div>
            )
          })}
        </div>
        <div className="space"></div>

        <footer className="my-footer has-background-primary has-text-centered">
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