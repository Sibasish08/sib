import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  panelOpenState = false;
  constructor(public router:Router){}

  logIn(){
    console.log("this is button tested");
    this.router.navigate(['/login']);
  }
  register(){
    console.log("this is button tested");
    this.router.navigate(['/register']);
  }
  camera(){
   // console.log("this is button tested");
    this.router.navigate(['/camera']);
  }
  geolocations(){
    this.router.navigate(['/geolocation']);
  }
  signature(){
    this.router.navigate(['/signature']);
    console.log("signature work")
  }
}
