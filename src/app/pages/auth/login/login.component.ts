import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../interfaces/Auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  auth: Auth = {} as Auth;
  authForm: FormGroup = {} as FormGroup;
  loginError: string | null = null; 
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}
  
  getErrorMessage(controlName: string): string {
    const control = this.authForm.get(controlName);
    if (control?.errors?.['required']) {
      return 'Bắt buộc phải nhập';
    } else if (control?.errors?.['minlength']) {
      return 'Bắt buộc phải nhập lớn hơn 6';
    } else if (control?.errors?.['email']) {
      return 'Phải đúng định dạng email';
    }
    return '';
  }
  handleSubmit(){
    console.log(this.authForm.valid);
    if (this.authForm.valid) {
      console.log(this.authForm.value);
      this.authService.login(this.authForm.value).subscribe({next: (data) =>{
        console.log('Register successfully!', data);
        localStorage.setItem('token', data.token);
        alert("Đăng nhập thành công!")
        this.router.navigate([''])
      },
      error: (err) => {
        console.error("Login failed", err);
        alert(`Register failed!, ${err.error}`);
        if (err.status === 400) {
          if (err.error === 'Incorrect email') {
            this.loginError = 'Email không tồn tại';
          } else if (err.error === 'Incorrect password') {
            this.loginError = 'Mật khẩu không đúng';
          } else {
            this.loginError = 'Email hoặc mật khẩu không đúng';
          }
        } else {
          this.loginError = 'Đăng nhập thất bại. Vui lòng thử lại sau.';
        }
      }
      });
    }
  }
}
