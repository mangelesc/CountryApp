import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  
  public isLoading: boolean = false;


  constructor ( private countriesServices: CountriesService ) {}

  searchByRegion ( term: Region ): void {
    this.isLoading = true;

    this.selectedRegion = term;
    
    this.countriesServices.searchRegion( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      }); 
  }

}
