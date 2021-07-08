import { default as xmlFormat } from 'xml-formatter';
import * as fxp from 'fast-xml-parser';
import * as json2csv from 'json2csv';

import { json2CSVAttr } from 'app/json';

export function validateXML(input: string): boolean {
  return fxp.validate(input) === true;
}

export type formatXMLAttr = {
  indentation: string
  collapseContent?: boolean
}

export function formatXML(input: string, attr: formatXMLAttr = {indentation: '    ', collapseContent: true}): string {
  try {
    return xmlFormat(input, attr);
  } catch (e) {
    return '';
  }
}

export type xml2JSONAttr = {
  spaces?: number
  ignoreAttributes?: boolean
  attributeNamePrefix?: string
  textNodeName?: string
}

export function xml2JSON(input: string, attr: xml2JSONAttr = {spaces: 4}): string {
  if (fxp.validate(input) !== true) {
    return '';
  }

  try {
    var jsonObj = fxp.parse(input, attr);
    return JSON.stringify(jsonObj, null, attr.spaces);
  } catch (e) {
    return '';
  }
}

export function xml2CSV(input: string, attr?: json2CSVAttr): string {
  if (fxp.validate(input) !== true) {
    return '';
  }

  try {
    var jsonObj = fxp.parse(input, attr);
    return attr ? json2csv.parse(jsonObj, attr) : json2csv.parse(jsonObj);
  } catch (e) {
    return '';
  }
}
