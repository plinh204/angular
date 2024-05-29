import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../interfaces/Auth';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
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
    if (this.authForm.valid) {
      this.authService.register(this.authForm.value).subscribe({next: (data) =>{
        localStorage.setItem('token', data.token);
        alert("Đăng nhập thành công!")
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error("Login failed", err);
        if (err.status === 400) {
          if (err.error.message == 'Incorrect email') {
            this.loginError = 'Email không tồn tại';
          } else if (err.error.message == 'Incorrect password') {
            this.loginError = 'Mật khẩu không đúng';
          } else {
            this.loginError = 'Email hoặc mật khẩu không đúng';
          }
        } else {
          this.loginError = 'Đăng nhập thất bại. Vui lòng thử lại sau.';
        }
      }
      })
    }else{
      this.authService.register(this.authForm.value).subscribe((err) =>{
        console.log("Đăng ký thất bại", err);
        if (err.status === 400) {
          if (err.error.message == 'Incorrect email') {
            this.loginError = 'Email không tồn tại';
          } else if (err.error.message == 'Incorrect password') {
            this.loginError = 'Mật khẩu không đúng';
          } else {
            this.loginError = 'Email hoặc mật khẩu không đúng';
          }
        } else {
          this.loginError = 'Đăng nhập thất bại. Vui lòng thử lại sau.';
        }
      })
    }
  }
}
