import { Component, OnInit, Inject,ChangeDetectorRef } from '@angular/core';

import { NewsService } from './services/news.service';
import { News } from './shared/news';

import { MatTableDataSource } from '@angular/material/table';

import { RouterModule, Routes } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  title = 'testDesign';
  news : News[];
  news0 : Array<String>;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['story_title','created_at','action'];

  errMess : String;
  constructor(private newsService: NewsService,@Inject('BaseURL') private BaseURL,private changeDetectorRefs: ChangeDetectorRef) { }
  ngOnInit() {

  this.refresh();

  }

  refresh() {
    this.newsService.getNews().subscribe(news => {
      this.news = news;
      this.dataSource = new MatTableDataSource(news['data']);
      //console.log(this.dataSource);
    });
  }

  getRecord (row : Object) {
    console.log('test');
    console.log(row);
    window.open(row['story_url'],'_blank');
  }

  deleteRecord (e,row: Object){
    e.stopPropagation();
    console.log(row);
    
    this.newsService.deleteNews(row['_id']).subscribe(news => {
      this.refresh();
      
    });

  }

}

