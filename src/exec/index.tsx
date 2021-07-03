import React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { CaretForward } from 'react-ionicons';

import { apps, AppType } from 'app/index';

import 'index.scss'
import 'exec/index.scss'
import { ExecApp, execApps } from './app';

type ExecRouterProps = {
  appIndex: number
};

type ExecProps = RouteComponentProps<{}, {}, ExecRouterProps>

type ExecState = {
  execApps: (ExecApp & {
    input: string
    app: AppType
    selectedOptions: number[]
  })[]
}

export class Exec extends React.Component<ExecProps, ExecState> {
  constructor(props: ExecProps) {
    super(props);
    this.state = {
      execApps: 
        execApps[props.location.state.appIndex]
        ? [{
            ...execApps[props.location.state.appIndex],
            input: '',
            app: apps[props.location.state.appIndex],
            selectedOptions: []
          }]
        : []
    };
  }

  onInputChange(appIndex: number, e: React.ChangeEvent<HTMLTextAreaElement>) {
    var { execApps } = this.state;
    execApps[appIndex].input = e.target.value;
    this.setState({
      execApps
    });
  }

  onSelectOption(appIndex: number, optionIndex: number, e: React.MouseEvent<HTMLElement>) {
    var { execApps } = this.state;
    const existIndex = execApps[appIndex].selectedOptions.indexOf(optionIndex);
    if (existIndex !== -1) {
      execApps[appIndex].selectedOptions.splice(existIndex, 1);
    } else {
      execApps[appIndex].selectedOptions.push(optionIndex);
    }

    this.setState({
      execApps
    });
  }

  genAppOutput(appIndex: number, input: string): string {
    const { execApps } = this.state;
    if (execApps[appIndex].selectedOptions.length === 0) {
      return '';
    }

    var output = '';
    for (var i = 0; i < execApps[appIndex].options.length; i++) {
      if (!execApps[appIndex].selectedOptions.includes(i)) {
        continue;
      }

      output = output ? execApps[appIndex].options[i].handleInput(output) : execApps[appIndex].options[i].handleInput(input);
    }

    return output;
  }

  render() {
    const { execApps } = this.state;

    return (
      <div className="hero is-fullheight">
        <div className="hero-head">
          <nav className="has-text-white has-background-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <span>DevApps</span>
              </a>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container is-fullhd is-flex is-flex-direction-column exec-list">
            {execApps.map((execApp, appIndex) => {
              return (
                <div key={appIndex} className="box app">
                  <div className="app-title">
                    <div className="left has-text-white">{execApp.app.name}</div>
                  </div>
                  <div className="app-content">
                    <div className="app-input">
                      <textarea
                        className={"textarea" + (execApp.input && !execApp.validateInput(execApp.input) ? " is-danger" : " is-primary")}
                        placeholder="paste json data here"
                        onChange={this.onInputChange.bind(this, appIndex)}
                      ></textarea>
                    </div>
                    <div className="app-input-arrow">
                      <div>Input</div>
                      <div>
                        <CaretForward cssClasses={execApp.input? "arrow-icon is-primary" : "arrow-icon is-light"} />
                        <CaretForward cssClasses={execApp.input? "arrow-icon is-primary" : "arrow-icon is-light"} />
                        <CaretForward cssClasses={execApp.input? "arrow-icon is-primary" : "arrow-icon is-light"} />
                      </div>
                    </div>
                    <div className="app-option">
                      {execApp.options.map((option, optionIndex) => {
                        return (
                          <button
                            key={optionIndex}
                            className={
                              "button"
                              + (execApp.selectedOptions.includes(optionIndex) ? " is-primary" : " is-light")
                            }
                            onClick={this.onSelectOption.bind(this, appIndex, optionIndex)}
                            disabled={execApp.input.trim() ? false : true}
                          >
                            {option.name}
                          </button>
                        )
                      })}
                    </div>
                    <div className="app-output-arrow">
                      <div>Output</div>
                      <div>
                        <CaretForward cssClasses={execApp.selectedOptions.length? "arrow-icon is-primary" : "arrow-icon is-light"} />
                        <CaretForward cssClasses={execApp.selectedOptions.length? "arrow-icon is-primary" : "arrow-icon is-light"} />
                        <CaretForward cssClasses={execApp.selectedOptions.length? "arrow-icon is-primary" : "arrow-icon is-light"} />
                      </div>
                    </div>
                    <div className="app-output">
                      <textarea className="textarea is-primary" placeholder="no output" readOnly={true} value={this.genAppOutput(appIndex, execApp.input)}></textarea>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="space"></div>

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