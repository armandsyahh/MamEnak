import 'fake-indexeddb/auto';

delete window.location;
window.location = { href: jest.fn() };

global.myCustomGlobalFunction = jest.fn();

global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};