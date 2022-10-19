import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/model/IAuth';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(private route : Router, private authService : AuthService) { }

  nikForView : string = ""
  roleForView : string  = ""
  nameForView:string=""
  roleAdminCheck : Boolean = false

  ngOnInit(): void {
    console.log();
    if(this.authService.getUserFromStorage()?.role){
      this.nikForView = this.authService.getUserFromStorage()!.nik
      console.log(this.authService.getUserFromStorage()?.role);
      
      if(this.authService.getUserFromStorage()?.role!=Role.CUSTOMER){
      this.roleForView = this.authService.getUserFromStorage()!.role.toString().slice(5)
      this.roleAdminCheck = true
    }
    }
    console.log(this.roleAdminCheck+'Entah Apa');
    
  }

  logOut(){
    sessionStorage.clear()
    this.route.navigateByUrl('/login')
  }

  dashboardRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/dashboard')
    else this.route.navigateByUrl('/home')
  }

  prospectRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-prospect')
    else this.route.navigateByUrl('/prospect')
  }

  creditSubmissionRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-credit-submission')
    else this.route.navigateByUrl('/credit-submission')
  }
  surveyRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-survey')
    else this.route.navigateByUrl('/survey')
  }

  approvalRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/admin-approval')
    else this.route.navigateByUrl('/approval')
  }

  disbursementRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/disbursement/transactions')
    else this.route.navigateByUrl('/disbursement/list')
  }
  disbursementDetailRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/disbursement/disbursement-form')
    else this.route.navigateByUrl('/disbursement/form')
  }
}
