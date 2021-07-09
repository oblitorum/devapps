import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="has-text-white has-background-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/">
            <div style={{fontSize: "1.5rem"}} className="navbar-item has-text-white">
              <figure className="image is-24x24 mr-3">
                <img alt="logo" src={require('common/logo.svg').default} />
              </figure>
              <span>DevApps</span>
            </div>
          </NavLink>
        </div>
      </nav>
    )
  }
}