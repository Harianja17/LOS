import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonResponse } from 'src/app/shared/model/CommonResponse';
import { AuthService } from '../../service/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService:AuthService
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('successful login should return Login Token', () => {
  //   const sampleToken: any = { token: 'dummyToken' };
  //   let res: CommonResponse<any> = {
  //     message: 'login success',
  //     data: { nik: "00122300" },
  //     code: 0,
  //     status: ''
  //   };
  //   authService.login.and.returnValue(of(res));
  //   component.loginForm.setValue({ identifier: 'dummy', password: 'dummy' });
  //   component.login();

  //   expect(authService.login.calls.count()).toBe(1);
  //   expect(sessionStorage.getItem('user')).toBeTruthy;

  // });
});
