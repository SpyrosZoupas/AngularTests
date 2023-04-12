import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <div class="load-time">Load time: {{ loadTime }} ms</div>
      <div class="load-time">Memory Usage: {{ memoryUsage }} ms</div>
      <div class="grid-container" [hidden]="isLoading">
        <div class="grid-item" *ngFor="let item of items">
          <img src="/assets/highRes.jpg" alt="placeholder image">
        </div>
      </div>
      <div *ngIf="isLoading">Loading...</div>
    </div>
  `,
  styles: [`
    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    .load-time {
      background-color: #008000;
      color: black;
      padding: 10px;
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
    .grid-item {
      background-color: #eee;
      padding: 20px;
      text-align: center;
    }
  `]
})
export class HomeComponent {
  items = Array.from({ length: 2000 }, (_, i) => i);
  isLoading = true;
  loadTime = 0;
  memoryUsage!: number;

  ngOnInit() {
    const performanceEntries = performance.getEntriesByType('resource');
    const angularComponentUrl = window.location.href;
    const angularComponentEntry = performanceEntries.find(entry => entry.name.includes(angularComponentUrl));

    const startTime = performance.now();
    window.addEventListener('load', () => {
      const endTime = performance.now();
      this.loadTime = Math.round(endTime - startTime);
      this.isLoading = false;
    });

    if (angularComponentEntry) {
      if ('encodedBodySize' in angularComponentEntry) {
        this.memoryUsage = angularComponentEntry.encodedBodySize as number;
      } else if ('decodedBodySize' in angularComponentEntry) {
        this.memoryUsage = angularComponentEntry.decodedBodySize as number;
      } else {
        this.memoryUsage = -1; // measurement not available
      }
    } else {
      this.memoryUsage = -1; // measurement not available
    }
  }
}
