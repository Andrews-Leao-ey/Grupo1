import { PowersService } from './../../powers/powers.service';
import { Power } from './../../powers/power.model';
import { Subscription } from 'rxjs';
import { HeroesService } from './../heroes.service';
import { Hero } from './../hero.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit} from "@angular/core";
import { MatDialog } from '@angular/material/dialog/dialog';


@Component({
  selector: 'app-heroes-edit',
  templateUrl: './heroes-edit.component.html',
  styleUrls: ['./heroes-edit.component.css']
})
export class HeroesEditComponent implements OnInit, OnDestroy{

  constructor(public heroesService: HeroesService, public powersService: PowersService) {}

  powers: Power[];
  powersFiltered: Power[];
  universes: {universo_id: number, universo: string}[];
  universesFiltered: {universo_id: number, universo: string}[];
  heroForm: FormGroup;
  universesSub: Subscription;
  powersSub: Subscription;

  ngOnInit(): void {

    this.powersService.getPowers();
    this.powersSub = this.powersService.getPowerUpdatedListener()
    .subscribe((powers: Power[]) => {
      this.powers = powers;
      this.powersFiltered = powers;
    });

    // Preenchendo matriz de universos para uso no formulario
    this.heroesService.getUniverses();
    this.universesSub = this.heroesService.getUniverseUpdateListener()
    .subscribe((universes: {universo_id: number, universo: string}[]) => {
      this.universes = universes;
      this.universesFiltered = universes;
    });

    //Building the create form
    this.heroForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'filter': new FormControl(null),
      'powerList': new FormControl(null),
      'filterUniverse': new FormControl(null),
      'universe': new FormControl(null)
    });

    //Variaveis de apoio para filtrar os poderes e universos por nome
    const powerSub = this.heroForm.controls['filter'].valueChanges.subscribe((change) => {
      this.searchPower(change);
    });
    const universeSub = this.heroForm.controls['filterUniverse'].valueChanges.subscribe((universeName) => {
      this.searchUniverse(universeName);
    })
  }

  searchPower(power: string) {
    this.powersFiltered = this.powers.filter(p => p.poder.includes(power));
  }

  searchUniverse(universe: string) {
    this.universesFiltered = this.universes.filter(p => p.universo.includes(universe));
  }

  // onSave() {
  //   console.log('Nome do Herói: ' + this.heroForm.controls['name'].value)
  //   console.log('Poderes escolhidos: ' + this.heroForm.controls['powerList'].value[1])
  //   console.log('Surge um NOVO HERÓI no Universo: ' + this.heroForm.controls['universe'].value)
  //   console.log(this.heroForm)
  // }

  onAddHero() {

    if(this.heroForm.valid) {
      // Converte meu array de poderes em uma string
      const powersAsString = (this.heroForm.controls['powerList'].value).join(',');
      const universeAsString = (this.heroForm.controls['universe'].value).join(',');
      this.heroesService.addHero(
      this.heroForm.controls['name'].value,
      powersAsString,
      universeAsString);
    }
    this.heroForm.reset();
    this.powersFiltered = this.powers;
    this.universesFiltered = this.universes;
  }

  ngOnDestroy(): void {

  }



}
