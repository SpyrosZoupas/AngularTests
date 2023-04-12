import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-test',
  template: `
    <h1>Memory Test</h1>
    <div>{{ memoryUsage }} bytes!</div>
  `,
})
export class MemoryUsageComponent implements OnInit {
  memoryUsage!: number;

  ngOnInit() {
    performance.measure('memoryUsage', 'start', 'end');
    const entries = performance.getEntriesByName('memoryUsage');
    if (entries.length > 0) {
      this.memoryUsage = entries[0].duration;
    } else {
      this.memoryUsage = -1; // measurement not available
    }
  }
}
