import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section: number = 1;
  title: string = "";
  titleD: string = "";
  year: number = 0;
  movieId: string = "";
  startYear: number = 2000;
  endYear: number = 2001;
  actorId: string = "";

  constructor(private dbService: DatabaseService) {}
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
      console.log(data);
    });
  }
  onGetActors(){
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  //Create a new Movie, POST request
  onSaveMovie() {
    console.log("entered")
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
      console.log(obj)
      console.log("result")
    });
  }
  //Delete Movie
  onDeleteMovieTitle(){
    console.log("Entered" +this.titleD)
    this.dbService.deleteMovie(this.titleD).subscribe(result => {
      console.log("Successfully deleted")
      this.onGetMovies();
    });
  }
   //Delete Movie by Year
   onDeleteMovieByYear(){
    console.log("Entered")
    console.log(this.endYear, this.startYear)
    this.dbService.deleteMovieByYear(this.endYear, this.startYear).subscribe(result => {
      console.log("Successfully deleted")
      this.onGetMovies();
    });
  }

  onSelectUpdateActor(item: { fullName: string; year: number; _id: string; }) {
    this.actorId = item._id;
  }
  onSelectUpdateMovie(item: { title: string; year: number; _id: string; }) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }
  onUpdateMovie() {
    this.dbService.updateMovie(this.movieId, this.actorId).subscribe(result => {
      this.onGetMovies();
    });
  }

  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }

  changeSection(sectionId: number) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }

}
