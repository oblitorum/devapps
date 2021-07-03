import * as dJSON from 'dirty-json';

export function validateJSON(input: string): boolean {
  try {
    JSON.parse(input);
  } catch (e) {
    return false;
  }

  return true;
}

export function formatJSON(input: string): string {
  try {
    return JSON.stringify(JSON.parse(input), null, 2);
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
