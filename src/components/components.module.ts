import { NgModule } from '@angular/core';
import { SkeletonCardsComponent } from './skeleton-cards/skeleton-cards';
import { IonicModule } from 'ionic-angular/module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
	declarations: [SkeletonCardsComponent],
	imports: [
		IonicModule,
		DirectivesModule
	],
	exports: [SkeletonCardsComponent]
})

export class ComponentsModule { }
