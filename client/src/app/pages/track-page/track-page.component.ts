import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';

@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css'],
    standalone: false
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id') || '';
  	if (this.trackId) {
      this.spotifyService.getTrack(this.trackId).then((data) => {
        this.track = data;
      });
    }
  }

  formatDuration(ms: number): string {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  getLocalUrl(url: string): string {
    if (!url) return '';
    return url.replace('https://open.spotify.com', '');
  }

}
