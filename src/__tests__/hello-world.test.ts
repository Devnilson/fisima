import { HelloWorld } from '../lib';

describe('hello-world', () => {
  it('should say hello world', () => {
    console.log(HelloWorld);
    expect(HelloWorld).toBe('Hello World');
  });
});
