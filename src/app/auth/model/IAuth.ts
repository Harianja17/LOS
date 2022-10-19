export interface AuthRequest {
    nik: string;
    password: string;
  }
  
  export interface UserResponse {
    nik: string;
    roleList: string[];
  }
  
  export interface LoginResponse {
    nik: string;
    role: string;
    token: string;
  }
  
  export enum AuthForm {
    nik = 'nik',
    password = 'password'
  }
  
  export enum Role {
    MANAGER='ROLE_MANAGER',
    SUPERVISOR='ROLE_SUPERVISOR',
    STAFF='ROLE_STAFF',
    CUSTOMER='ROLE_CUSTOMER',
    ADMIN = 'ROLE_ADMIN' 
  }
