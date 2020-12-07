import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { SQLiteService } from '../sqlite.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  btn_disabled : boolean = false;
  private _queryUser = "SELECT password FROM user WHERE username = ?";  

  constructor(
    private _SQLiteService: SQLiteService,
    private _router: Router
    ) { }
 
  async onLogin(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this._SQLiteService.query(this._queryUser,[this.loginForm.value.username])
      .then(data => {
        console.log("Returned", data.values)
        this.btn_disabled = true;
        setTimeout(()=>{
          if(data.values.length>0 && data.values[0].password === this.loginForm.value.password){
            // this._SQLiteService.presentToast("Success");
            this._router.navigateByUrl('/home')
            console.log("inside url");
          } else{
            // this._SQLiteService.presentToast("Invaid Username or Password");
            console.log('error');
          }
          this.btn_disabled = false
        }, 1500)
      })
    } else {
      // this._SQLiteService.presentToast("Error:Invalid Inputs")
      console.log("hello")
    }
  }
  register(){
    console.log("this is button tested");
    this._router.navigate(['/register']);
  }

}