import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@/reducers/app.reducers';
import { fromCourtyardState } from '@/content/courtyard/state';
import { Courtyard } from '@/content/courtyard/models/courtyard.model';
import { AbstractComponent } from '@/shared/abstracts/component.shared';

@Component({
  selector: 'app-courtyard-list',
  templateUrl: './courtyard-list.component.html',
  styleUrls: ['./courtyard-list.component.scss']
})
export class CourtyardListComponent extends AbstractComponent {
  public courtyard$: Observable<any>;
  public courtyards$: Observable<any[]>;

  constructor(private store: Store<IAppState>) {
    super();
   }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.store.dispatch(new fromCourtyardState.FindAll());
    this.courtyards$ = this.store.pipe(select(fromCourtyardState.getAllCourtyards));
  }

  edit(courtyard: Courtyard) {
    this.store.dispatch(new fromCourtyardState.FindById(courtyard.id));
  }
}
