import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestroService {

  constructor(private http:HttpClient) { }

  //create reataurarnt

 public postRestaurant(data:any){
    
    
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      console.log("inside service");
    return res;

    // public requestRoster(rosterModel : any): Observable<any>{
    //   return this.http.post(this.url ,rosterModel)
  }))
  }

  getReaturnt(){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }

  updateretaurant(data:any,id:number){
  return this.http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
    return res;
  }))
}


deleteRestaurant(id:number){
  return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
    return res;
  }))
}
}
