import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maddob-lib components demo';

  data: SomeData = {
    title: 'Hello World',
    content: '# header 1'
  }
}

export interface SomeData {
  title: string;
  content: string;
}
