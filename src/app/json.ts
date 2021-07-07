import * as dJSON from 'dirty-json';
import * as json2csv from 'json2csv';
import * as xmlJS from 'xml-js';

export function validateJSON(input: string): boolean {
  try {
    JSON.parse(input);
  } catch (e) {
    return false;
  }

  return true;
}

export type formatJSONAttr = {
  space: number
}

export function formatJSON(input: string, attr: formatJSONAttr = {space: 4}): string {
  try {
    return JSON.stringify(JSON.parse(input), null, attr.space);
  } catch (e) {
    return '';
  }
}

export function tryToFixJSON(input: string): string {
  try {
    return JSON.stringify(dJSON.parse(input));
  } catch (e) {
    return '';
  }
}

type json2XMLAttr = {
  compact?: boolean
  spaces?: number | string
}

export function json2XML(input: string, attr?: json2XMLAttr): string {
  try {
    return attr ? xmlJS.json2xml(input, attr) : xmlJS.json2xml(input);
  } catch (e) {
    return '';
  }
}

type json2CSVAttr = {
  delimiter?: string
}

export function json2CSV(input: string, attr?: json2CSVAttr): string {
  try {
    return attr ? json2csv.parse(JSON.parse(input), attr) : json2csv.parse(JSON.parse(input));
  } catch (e) {
    return '';
  }
}
