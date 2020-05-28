import { HelloWorld } from '../lib';

describe('hello-world', () => {
  it('should say hello world', () => {
    expect(HelloWorld).toBe('Hello World');
  });
});
