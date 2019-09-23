import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@/core/service/authentication.service';
import { fromAuthState } from '@/core/state';
import { Store } from '@ngrx/store';
import { IAppState } from '@/reducers/app.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private store: Store<IAppState>,
      private authenticationService: AuthenticationService
  ) {
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/login']);
      }
  }

  get getLoginForm() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }

  onSubmit() {
    if (this.loginForm.invalid) { return; }
    this.store.dispatch(new fromAuthState.Login(this.getLoginForm.username.value, this.getLoginForm.password.value));
  }
}
