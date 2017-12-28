import { Directive, ElementRef, Input, Renderer2, OnDestroy, AfterContentInit } from '@angular/core';


@Directive({
  selector: 'img[src]'
})

export class DefaultImageDirective implements AfterContentInit, OnDestroy {

  // modify the viewBox property to your needs, if you want a 1:1 pixel ration, change it accordingly (e.g. viewBox='0 0 1 1')

  // #1 use this source: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9' style='background-color:#ececec;' />  
  // #2 apply encoding and optimization via https://yoksel.github.io/url-encoder/
  // #3 or modify the sting below directly, it's not that hard

  // the trick here is to use a ratio that comes closest to your final images that are displayed
  // like 16:9 in our scenario, which translates to: viewBox='0 0 16 9'
  private defaultImage: string = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9' style='background-color:%23ececec;' /%3E";

  private preloadImage: HTMLImageElement;
  private unreg: () => void;

  // the actual src attribute of the image element  
  @Input() src;

  constructor(

    private elRef: ElementRef,
    public rdr: Renderer2

  ) {

  }


  public ngAfterContentInit() {

    // get the reference to the actual image element
    let el = this.elRef.nativeElement;

    // if a src is defined and it is not a data uri
    if (this.src && this.src.indexOf('data:') === -1) {

      // construct a new image
      this.preloadImage = this.rdr.createElement('img');

      // listen for the (successful) onload event of the image
      this.unreg = this.rdr.listen(this.preloadImage, 'load', () => {

        // update the current element via the renderer
        this.rdr.setAttribute(el, 'src', this.preloadImage.src);

      });

      // no need to call the onerror since the default image is still in place
      // this.rdr.listen(this.preloadImage, 'error', () => { });

      // try to load the actual image via the preloadImage its src property
      this.rdr.setAttribute(this.preloadImage, 'src', this.src);

      // set the default image as the current image, which creates a nice placeholder
      this.rdr.setAttribute(el, 'src', this.defaultImage);

    }

    // always show a placeholder in case of an undefined src property
    if (!this.src) {
      this.rdr.setAttribute(el, 'src', this.defaultImage);
    }


  }


  public ngOnDestroy() {
    this.unreg && this.unreg();
  }


}
