import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation} from '@capacitor/core';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  latitude: number;
  longitude: number;
  constructor(private sqlite: DatabaseService, private _router: Router) {
    this.getLocation();
  }
  
  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    //console.log(this.latitude+" "+this.longitude);
  }
  gpsForm:FormGroup;

  ngOnInit() {
  
  }
  onGps()
  {
    console.log(this.latitude);
    console.log(this.longitude);
    this.sqlite.insertData1(this.latitude,this.longitude)
  }
  
}
