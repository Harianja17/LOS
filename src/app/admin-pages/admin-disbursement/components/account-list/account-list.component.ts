import { Component, OnInit } from '@angular/core';
import { Disbursement } from 'src/app/shared/model/disbursement.model';

import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  constructor(private readonly service:ServiceService) { }
  accountList:Disbursement[]=[]
  ngOnInit(): void {
    this.getAccountList();
  }
  pageTitle:string='Disbursement'

  getAccountList(){
    this.accountList=this.service.getAccountList();
  }

}
