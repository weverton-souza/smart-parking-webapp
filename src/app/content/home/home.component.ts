import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@/reducers/app.reducers';
import { fromCourtyardState } from '../courtyard/state';
import { Courtyard } from '../courtyard/models/courtyard.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public courtyards$: Observable<any[]>;
  
  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.store.dispatch(new fromCourtyardState.FindAll());
    this.courtyards$ = this.store.pipe(select(fromCourtyardState.getAllCourtyards));
  }
}
