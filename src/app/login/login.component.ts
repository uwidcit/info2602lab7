import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group({
      username:'',
      password:''
    });
  }

  ngOnInit(){
    
  }

  async onSubmit(userData){
    const result:any = await this.auth.login(userData);
    
    if('token' in result){
      this.router.navigate(['todos']);
    }

    this.loginForm.reset();
    console.log(userData);
  }

}
