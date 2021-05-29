import { Component, OnInit } from '@angular/core';
import { IsoundsList } from 'src/app/interfaces/Isounds';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor( private homeService: HomeService) { }

  loading = false;
  soundsList: IsoundsList[] = []
  
  ngOnInit(): void {
    this.showSounds()
  }

  showSounds() {
    this.loading = true
    this.homeService.getSounds().toPromise().then( (res) => {
      this.soundsList = res.sounds
    }).finally( () => {this.loading = false})
  }

}
