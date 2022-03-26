import { HeroesService } from './../heroes.service';
import { Hero } from '../hero.model';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  private heroesSub: Subscription;



  constructor(public heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes();
    this.heroesSub = this.heroesService.getHeroUpdateListener()
    .subscribe((heroes: Hero[]) => {
      this.heroes = heroes;
    });

  }
  onPageChanged(pageData: PageEvent) {
    console.log(pageData)
  }

  ngOnDestroy(): void {
    this.heroesSub.unsubscribe();
  }

}
