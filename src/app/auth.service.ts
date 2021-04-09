

export class AuthService {
  isAuthenticated: boolean = false;

  login() {
    this.isAuthenticated = true;
  }
  logout() {
    this.isAuthenticated = false;
  }
}