import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id ))
      )
      .subscribe( country => {
        if ( !country ) return this.router.navigateByUrl('');
        
        return this.country = country;

      });
  }

}
  // switchMap_> recibe el valor anterior (params, y desestructuro el id), regresa un nuevo observable
  // Ahora el subscribe está subscrito el resultado de ese nuevo observable ( country/resp )


   // ngOnInit(): void {
    // this.activatedRoute.params
    // .subscribe( ({ id }) => {
    //   this.countriesService.searchCountryByAlphaCode( id )
    //   .subscribe( country => {
    //     console.log(country)
    //   });
    // })
    // Evitar "subscribe hell"


    // Posible manera: 
    // ngOnInit(): void {
    //   this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     this.searchCountry(id);
    //   })

    // }

    // searchCountry( code: string) {
    //   this.countriesService.searchCountryByAlphaCode( code )
    //     .subscribe( country => {
    //       console.log(country)
    //     });
    // }
    // }
