import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCapital( term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;

    // Defino la petición, pero la ejecuto cuando tengo un .subscribe, donde se dispara el observable
    return this.http.get<Country[]>(url);
  }
  
}