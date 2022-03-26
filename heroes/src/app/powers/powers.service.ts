import { Power } from './power.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PowersService {
  powers: Power[];
  powersUpdated = new Subject<Power[]>();

  constructor(private http: HttpClient) { }

  getPowers() {
    this.http.get<Power[]>('http://localhost:5000/Power')
    .subscribe((powerData) => {
      this.powers = powerData;
      this.powersUpdated.next([...this.powers]);
    })
  }

  getPowerUpdatedListener() {
    return this.powersUpdated.asObservable();
  }
}
