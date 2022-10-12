export interface AuthRequest {
    identifier: string;
    password: string;
  }
  
  export interface UserResponse {
    identifier: string;
    role: string;
  }
  
  export interface LoginResponse {
    identifier: string;
    role: string;
    token: string;
  }
  
  export enum AuthForm {
    identifier = 'email',
    password = 'password'
  }
  
  export enum Role {
    MANAGER='ROLE_MANAGER',
    SUPERVISOR='ROLE_SUPERVISOR',
    STAFF='ROLE_STAFF',
    CUSTOMER='ROLE_CUSTOMER',
    ADMIN = 'ROLE_ADMIN' // Testing Purpose Only, Using the Spring Loan JAR as the Backend
  }
