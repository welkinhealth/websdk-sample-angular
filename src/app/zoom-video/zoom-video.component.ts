import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-zoom-video',
  templateUrl: './zoom-video.component.html',
  styleUrls: ['./zoom-video.component.scss'],
})
export class ZoomVideoComponent implements OnInit {
  tokenData: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
