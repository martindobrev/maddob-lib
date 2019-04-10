import { ReadableTimePipe } from './readable-time.pipe';

const minute = 60;
const hour = 60 * minute;
const day = 24 * hour;

describe('ReadableTimePipe', () => {
  const pipe = new ReadableTimePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Format 27 minutes and 17 seconds', () => {
    expect(pipe.transform(27 * minute + 17)).toEqual('27m 17s');
  });

  it('Format 2 hours and 10 minutes 40 seconds', () => {
    expect(pipe.transform(hour * 2 + minute * 10 + 40)).toEqual('2h 10m');
  });

  it('Format 3 days 11 hours and 10 minutes', () => {
    expect(pipe.transform(3 * day + 11 * hour + 10 * minute)).toEqual('3d 11h');
  });

  it('Format only seconds', () => {
    expect(pipe.transform(9)).toEqual('9s');
  });

  it('Format negative numbers returns empty string', () => {
    expect(pipe.transform(-1232323)).toEqual('');
  });

});
