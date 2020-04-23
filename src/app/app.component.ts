import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

function usernameValidator(control:FormControl):{[s:string]:boolean}
{
  if(!control.value.match(/^a/)){
    return{invalidUser:true};
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm:FormGroup;//对应我们登陆的表单

  username:AbstractControl;//输入用户名的输入控件

  password:AbstractControl;//输入密码的输入控件

  name$:Observable<string>;

  constructor(private fb:FormBuilder){//创建表单
    this.myForm=this.fb.group({
      'username':['',Validators.compose([Validators.required,usernameValidator])],
      'password':['',Validators.compose([Validators.required,Validators.minLength(5)])]
    });
    this.username=this.myForm.controls['username'];
    this.password=this.myForm.controls['password'];
    this.name$=this.username.valueChanges;
    this.username.valueChanges.subscribe(val=>{
      console.log(val);
    });
    this.password.valueChanges.subscribe(val=>{
      console.log(val);
    });
  }
  onSubmit(value:any){
    console.log(value);
  }
}
