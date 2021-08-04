import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: ['Test4',[Validators.required]],
    email: ['test4@test.com',[Validators.required, Validators.email]],
    password: ['123456',[Validators.required, Validators.minLength(6)]]

  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register(){
    // console.log(this.miFormulario.valid);
    // console.log(this.miFormulario.value);
    const {name, email, password} = this.miFormulario.value;
    this.authService.registro(name,email,password).subscribe(
      async (data) =>{
        if((data as boolean) === true){
          await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Registrado',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error',(data as string),'error');
        }
      }
    );
    
  }

}
