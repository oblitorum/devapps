import React from 'react';
import { formatJSON, json2CSV, json2XML, tryToFixJSON, validateJSON } from "app/json";
import { formatXML, validateXML, xml2JSON } from "app/xml";
import { hashADLER32, hashCRC32, hashMD5, hashSHA1, hashSHA224, hashSHA256, hashSHA384, hashSHA512 } from 'app/hash';

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
    desc: 'Convert JSON to XML, JSON to CSV'
  },
  {
    name: 'XML Formatter & Validator',
    icon: 'xml-file.svg',
    desc: 'Format and validate XML data'
  },
  {
    name: 'XML Converter',
    icon: 'xml-file.svg',
    desc: 'Convert XML to JSON'
  },
  {
    name: "Hash/Checksum Generator",
    icon: 'encryption.svg',
    desc: 'Generates hash/checksum value, supports ADLER32, CRC32, MD5, SHA1, SHA224, SHA256, SHA384 and SHA512'
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
  attributes?: ExecAppOptionAttr[],
  combineAble?: boolean
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
        handleInput: tryToFixJSON,
        combineAble: true
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
  },
  {
    inputHelp: 'input XML data here',
    validateInput: validateXML,
    options: [
      {
        name: 'To JSON',
        attributes: [
          {
            name: 'spaces',
            value: 4,
            help: 'Number of spaces to be used for indenting JSON output'
          },
          {
            name: 'ignore attributes',
            value: true
          },
          {
            name: 'attribute name prefix',
            value: '@_'
          },
          {
            name: 'text node name',
            value: '#text'
          }
        ],
        handleInput: (input: string, attributes?: ExecAppOptionAttrValue[]) => {
          if (attributes?.length === 4) {
            return xml2JSON(input, {
              spaces: attributes[0] as number,
              ignoreAttributes: attributes[1] as boolean,
              attributeNamePrefix: attributes[2] as string,
              textNodeName: attributes[3] as string
            });
          }

          return xml2JSON(input)
        }
      },
      // {
      //   name: 'To CSV',
      //   attributes: [
      //     {
      //       name: 'delimiter',
      //       value: ',',
      //       help: 'delimiter of columns'
      //     }
      //   ],
      //   handleInput: (input: string, attributes?: ExecAppOptionAttrValue[]) => {
      //     if (attributes?.length === 1) {
      //       return xml2CSV(input, {delimiter: attributes[0] as string});
      //     }

      //     return xml2CSV(input);
      //   }
      // }
    ]
  },
  {
    inputHelp: 'input text here',
    validateInput: function(): boolean { return true; },
    options: [
      {
        name: 'ADLER32',
        handleInput: hashADLER32
      },
      {
        name: 'CRC32',
        handleInput: hashCRC32
      },
      {
        name: 'MD5',
        handleInput: hashMD5
      },
      {
        name: 'SHA1',
        handleInput: hashSHA1
      },
      {
        name: "SHA224",
        handleInput: hashSHA224
      },
      {
        name: 'SHA256',
        handleInput: hashSHA256
      },
      {
        name: "SHA384",
        handleInput: hashSHA384
      },
      {
        name: 'SHA512',
        handleInput: hashSHA512
      }
    ]
  }
]
