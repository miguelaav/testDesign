import { Injectable } from '@angular/core';

import { News } from '../shared/news';

import { delay,map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
/* rest angular */
import { Restangular } from 'ngx-restangular';
//Handle error
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient,private proccessHTTPMsgService : ProcessHTTPMsgService, 
    private restangular : Restangular) { }

    getNews(): Observable<News[]> {
      return this.restangular.all('api/test').customGET("");
    }

    deleteNews(id : String): Observable<News[]> {
      //this.restangular.remove('api/test/'+id);
      this.restangular.one('api/test/',id).remove();
      return this.restangular.all('api/test').customGET("");
    }
}
