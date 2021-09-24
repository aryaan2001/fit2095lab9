import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section: number = 1;
  fullName: string = "";
  year: number = 0;
  actorId: string = "";
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    console.log("entered")
    let obj = { name: this.fullName, year: this.year };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
      console.log(obj)
      console.log("result")
    });
  }
  //Update an Actor
  onSelectUpdate(item: { name: string; year: number; _id: string; }) {
    this.fullName = item.name;
    this.year = item.year;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, year: this.year };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item: { _id: string; }) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  } 
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
  }
  changeSection(sectionId: number) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.year = 0;
    this.actorId = "";
  }
}