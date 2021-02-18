import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { showValidationMessage } from 'src/utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'enoca-sefaozturkmen';
  showLoginPassword: string = 'password';
  loginPasswordToogle: Boolean = false;
  showRegisterPassword: string = 'password';
  registerPasswordToogle: Boolean = false;
  showConfirmPassword: string = 'password';
  confirmPasswordToogle: Boolean = false;
  errorsMessage: any = {
    required: 'Bu alan boş bırakılamaz.',
    error: 'Geçerli bir değer giriniz.',
    email: 'Geçerli bir e-posta adresi girmelisiniz.',
    passwordPattern: 'Şifreniz rakam, büyük, küçük harf ve en az 8 karakter içermelidir.',
    confirm: 'Şifreler aynı değil.'
  }
  constructor(private fb: FormBuilder) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(
      "^" +
      "(?=.*[0-9])" +
      "(?=.*[a-z])" +   
      "(?=.*[A-Z])" +
      "(?=\\S+$)" + 
      ".{8,}" + 
      "$"
    )])
  })
  get loginEmail(): FormControl {
    return this.loginForm.controls['email'] as FormControl;
  }
  get loginPassword() {
    return this.loginForm.get('password');
  }
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,24}$')]],
    surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,24}$')]],
    registerEmail: ['', [Validators.required, Validators.email]],
    registerPassword: ['', Validators.compose([Validators.required, Validators.pattern(
      "^" +
      "(?=.*[0-9])" + 
      "(?=.*[a-z])" + 
      "(?=.*[A-Z])" +   
      "(?=\\S+$)" + 
      ".{8,}" +    
      "$")])],
    confirmPassword: ['', Validators.compose([Validators.required])]
  }, {
    validator: this.confirmPasswordMatch('registerPassword', 'confirmPassword')
  });
  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  get registerName() {
    return this.registerForm.get('name');
  }
  get registerSurname() {
    return this.registerForm.get('surname')
  }
  get registerEmail() {
    return this.registerForm.get('registerEmail')
  }
  get registerPassword() {
    return this.registerForm.get('registerPassword')
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }
  onChecked() {
    if (this.loginPasswordToogle) {
      this.showLoginPassword = 'password';
      this.loginPasswordToogle = false
    } else {
      this.showLoginPassword = 'text';
      this.loginPasswordToogle = true
    }
  }
  onRegisterPasswordChecked() {
    if (this.registerPasswordToogle) {
      this.showRegisterPassword = 'password';
      this.registerPasswordToogle = false
    } else {
      this.showRegisterPassword = 'text';
      this.registerPasswordToogle = true
    }
  }
  onConfirmPasswordChecked() {
    if (this.confirmPasswordToogle) {
      this.showConfirmPassword = 'password';
      this.confirmPasswordToogle = false
    } else {
      this.showConfirmPassword = 'text';
      this.confirmPasswordToogle = true
    }
  }
  onLoginSubmit() {
    showValidationMessage(this.loginForm);
    if (this.loginForm.invalid) return;
    alert('Veriler consola gönderildi.')
    console.log(this.loginForm.value)
    this.loginForm.reset();
  }
  onRegisterSubmit() {
    showValidationMessage(this.registerForm);
    if (this.registerForm.invalid) return;
    alert('Veriler consola gönderildi.')
    console.log(this.registerForm.value)
    this.registerForm.reset();
  }
  isAgreeSubmit: Boolean = false;
  agreeSubmit() {
    if (this.isAgreeSubmit == false) {
      this.isAgreeSubmit = true;
    } else {
      this.isAgreeSubmit = false;
    }
  }
}