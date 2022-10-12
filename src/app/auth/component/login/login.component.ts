import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthRequest, Role } from '../../model/IAuth';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private service : AuthService) { }

  ngOnInit(): void {
  }


  loginForm: FormGroup = new FormGroup({
    identifier : new FormControl(),
    password : new FormControl(),
  })

  clearForm(): void {
    this.loginForm.reset();
  }

  login(){
      if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let data : any = {email:this.loginForm.value['identifier'],
                          password:this.loginForm.value['password']}

      console.log(data);
      
      this.service.login(data).subscribe({
        next : (res : any) => 
        {
          console.log(res)
          let dataSent = {identifier:res.data.email, role:res.data.role, token:res.data.token}
          this.service.storeUser(dataSent) 
          
          Swal.fire({
                  icon: 'success',
                  title: 'Login Success',
                  text: `Welcome ${dataSent.identifier}`
                }).then(() => {
                  if(res.data.role==Role.MANAGER ||res.data.role==Role.SUPERVISOR ||res.data.role==Role.STAFF ||res.data.role==Role.ADMIN){
                    
                    this.router.navigateByUrl("/dashboard")   
                    }
                  else if(res.data.role==Role.CUSTOMER){
                    this.router.navigateByUrl("/home")   
                    }
                }) 
        },
        error : (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: `Invalid login credentials`
          })
        }
      })
    }

  }


  register(){
    Swal.fire('Register button was clicked')
  }
}
