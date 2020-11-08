import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {
  endpointUrl: string;
  constructor(private http: HttpClient) {
   this.endpointUrl = environment.apiBaseUrl;
  }

  public listData(model: string, page: string) {
    page = page === '' ? '1' : page;
    return this.http.get(`${this.endpointUrl}/${model}?page=${page}`);
  }

  public getSingleInstance(model: string, id: string) {
    return this.http.get(`${this.endpointUrl}/${model}/${id}`);
  }

  public updateInstance(model: string, instance: any) {
    console.log('saving');
    const instanceToUpdate = {
      ...instance
    };
    delete instanceToUpdate.id;
    return this.http.put(`${this.endpointUrl}/${model}/${instance.id}`, instanceToUpdate);
  }

  public createInstance(model: string, instance: any): Observable<any> {
    return this.http.post(`${this.endpointUrl}/${model}/`, instance)
     .pipe(
       map((resp: any) => {
         instance.id = resp.id;
         return instance;
       })
     );
 }

 public deleteInstance(model: string, id: string) {
   return this.http.delete(`${this.endpointUrl}/${model}/${id}`);
  }
}
