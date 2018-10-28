import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import {TimeAgoPipe} from 'time-ago-pipe';
import {MatButtonModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatTableModule,MatCardModule,MatMenuModule, MatIconModule} from '@angular/material';

/* restangular */
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,TimeAgoPipe,HighlightDirective
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    HttpClientModule,
    MatIconModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [{provide: 'BaseURL', useValue: baseURL}],
  bootstrap: [AppComponent]
})
export class AppModule { }
