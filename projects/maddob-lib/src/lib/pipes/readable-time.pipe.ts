import { Pipe, PipeTransform } from '@angular/core';

const SECONDS_MINUTE = 60;
const SECONDS_HOUR = 60 * SECONDS_MINUTE;
const SECONDS_DAY = 24 * SECONDS_HOUR;

/**
 * Transforms values in seconds in readable format
 * 
 * Days is the max displayed period. If more than 2 
 * period types are available, just two are displayed
 * 
 * For example if hours, minutes and seconds are available,
 * seconds are omitted
 * 
 * Check test cases for more details
 * 
 */
@Pipe({
  name: 'readableTime'
})
export class ReadableTimePipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) {
      return '';
    }

    let seconds = value;
    let minutes = seconds / SECONDS_MINUTE;
    let hours = seconds / SECONDS_HOUR;
    let days = value / SECONDS_DAY;

    if (days > 1) {
      days = Math.floor(days);
      seconds = seconds - days * SECONDS_DAY;
      hours = seconds / SECONDS_HOUR;
    }

    if (hours > 1) {
      hours = Math.floor(hours);
      seconds = seconds - hours * SECONDS_HOUR;
      minutes = seconds / SECONDS_MINUTE;
    }

    if (minutes > 1) {
      minutes = Math.floor(minutes);
      seconds = seconds - minutes * SECONDS_MINUTE;
    }

    let parts: Array<string> = [];

    if (days > 1) {
      parts.push(`${days}d`);
    }

    if (hours > 1) {
      parts.push(`${hours}h`);
    }

    if (minutes > 1 && parts.length < 2) {
      parts.push(`${minutes}m`);
    }

    if (parts.length < 2) {
      parts.push(`${seconds}s`);
    }

    return parts.join(' ');
  }

}
