import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseService } from "../services/database.service";
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  

  constructor(private sqlite: DatabaseService, private _router: Router) { }

  contactForm:FormGroup;

  ngOnInit() {
  this.contactForm = new FormGroup({
  
    fname: new FormControl(),
    lname: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),

    });
  }

  onSubmit()
  {
    console.log("hi");
    console.log(this.contactForm.value);
    this.sqlite.insertData(this.contactForm.value.fname,this.contactForm.value.lname,this.contactForm.value.username,this.contactForm.value.password)
  }
  logIn(){
    console.log("this is button tested");
    this._router.navigate(['/login']);
  }
   
  }
