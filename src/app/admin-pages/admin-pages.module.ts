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
import { AccountListComponent } from './admin-disbursement/components/account-list/account-list.component';
import { TransactionDetailComponent } from './admin-disbursement/components/transaction-detail/transaction-detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from './admin-disbursement/search/search.pipe';
import { MatTableModule } from '@angular/material/table';


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
    ComponentsComponent,
    AccountListComponent,
    TransactionDetailComponent,
    SearchPipe
   
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatTableModule
  ]
})

export class AdminPagesModule { }
