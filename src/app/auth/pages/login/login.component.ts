import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com',[Validators.required, Validators.email]],
    password: ['123456',[Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(){
    // console.log(this.miFormulario.valid);
    // console.log(this.miFormulario.value);
    const {email, password} = this.miFormulario.value;
    this.authService.login(email,password).subscribe((data)=>{
      console.log(data);
      if((data as boolean) === true){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error',(data as string),'error').then(date=>{
          console.log(date);
          
        })
      }

    });
    
  }

}
