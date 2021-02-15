import { Device } from './device';

describe('Device', () => {
  it('should create an instance', () => {
    expect(new Device('TestSerial','TestDescription',-1)).toBeTruthy();
  });
});
