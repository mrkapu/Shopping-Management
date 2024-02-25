import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  private userpayload:any;
  private fullname$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>(""); 

  constructor() { }

signOut(){
  localStorage.clear();
  
}
setToken(tokenvalue:string){
  localStorage.setItem('token',tokenvalue);

}
getToken(){
  return localStorage.getItem('token');
}
IsLogin():boolean{
  return !!localStorage.getItem('token');

}
public getRoleFromStorage()
  {
    return this.role$.asObservable();
  }
  public setRoleFromStore(role:string){
    this.role$.next(role);
  }
  public getNameFromStorage()
  {
    return this.fullname$.	asObservable();
  }
  public setNameFromStore(unique_name:string){
    this.fullname$.next(unique_name);
  }



decodeTokens()
{
  const jwthelper=new JwtHelperService();
  const token=this.getToken()!;
  console.log(jwthelper.decodeToken(token));
  return jwthelper.decodeToken(token);
}
getFullnameFromToken(){
  if(this.userpayload)
    return this.userpayload.unique_name;
}
getRoleFromToken(){
  if(this.userpayload)
    return this.userpayload.role;
}

}