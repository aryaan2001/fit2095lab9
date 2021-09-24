import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ActorComponent } from "./actor/actor.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MovieComponent } from './movie/movie.component';
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routingTable: Routes=[
  {path: 'actor', component: ActorComponent},
  {path: 'movie', component: MovieComponent}
];

@NgModule({
  declarations: [AppComponent, ActorComponent, MovieComponent],
  imports: [
    RouterModule.forRoot(routingTable),
     BrowserModule, 
     HttpClientModule, 
     FormsModule, NgbModule, ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}