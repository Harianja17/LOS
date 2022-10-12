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

  identifierForView : string = ""
  roleForView : string  = ""
  roleAdminCheck : Boolean = false

  ngOnInit(): void {
    console.log();
    if(this.authService.getUserFromStorage()?.role){
      this.identifierForView = this.authService.getUserFromStorage()!.identifier
      if(this.authService.getUserFromStorage()?.role!==Role.CUSTOMER){
      this.roleForView = this.authService.getUserFromStorage()!.role.toString().slice(5)
      this.roleAdminCheck = true
    }
    }
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
    if(this.roleAdminCheck) this.route.navigateByUrl('/disbursement/transaction')
    else this.route.navigateByUrl('/disbursement')
  }
  disbursementDetailRoute(){
    if(this.roleAdminCheck) this.route.navigateByUrl('/disbursement/detail')
    else this.route.navigateByUrl('/disbursement')
  }
}
