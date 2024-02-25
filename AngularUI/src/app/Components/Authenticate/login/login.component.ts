import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserRegister } from 'src/app/Models/user-register.model';
import { NavigateServiceService } from 'src/app/Services/navigate-service.service';
import { UtilityServiceService } from 'src/app/Services/utility-service.service';
import { UserDetail } from 'src/app/model.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  userDetail:UserRegister=new UserRegister();
  userLogin:UserRegister=new UserRegister();
  errorvalue:string="";
  public resetPasswordEmail!:string;
  public loginForm!: FormGroup;
  public resetFormvalidation!: FormGroup;

  submitted=false;
  submittedregister=false;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(private fb: FormBuilder,
    private toast: NgToastService,
    public router: Router,private navigate:NavigateServiceService,private utilityService:UtilityServiceService) { }
   
    ngOnInit() {
      this.loginForm = this.fb.group({
        loginUsername: ['',Validators.compose([ Validators.required,Validators.email])],
         loginuserPassword: ['', Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(6)])],
       });
       
      this.resetFormvalidation=this.fb.group({
        Usernameemail:['',Validators.compose([ Validators.required,Validators.email])],
        userPassword: ['', Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(6)])],
        userAddress:['',Validators.compose([Validators.required,Validators.maxLength(100),Validators.minLength(15)])],
        mobileNo:['',Validators.compose([Validators.pattern("^[0-9]*$"),Validators.required,Validators.maxLength(10),Validators.minLength(10)])],
        firstname:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(3)])],
        lastName:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(3)])]
      })      

       
     }
     public isValidEmail!: boolean;
     checkValidEmail(event: string) {
       const value = event;
       const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
       this.isValidEmail = pattern.test(value);
       return this.isValidEmail;
     }
   
     hideShowPass() {
       this.isText = !this.isText;
       this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
       this.isText ? (this.type = 'text') : (this.type = 'password');
     }

     get loginFormControl()
     {
        return this.loginForm.controls;
     }
     get registerFormControl()
     {
        return this.resetFormvalidation.controls;
     }

     login() {
      this.submitted=true;
      console.log(this.loginForm.controls);
      if(this.loginForm.valid)
      {
        this.navigate.UserLogin(this.loginForm.get('loginUsername')?.value,
        this.loginForm.get('loginuserPassword')?.value).subscribe((res:any)=>{
        console.log(res.token);
        console.log(res.message);
        if(res.token!="")
       {
          this.utilityService.setToken(res.token);
        
        const tokenPayload=this.utilityService.decodeTokens();
        console.log(tokenPayload);
        this.utilityService.setNameFromStore(tokenPayload.unique_name);
        this.utilityService.setRoleFromStore(tokenPayload.role);
        this.toast.success({detail:'Success',summary:'Login Success',duration:2000});
        this.loginForm.reset();
       }
       else{
        this.errorvalue=res.message;
        this.toast.error({detail:'Error',summary:res.message,duration:2000});
       }
      })
    }
  }

    registerform()
    {
      this.submittedregister=true;
      if(this.resetFormvalidation.valid)
      {
        
        let Firstname =this.resetFormvalidation.get('firstname')?.value;
        let lastName =this.resetFormvalidation.get('lastName')?.value;
        let userAddress =this.resetFormvalidation.get('userAddress')?.value;
        let mobileNo =this.resetFormvalidation.get('mobileNo')?.value;
        let userPassword =this.resetFormvalidation.get('userPassword')?.value;
        let Usernameemail =this.resetFormvalidation.get('Usernameemail')?.value;
      
        let user:UserDetail={
            UserId:0,
            FirstName:Firstname,
            LastName:lastName,
            Address:userAddress,
            Mobile:mobileNo,
            Password:userPassword,
            Username:Usernameemail,
             CreatedAt:'',
            ModifiedAt:''
        };
        
        this.navigate.UserSubmit(user).subscribe((res:any)=>{
         if(res.message=="inserted")
         {
            this.toast.success({detail:'Success',summary:'Record inserted',duration:2000});
            this.resetFormvalidation.reset();
         }
         else{
          this.toast.error({detail:'Error',summary:res.message,duration:2000});
         }
          
        })
        
        

      }    
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\+\ \ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}