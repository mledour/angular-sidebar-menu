import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stub-component',
  templateUrl: './stub-component.component.html',
  styleUrls: ['./stub-component.component.css'],
})
export class StubComponentComponent implements OnInit {
  public id?: string | null;
  public url?: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.activatedRoute.url.subscribe((url) => {
      this.url = url.map((segment) => segment.path).join('/');
    });
  }
}
