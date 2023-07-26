import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import videojs from 'video.js';

import type Player from 'video.js/dist/types/player';
import type IClip from '../models/clips.model';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class ClipComponent implements OnInit {
  clip?: IClip;
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  player?: Player;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);

    this.route.data.subscribe(data => {
      this.clip = data['clip'] as IClip;

      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4'
      });
    })
  }
}
