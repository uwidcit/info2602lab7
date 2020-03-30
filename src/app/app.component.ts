import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ){
    this.loginForm = this.formBuilder.group({
      username:'',
      password:''
    });
  }

  onSubmit(userData){
    this.auth.login(userData);
  }

}
