import {   Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LanguageService } from '../services/language/language.service';

@Injectable()
export class AuthGuard  {

  status: any;
  constructor(private authService: AuthService, private router: Router, private languageService: LanguageService) {
  }
  handleGuard() {
      const token = localStorage.getItem('testToken');
      return token !== null ? true : this.router.navigateByUrl(`${localStorage.getItem('language')}/login`);
  }

  canActivate() {
      return this.handleGuard();
  }
}
