import { decode, encode } from 'base-64';

// Polyfill for btoa and atob for React Native
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
