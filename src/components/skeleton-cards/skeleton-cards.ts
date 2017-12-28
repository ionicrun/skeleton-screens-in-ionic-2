import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'skeleton-cards',
  templateUrl: 'skeleton-cards.html'
})

export class SkeletonCardsComponent implements OnInit {

  public skeletonCards = [];

  // flag which adds the fade-out CSS class if set to true
  @Input() hasDataLoaded:boolean = false;


  public ngOnInit() {

    // fill the skeletonCards placeholder
    for (let i = 0, j = 3; i < j; i++) {

      this.skeletonCards.push({
        // the default image will show a nice placeholder, no need
        // to define an actual source to an image
        imgAvatar: undefined,
        name: 'Consectetur adipiscing',
        dob: 'January 1, 1970',
        // again, the default image directive takes over nice and easy
        imgCover: undefined,
        quote: 'Etiam a mauris mollis, auctor ante a, mattis libero. Ut eget ipsum pulvinar, varius diam eget, semper augue. Cras ultricies nisi at enim.',
        likes: 12,
        comments: 4,
        createdAt: '11h ago'
      });

    }

  }

}
