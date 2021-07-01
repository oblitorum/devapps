import React from 'react';

export type AppType = {
  name: string
  icon: string
  desc: string
}

export const apps = [
  {
    name: 'JSON Formatter & Validator',
    icon: "json-file.svg",
    desc: 'Format and validate JSON data'
  },
  {
    name: 'JSON Converter',
    icon: "json-file.svg",
    desc: 'Convert JSON to XML, JSON to CSV, etc.'
  }
]

export const AppsContext = React.createContext(
  apps
);