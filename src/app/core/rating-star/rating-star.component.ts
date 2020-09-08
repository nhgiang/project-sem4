import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent implements OnInit, OnChanges {
  @Input() rating: number;
  arrayrating = [];
  arrayhover = [];

  @Output() event: EventEmitter<number> = new EventEmitter<number>();
  @Output() noevent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.noevent.emit(this.rating);
  }

  ngOnInit() {
  }

  onclick(rating: number) {
    this.arrayrating.push(rating);
    this.rating = this.arrayrating.slice(-1)[0];
    if (this.arrayrating.slice(-2, -1)[0] === rating) {
      this.rating = 0;
      this.arrayrating = [''];
    }
    this.event.emit(this.rating);
  }

  over(arr: number) {
    for (let i = arr; i > 0; i--) {
      this.arrayhover.push(i);
    }
  }

  leave() {
    this.arrayhover = [''];
  }

}
