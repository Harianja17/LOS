import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostumerPagesRoutingModule } from './costumer-pages-routing.module';
import { HomeComponent } from './home/home.component';
import { CostumerPagesComponent } from './costumer-pages.component';
import { SharedModule } from '../shared/shared.module';
import { CostumerApprovalComponent } from './costumer-approval/costumer-approval.component';
import { CostumerProspectComponent } from './costumer-prospect/costumer-prospect.component';
import { CostumerCreditSubmissionComponent } from './costumer-credit-submission/costumer-credit-submission.component';
import { CostumerSurveyComponent } from './costumer-survey/costumer-survey.component';
import { CostumerDisbursementComponent } from './costumer-disbursement/costumer-disbursement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionListComponent } from './costumer-disbursement/components/transaction-list/transaction-list.component';
import { TransDetailComponent } from './costumer-disbursement/components/trans-detail/trans-detail.component';
import { DetailComponent } from './costumer-disbursement/components/disbursement-form/disbursement-form.component';



@NgModule({
  declarations: [
    CostumerPagesComponent,
    HomeComponent,
    CostumerApprovalComponent,
    CostumerProspectComponent,
    CostumerCreditSubmissionComponent,
    CostumerSurveyComponent,
    CostumerDisbursementComponent,
    TransactionListComponent,
    TransDetailComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CostumerPagesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CostumerPagesModule { }
