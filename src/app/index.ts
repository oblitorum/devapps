import React from 'react';
import { formatJSON, json2CSV, json2XML, tryToFixJSON, validateJSON } from "app/json";
import { formatXML, validateXML } from "app/xml";

export type AppType = {
  name: string
  icon: string
  desc: string
}

export const apps: AppType[] = [
  {
    name: 'JSON Formatter & Validator',
    icon: "json-file.svg",
    desc: 'Format and validate JSON data'
  },
  {
    name: 'JSON Converter',
    icon: "json-file.svg",
    desc: 'Convert JSON to XML, JSON to CSV, etc.'
  },
  {
    name: 'XML Formatter & Validator',
    icon: 'xml-file.svg',
    desc: 'Format and validate XML data'
  }
]

export const AppsContext = React.createContext(
  apps
);

export type ExecAppOptionAttrValue = boolean | string | number;

export type ExecAppOptionAttr = {
  name: string
  value: ExecAppOptionAttrValue
  help?: string
}

export type ExecAppOption = {
  name: string
  handleInput: (input: string, attributes?: ExecAppOptionAttrValue[]) => string
  attributes?: ExecAppOptionAttr[]
}

export type ExecApp = {
  inputHelp?: string
  validateInput: (input: string) => boolean
  options: ExecAppOption[]
}

export const execApps: ExecApp[] = [
  {
    inputHelp: 'input JSON data here',
    validateInput: validateJSON,
    options: [
      {
        name: "Try to fix",
        handleInput: tryToFixJSON
      },
      {
        name: 'Format',
        attributes: [
          {
            name: "spaces",
            value: 4,
            help: 'Number of spaces to be used for indenting output'
          }
        ],
        handleInput: (input: string, attributes?: ExecAppOptionAttrValue[]) => {
          if (attributes?.length === 1) {
            return formatJSON(input, {space: attributes[0] as number})
          }

          return formatJSON(input)
        }
      }
    ]
  },
  {
    inputHelp: 'input JSON data here',
    validateInput: validateJSON,
    options: [
      {
        name: 'To XML',
        attributes: [
          {
            name: 'header',
            value: true
          },
          {
            name: 'spaces',
            value: 2,
            help: 'Number of spaces to be used for indenting XML output'
          }
        ],
        handleInput: (input: string, attributes?: ExecAppOptionAttrValue[]) => {
          if (attributes?.length === 2) {
            var res = json2XML(input, {
              compact: true,
              spaces: attributes[1] as number
            });
            return (res && attributes[0] as boolean) ? '<?xml version="1.0" encoding="utf-8"?>\n' + res : res;
          }

          return json2XML(input, {compact: true, spaces: 2})
        }
      },
      {
        name: 'To CSV',
        attributes: [
          {
            name: 'delimiter',
            value: ',',
            help: 'delimiter of columns'
          }
        ],
        handleInput: (input: string, attributes?: ExecAppOptionAttrValue[]) => {
          if (attributes?.length === 1) {
            return json2CSV(input, {delimiter: attributes[0] as string});
          }

          return json2CSV(input);
        }
      }
    ]
  },
  {
    inputHelp: 'input XML data here',
    validateInput: validateXML,
    options: [
      {
        name: 'Format',
        attributes: [
          {
            name: "spaces",
            value: 4,
            help: 'Number of spaces to be used for indenting output'
          }
        ],
        handleInput: (input: string, attributes?: ExecAppOptionAttrValue[]) => {
          if (attributes?.length === 1) {
            try {
              return formatXML(input, {indentation: [...new Array(attributes[0] as number)].reduce((pre) => pre + " ", "")});
            } catch (e) {
              return formatXML(input);
            }
          }

          return formatXML(input);
        }
      }
    ]
  }
]
