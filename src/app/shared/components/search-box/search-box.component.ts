import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit{

  // Subject -> Tipo especial de observable, es como crear uno manualmente. 
  private debouncer: Subject<string> = new Subject<string>();
  
  @Input() 
  public placeholder: string = '';

  @Output() 
  public onValue = new EventEmitter<string>();

  @Output() 
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime( 300 )
    )
      .subscribe( value => {
        this.onDebounce.emit( value )
      } )
  }

  emitValue ( value: string ): void {
    this.onValue.emit( value );  
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

}
