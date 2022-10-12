import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { AdminPagesComponent } from './admin-pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { AdminCreditSubmissionComponent } from './admin-credit-submission/admin-credit-submission.component';
import { AdminDisbursementComponent } from './admin-disbursement/admin-disbursement.component';
import { AdminProspectComponent } from './admin-prospect/admin-prospect.component';
import { AdminSurveyComponent } from './admin-survey/admin-survey.component';
import { DetailComponent } from './admin-disbursement/components/detail/detail.component';
import { ComponentsComponent } from './admin-disbursement/components/transaction/components.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminPagesComponent,
    DashboardComponent,
    AdminApprovalComponent,
    AdminCreditSubmissionComponent,
    AdminDisbursementComponent,
    AdminProspectComponent,
    AdminSurveyComponent,
    DetailComponent,
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class AdminPagesModule { }
