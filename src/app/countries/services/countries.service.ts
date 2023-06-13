import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, map, of } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {region: '', countries: []},
  }

  constructor(private http: HttpClient) { 
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ) )
  }

  private loadFromLocalStorage(){
    if ( !localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse ( localStorage.getItem('cacheStore')! );
  }

  private getCountriesRequest( url: string ): Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
        catchError( () => of([])),
      );
  }

  searchCountryByAlphaCode( code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError( () => of(null))
      );
  }

  searchCapitalFirstVersionNoValid( term: string): Observable<Country[]> {
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

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term: term, countries: countries} ),
        tap ( () => this.saveToLocalStorage() )
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountry = {term: term, countries: countries} ),
        tap ( () => this.saveToLocalStorage() )
      );
  }

  searchRegion(term: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = {region: term, countries: countries} ),
        tap ( () => this.saveToLocalStorage() )
      );
  }
  
}
