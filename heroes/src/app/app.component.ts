import { Component } from '@angular/core';
import { Hero } from './heroes/hero.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heroes';

  heroes: Hero[] = [];

  onHeroAdded(hero) {
    this.heroes.push(hero);
    console.log(hero);
  }

}
