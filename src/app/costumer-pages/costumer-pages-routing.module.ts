import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProspectComponent } from '../admin-pages/admin-prospect/admin-prospect.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CustomerGuard } from '../shared/guard/customer.guard';
import { CostumerApprovalComponent } from './costumer-approval/costumer-approval.component';
import { CostumerCreditSubmissionComponent } from './costumer-credit-submission/costumer-credit-submission.component';
import { TransDetailComponent } from './costumer-disbursement/components/trans-detail/trans-detail.component';
import { TransactionListComponent } from './costumer-disbursement/components/transaction-list/transaction-list.component';
import { CostumerDisbursementComponent } from './costumer-disbursement/costumer-disbursement.component';
import {CostumerPagesComponent} from './costumer-pages.component'
import { CostumerProspectComponent } from './costumer-prospect/costumer-prospect.component';
import { CostumerSurveyComponent } from './costumer-survey/costumer-survey.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path : '',
    component : CostumerPagesComponent,
    canActivate : [AuthGuard, CustomerGuard],
    canActivateChild : [AuthGuard, CustomerGuard],
    children : [
      {
        path : 'home',
        component : HomeComponent
      },
      {
        path : 'approval',
        component : CostumerApprovalComponent
      },
      {
        path : 'credit-submission',
        component : CostumerCreditSubmissionComponent
      },
      {
        path : 'disbursement',
        component : CostumerDisbursementComponent,
        children:[
   
        {
          path:'list',
          component:TransactionListComponent
        },
        {
          path:'details',
          component:TransDetailComponent
        },
        {
          path:'details/:id',
          component:TransDetailComponent
        },
      ]
      },
            {
        path : 'prospect',
        component : CostumerProspectComponent
      },
      {
        path : 'survey',
        component : CostumerSurveyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostumerPagesRoutingModule { }
