import { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="has-text-white has-background-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a style={{fontSize: "1.5rem"}} className="navbar-item has-text-white" href="/">
            <figure className="image is-24x24 mr-3">
              <img src={require('common/logo.svg').default} />
            </figure>
            <span>DevApps</span>
          </a>
        </div>
      </nav>
    )
  }
}