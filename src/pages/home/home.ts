import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

import { concatMap } from 'rxjs/operators/concatMap';
import { delay } from 'rxjs/operators/delay';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public cards = [];
  private hasLoaded = false;


  constructor() {

    // the "actual" data, retrieved from e.g. an API
    // create an observable...
    Observable
      // from an array of elements
      .from([{
        imgAvatar: 'assets/imgs/avatar01.jpg',
        name: 'Marty McFly',
        dob: 'November 5, 1955',
        imgCover: 'assets/imgs/poster01.jpg',
        quote: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
        likes: 12,
        comments: 4,
        createdAt: '11h ago'
      },
      {
        imgAvatar: 'assets/imgs/avatar02.jpg',
        name: 'Sarah Connor',
        dob: 'May 12, 1984',
        imgCover: 'assets/imgs/poster02.jpg',
        quote: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.',
        likes: 30,
        comments: 64,
        createdAt: '11h ago'
      },
      {
        imgAvatar: 'assets/imgs/avatar03.jpg',
        name: 'Dr. Ian Malcolm',
        dob: 'June 28, 1990',
        imgCover: 'assets/imgs/poster03.jpg',
        quote: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.',
        likes: 46,
        comments: 66,
        createdAt: '2d ago'
      }])
      // apply the ...
      .pipe(
      // concatMap (map the values from the Array into an inner Observable)
      concatMap((obj: Object) => {
        // returning each value from the Array, delayed by 1.5 seconds
        return Observable
          .of(obj)
          .pipe(
           delay(1500)
          );
      })
      )
      // subscribe to the Observable and push each value
      // into the cards Array.
      .subscribe((card) => {

        this.cards.push(card);

        // we received data, start fading out the 
        // skeleton cards
        this.hasLoaded = true;

      });

  }


}