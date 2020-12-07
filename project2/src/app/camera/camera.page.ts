import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { DatabaseService } from '../database/services.service';
const { Camera } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  currentImage:any;
  imagedata: any;
  picname:any;
  idnumber:number;
  

  constructor(private sqlite: DatabaseService) {
  }
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imagedata = 'data:image/jpeg;base64,' + image.base64String;
    // Can be set to the src of an image now
    this.currentImage = this.imagedata;
  }
 img(){
this.sqlite.insertData2(this.imagedata);
  console.log(this.imagedata)
}



}