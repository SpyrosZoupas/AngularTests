import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.data = this.http.get<any>('https://localhost:7009/Home/Privacy').toString();
  }
}
