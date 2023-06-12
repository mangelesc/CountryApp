import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCapital( term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;

    // Defino la petición, pero la ejecuto cuando tengo un .subscribe, donde se dispara el observable
    // .pipe() -> metodo que podemos espeificar diferentes operadores de RxJS (of, tap, map,...)
    return this.http.get<Country[]>(url)
      .pipe(
        // Si sucede un error, lo atrapa y devuelve un nuevo observable, que será un array vacio
        // catchError( error => {
        //   return of([])
        // })
        catchError( () => of([]))
      );
      //.subscribe()
  }
  // of() -> sirve para construir un observabale basado en el argumento que le mando

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;

    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      );
  }

  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;

    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      );
  }
  
}
