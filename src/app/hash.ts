import { default as md5 } from 'md5';
import * as CRC32 from 'crc-32';
import * as ADLER32 from 'adler-32';
import * as hash from 'hash.js';

export function hashMD5(input: string): string {
  return md5(input);
}

export function hashCRC32(input: string): string {
  return (CRC32.str(input) >>> 0).toString(16);
}

export function hashADLER32(input: string): string {
  return (ADLER32.str(input) >>> 0).toString(16);
}

export function hashSHA1(input: string): string {
  return hash.sha1().update(input).digest("hex");
}

export function hashSHA224(input: string): string {
  return hash.sha224().update(input).digest("hex");
}

export function hashSHA384(input: string): string {
  return hash.sha384().update(input).digest("hex");
}

export function hashSHA256(input: string): string {
  return hash.sha256().update(input).digest("hex");
}

export function hashSHA512(input: string): string {
  return hash.sha512().update(input).digest("hex");
}
