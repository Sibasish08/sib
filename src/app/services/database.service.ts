import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { Plugins } from '@capacitor/core';
import '@capacitor-community/sqlite';
// import { JsonSQLite } from '@capacitor-community/sqlite';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import {SQLiteService} from '../sqlite.service'
const { Device,Storage } = Plugins;

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dbready = new BehaviorSubject(false);
  dbName = '';


  constructor(private http:HttpClient,private alertCtrl:AlertController,public sqlite:SQLiteService) { }



  async init(){
    const info = await Device.getInfo();
  }


  private async setupDatabase(){

  }

  insertData(fname,lname,username,password)
  {
    // let id=this.getUniqueId(2);
    let query=`insert into user (fname,lname,username,password) values('${fname}','${lname}','${username}','${password}')`;
    this.sqlite.execute(query).then(data => {
      console.log(data);
    });
  }
  insertData1(latitude,longitude)
  {
    // let id=this.getUniqueId(2);
    let query1=`insert into gps (latitude,longitude) values('${latitude}','${longitude}')`;
    this.sqlite.execute(query1);
    console.log("insert  gps values successful ");
  }

  insertData2(imagedata)
  {
    // let id=this.getUniqueId(2);
    let queryimage =`insert into images (imagedata) values('${imagedata}')`;
    this.sqlite.execute(queryimage).then(data => {
      console.log(data)
    });
    // console.log("inserting images ");
  }
  insertData3(imagedata)
  {
    let que =`insert into signaturedata (imagedata) values('${imagedata}')`;
    this.sqlite.execute(que);
    console.log("inserting Signature");
  }
   getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

}