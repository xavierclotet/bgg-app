import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/services';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule],
  template: `
  <form [formGroup]="loginForm" (ngSubmit)="login()">
    <input name="email" formControlName="email" placeholder="Email" required> 
    <input name="password" formControlName="password" placeholder="Password" required> 
    <button type="submit" [disabled]="loginForm.invalid">Login</button>
    @if (errorMessage) {
      <p>{{errorMessage}}</p>
    }
  </form>
  `,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  errorMessage: string | null= null;
  authService = inject(AuthService);
  fb = inject(NonNullableFormBuilder);

  loginForm = this.fb.group<LoginForm>({
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', Validators.required)
  });

  
  login() {
    if(this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.getRawValue();
    this.authService.login(email, password).subscribe({
      next: () => {
        this.errorMessage = null;
        window.location.href = "/dashboard";
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    })
  }
}
