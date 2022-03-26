import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Hero } from "./hero.model"

@Injectable({providedIn: 'root'})
export class HeroesService {
  private heroes: Hero[] = [];
  private heroesUpdated = new Subject<Hero[]>();
  public universes: {universo_id: number, universo: string}[] = [];
  private universesUpdated = new Subject<{universo_id: number, universo: string}[]>();




  constructor(private http: HttpClient) {}

  getUniverses() {
    this.http.get<{universo_id: number, universo: string}[]>('http://localhost:5000/Universe')
    .subscribe((universeData) => {
      this.universes = universeData;
      this.universesUpdated.next([...this.universes]);
    });
  }
  getUniverseUpdateListener() {
    return this.universesUpdated.asObservable();
  }

  getHeroes() {
    this.http.get<Hero[]>('http://localhost:5000/Heros')
    .subscribe((heroesData) => {
      this.heroes = heroesData;
      this.heroesUpdated.next([...this.heroes]);
      console.log(heroesData);
    })
  }

  getHeroUpdateListener() {
    return this.heroesUpdated.asObservable();
  }

  addHero(name: string, powers: string, universe: string) {
    const data = new Date();
    const hero: Hero = {
      hero_id: null,
      heroi: name,
      poder: powers,
      universo: universe,
      data_reg: data.toString(),
      exibir: true,
      imagem: ''
    }
    this.http.post('http://localhost:5000/Heros', {
      heroi: name,
      poder: powers,
      universo: universe,
      dat_reg: data.toString(),
      exibir: true,
      imagem: ''
    })
    .subscribe(responseData => {
      this.heroes.push(hero);
      this.heroesUpdated.next([...this.heroes]);
    })
  }
}
