import React from 'react';
import { NavLink, RouteComponentProps, Redirect } from 'react-router-dom';
import { CaretForward, CaretDown, OptionsOutline } from 'react-ionicons';

import { apps, AppType, ExecApp, execApps, ExecAppOptionAttrValue } from 'app/index';
import Navbar from 'common/navbar';

import 'index.scss'
import 'exec/index.scss'

type ExecRouterProps = {
  appIndex: number
};

type ExecProps = RouteComponentProps<{}, {}, ExecRouterProps>

type ExecState = {
  execApps: (ExecApp & {
    input: string
    app: AppType
    selectedOptions: number[]
  })[],
  optionAttrs: ExecAppOptionAttrValue[][][],
  activeOptionMenu: string
}

export class Exec extends React.Component<ExecProps, ExecState> {
  constructor(props: ExecProps) {
    super(props);

    var stateExecApps =
      props.location.state?.appIndex >= 0 && execApps[props.location.state.appIndex]
      ? [{
          ...execApps[props.location.state.appIndex],
          input: '',
          app: apps[props.location.state.appIndex],
          selectedOptions: []
        }]
      : [];

    var optionAttrs: ExecAppOptionAttrValue[][][] = [];
    for (const execApp of stateExecApps) {
      var secondArr: ExecAppOptionAttrValue[][] = [];

      for (const option of execApp.options) {
        var thirdArr: ExecAppOptionAttrValue[] = [];
        const that = this;
        thirdArr = thirdArr.concat(option.attributes ? option.attributes.map(function(attr) {
          return that.attrValueToInput(attr.value);
        }) : []);

        secondArr.push(thirdArr);
      }

      optionAttrs.push(secondArr);
    }

    this.state = {
      execApps: stateExecApps,
      optionAttrs,
      activeOptionMenu: ""
    };
  }

  attrValueToInput(value: ExecAppOptionAttrValue): ExecAppOptionAttrValue {
    switch (typeof value) {
      case "number":
        return value.toString();
      default:
        return value;
    }
  }

  inputToAttrValue(expected: ExecAppOptionAttrValue, value: ExecAppOptionAttrValue): ExecAppOptionAttrValue {
    switch (typeof expected) {
      case "number":
        return parseInt(value as string, 10);
      default:
        return value;
    }
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

  onOptionAttrInputChange(appIndex: number, optionIndex: number, attrIndex: number, e: React.ChangeEvent<HTMLInputElement>) {
    var { optionAttrs } = this.state;
    switch (typeof optionAttrs[appIndex][optionIndex][attrIndex]) {
      case "boolean":
        optionAttrs[appIndex][optionIndex][attrIndex] = e.target.checked;
        break;
      default:
        optionAttrs[appIndex][optionIndex][attrIndex] = e.target.value;
        break;
    }

    this.setState({
      optionAttrs
    });
  }

  genAppOutput(appIndex: number, input: string): string {
    const { execApps, optionAttrs } = this.state;
    if (execApps[appIndex].selectedOptions.length === 0) {
      return '';
    }

    var output = '';
    for (var i = 0; i < execApps[appIndex].options.length; i++) {
      if (!execApps[appIndex].selectedOptions.includes(i)) {
        continue;
      }

      var attrValues: ExecAppOptionAttrValue[] = [];
      for (var j = 0; j < optionAttrs[appIndex][i].length; j++) {
        if (execApps[appIndex].options[i].attributes && j < execApps[appIndex].options[i].attributes!.length) {
          attrValues.push(this.inputToAttrValue(execApps[appIndex].options[i].attributes![j].value, optionAttrs[appIndex][i][j]));
        }
      }
      output = output ? execApps[appIndex].options[i].handleInput(output, attrValues) : execApps[appIndex].options[i].handleInput(input, attrValues);
    }

    return output;
  }

  toggleOptionMenu(appIndex: number, optionIndex: number, e: React.MouseEvent<HTMLElement>) {
    var { activeOptionMenu } = this.state;
    var activeOptionMenuStr = this.genActiveOptionMenuStr(appIndex, optionIndex);

    activeOptionMenu = activeOptionMenu === activeOptionMenuStr ? "" : activeOptionMenuStr;
    this.setState({
      activeOptionMenu
    });
  }

  genActiveOptionMenuStr(appIndex: number, optionIndex: number): string {
    return `${appIndex}-${optionIndex}`;
  }

  render() {
    const { execApps, optionAttrs, activeOptionMenu } = this.state;

    if (execApps.length === 0) {
      return (
        <Redirect
          to="/"
        />
      );
    }

    return (
      <div className="hero is-fullheight">
        <div className="hero-head">
          <Navbar />
        </div>

        <div className="hero-body is-hidden-touch">
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
                        placeholder={execApp.inputHelp}
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
                          <div key={optionIndex} className="field has-addons">
                            <p className="control">
                              <button
                                className={
                                  "button"
                                  + (execApp.selectedOptions.includes(optionIndex) ? " is-primary" : " is-light")
                                }
                                onClick={this.onSelectOption.bind(this, appIndex, optionIndex)}
                                disabled={execApp.input.trim() ? false : true}
                              >
                                {option.name}
                              </button>
                            </p>
                            {
                              option.attributes && option.attributes.length > 0
                              ? <div className="control">
                                  <button
                                    className={
                                      "button"
                                      + (execApp.selectedOptions.includes(optionIndex) ? " is-primary" : " is-light")
                                    }
                                    aria-haspopup="true"
                                    onClick={this.toggleOptionMenu.bind(this, appIndex, optionIndex)}
                                  >
                                    {execApp.selectedOptions.includes(optionIndex)
                                      ? <OptionsOutline
                                          cssClasses={"option-icon is-active"}
                                        />
                                      : <OptionsOutline
                                          cssClasses={"option-icon"}
                                        />
                                    }
                                  </button>
                                  <div className={"modal" + (activeOptionMenu === this.genActiveOptionMenuStr(appIndex, optionIndex) ? " is-active" : "")}>
                                    <div className="modal-background" onClick={this.toggleOptionMenu.bind(this, appIndex, optionIndex)}></div>
                                    <div className="modal-card">
                                      <header className="modal-card-head">
                                        <p className="modal-card-title">{option.name}</p>
                                        <button className="delete" aria-label="close" onClick={this.toggleOptionMenu.bind(this, appIndex, optionIndex)}></button>
                                      </header>
                                      <section className="modal-card-body">
                                        {execApp.options[optionIndex].attributes?.map((attr, attrIndex) => {
                                          switch (typeof attr.value) {
                                            case "number":
                                              return (
                                                <div key={attrIndex} className="field">
                                                  <label className="label">{attr.name}</label>
                                                  <p className="control">
                                                    <input className="input is-primary" type="number" placeholder={attr.help} min="0" value={optionAttrs[appIndex][optionIndex][attrIndex] as string} onChange={this.onOptionAttrInputChange.bind(this, appIndex, optionIndex, attrIndex)} />
                                                  </p>
                                                </div>
                                              )
                                            case "boolean":
                                              return (
                                                <div key={attrIndex} className="field">
                                                  <label className="label">{attr.name}</label>
                                                  <div className="control">
                                                    <label className="checkbox">
                                                      <input type="checkbox" checked={optionAttrs[appIndex][optionIndex][attrIndex] as boolean} onChange={this.onOptionAttrInputChange.bind(this, appIndex, optionIndex, attrIndex)} />
                                                    </label>
                                                  </div>
                                                </div>
                                              )
                                            default:
                                              return (
                                                <div key={attrIndex} className="field">
                                                  <label className="label">{attr.name}</label>
                                                  <p className="control">
                                                    <input className="input is-primary" type="text" placeholder={attr.help} value={optionAttrs[appIndex][optionIndex][attrIndex] as string} onChange={this.onOptionAttrInputChange.bind(this, appIndex, optionIndex, attrIndex)} />
                                                  </p>
                                                </div>
                                              )
                                          }
                                        })}
                                      </section>
                                    </div>
                                  </div>
                                </div>
                              : ''
                            }
                          </div>
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
        <div className="hero-body is-hidden-desktop pl-0 pr-0 pb-0">
          <div className="container pl-5 pr-5 pb-6 is-fullhd is-flex is-flex-direction-column exec-list">
            {execApps.map((execApp, appIndex) => {
              return (
                <div key={appIndex} className="box app-mobile">
                  <div className="app-title">
                    <div className="left has-text-white">{execApp.app.name}</div>
                  </div>
                  <div className="app-content">
                    <div className="app-input">
                      <textarea
                        className={"textarea" + (execApp.input && !execApp.validateInput(execApp.input) ? " is-danger" : " is-primary")}
                        placeholder={execApp.inputHelp}
                        onChange={this.onInputChange.bind(this, appIndex)}
                      ></textarea>
                    </div>
                    <div className="app-input-arrow">
                      <div className="left">Input</div>
                      <div className="right">
                        <div><CaretDown cssClasses={execApp.input? "arrow-icon is-primary" : "arrow-icon is-light"} /></div>
                        <div><CaretDown cssClasses={execApp.input? "arrow-icon is-primary" : "arrow-icon is-light"} /></div>
                        <div><CaretDown cssClasses={execApp.input? "arrow-icon is-primary" : "arrow-icon is-light"} /></div>
                      </div>
                    </div>
                    <div className="app-option">
                      {execApp.options.map((option, optionIndex) => {
                        return (
                          <div key={optionIndex} className="addons-wrapper">
                            <div key={optionIndex} className="field has-addons">
                              <p className="control">
                                <button
                                  className={
                                    "button"
                                    + (execApp.selectedOptions.includes(optionIndex) ? " is-primary" : " is-light")
                                  }
                                  onClick={this.onSelectOption.bind(this, appIndex, optionIndex)}
                                  disabled={execApp.input.trim() ? false : true}
                                >
                                  {option.name}
                                </button>
                              </p>
                              {
                                option.attributes && option.attributes.length > 0
                                ? <div className="control">
                                    <button
                                      className={
                                        "button"
                                        + (execApp.selectedOptions.includes(optionIndex) ? " is-primary" : " is-light")
                                      }
                                      aria-haspopup="true"
                                      onClick={this.toggleOptionMenu.bind(this, appIndex, optionIndex)}
                                    >
                                      {execApp.selectedOptions.includes(optionIndex)
                                        ? <OptionsOutline
                                            cssClasses={"option-icon is-active"}
                                          />
                                        : <OptionsOutline
                                            cssClasses={"option-icon"}
                                          />
                                      }
                                    </button>
                                    <div className={"modal" + (activeOptionMenu === this.genActiveOptionMenuStr(appIndex, optionIndex) ? " is-active" : "")}>
                                      <div className="modal-background" onClick={this.toggleOptionMenu.bind(this, appIndex, optionIndex)}></div>
                                      <div className="modal-card">
                                        <header className="modal-card-head">
                                          <p className="modal-card-title">{option.name}</p>
                                          <button className="delete" aria-label="close" onClick={this.toggleOptionMenu.bind(this, appIndex, optionIndex)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                          {execApp.options[optionIndex].attributes?.map((attr, attrIndex) => {
                                            switch (typeof attr.value) {
                                              case "number":
                                              return (
                                                <div key={attrIndex} className="field">
                                                  <label className="label">{attr.name}</label>
                                                  <p className="control">
                                                    <input className="input is-primary" type="number" placeholder={attr.help} min="0" value={optionAttrs[appIndex][optionIndex][attrIndex] as string} onChange={this.onOptionAttrInputChange.bind(this, appIndex, optionIndex, attrIndex)} />
                                                  </p>
                                                </div>
                                              )
                                            case "boolean":
                                              return (
                                                <div key={attrIndex} className="field">
                                                  <label className="label">{attr.name}</label>
                                                  <div className="control">
                                                    <label className="checkbox">
                                                      <input type="checkbox" checked={optionAttrs[appIndex][optionIndex][attrIndex] as boolean} onChange={this.onOptionAttrInputChange.bind(this, appIndex, optionIndex, attrIndex)} />
                                                    </label>
                                                  </div>
                                                </div>
                                              )
                                            default:
                                              return (
                                                <div key={attrIndex} className="field">
                                                  <label className="label">{attr.name}</label>
                                                  <p className="control">
                                                    <input className="input is-primary" type="text" placeholder={attr.help} value={optionAttrs[appIndex][optionIndex][attrIndex] as string} onChange={this.onOptionAttrInputChange.bind(this, appIndex, optionIndex, attrIndex)} />
                                                  </p>
                                                </div>
                                              )
                                            }
                                          })}
                                        </section>
                                      </div>
                                    </div>
                                  </div>
                                : ''
                              }
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="app-output-arrow">
                      <div className="left">Output</div>
                      <div className="right">
                        <div><CaretDown cssClasses={execApp.selectedOptions.length? "arrow-icon is-primary" : "arrow-icon is-light"} /></div>
                        <div><CaretDown cssClasses={execApp.selectedOptions.length? "arrow-icon is-primary" : "arrow-icon is-light"} /></div>
                        <div><CaretDown cssClasses={execApp.selectedOptions.length? "arrow-icon is-primary" : "arrow-icon is-light"} /></div>
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