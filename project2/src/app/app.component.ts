import { AfterViewInit, Component } from '@angular/core';
import{SQLiteService} from './sqlite.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public sqlite:SQLiteService
    
  ) {
    this.splashScreen.hide();
    this.initializeApp();
  }

  query =`CREATE TABLE IF NOT EXISTS "user" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "fname" VARCHAR(30) NOT NULL,
    "lname" VARCHAR(30) NOT NULL,
    "username" VARCHAR(30) NOT NULL UNIQUE,
    "password" VARCHAR(30) NOT NULL
    );`; 
    query1 =`CREATE TABLE IF NOT EXISTS "gps" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "latitude" VARCHAR(60) NOT NULL UNIQUE,
      "longitude" VARCHAR(60) NOT NULL
      );`; 
    
      queryimage =`CREATE TABLE IF NOT EXISTS "images" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "imagedata" TEXT
        );`;
        que =`CREATE TABLE IF NOT EXISTS "signaturedata" (
          "id" INTEGER PRIMARY KEY AUTOINCREMENT,
          "imagedata" TEXT
          );`;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngAfterViewInit()
  {
    this.sqlite.initializePlugin();
    setTimeout(()=>{
      this.sqlite.openDB("demo");
      console.log("created")
      this.sqlite.execute(this.query).then(data => console.log(data));
      this.sqlite.execute(this.query1).then(data => console.log(data));
      this.sqlite.execute(this.queryimage).then(data => console.log(data));
      this.sqlite.execute(this.que).then(data => console.log(data));
      
    },5000)
    
    // console.log(query);
    // setTimeout(()=>{
    // },3000)
  }


}


