import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { DatabaseService } from "../services/database.service";
@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit, AfterViewInit  {
  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;

  constructor(private elementRef: ElementRef,  private sqlite: DatabaseService, 
    private base64ToGallery: Base64ToGallery) { }

  ngOnInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 140;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = '#000000';
  }

  save(): void {
    const imgdata = this.signaturePad.toDataURL();

    this.sqlite.insertData3(imgdata);




    
    // this.base64ToGallery.base64ToGallery(img).then(
    //   res => console.log('Saved image to gallery ', res),
    //   err => console.log('Error saving image to gallery ', err)
    // );
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  // undo() {
  //   const data = this.signaturePad.toData();
  //   if (data) {
  //     data.pop(); // remove the last dot or line
  //     this.signaturePad.fromData(data);
  //   }
  // }
}