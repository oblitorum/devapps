import { default as xmlFormat } from 'xml-formatter';
import * as fxp from 'fast-xml-parser';

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
