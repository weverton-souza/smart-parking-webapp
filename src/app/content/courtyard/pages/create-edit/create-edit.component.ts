import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@/reducers/app.reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Courtyard } from '@/content/courtyard/models/courtyard.model';
import { fromCourtyardState } from '@/content/courtyard/state';
import { AbstractComponent } from '@/shared/abstracts/component.shared';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent extends AbstractComponent {
  public courtyard$: Observable<any>;
  public courtyards$: Observable<any[]>;
  public pageTitle: string;
  public currentAction: string;
  public courtyardForm: FormGroup;

  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router) { 
    super();
  }

  ngOnInit() {
    this.courtyardForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
      numberOfVacancies: ['', [Validators.required]]
    });
    
    this.setPageTitle();
  }

  save(courtyard: Courtyard) {
    this.store.dispatch(new fromCourtyardState.Save(courtyard));
    this.courtyards$ = this.store.pipe(select(fromCourtyardState.getAllCourtyards));
  }

  findAll() {
    this.store.dispatch(new fromCourtyardState.FindAll());
    this.courtyards$ = this.store.pipe(select(fromCourtyardState.getAllCourtyards));
  }

  findById(courtyardId: string) {
    this.store.dispatch(new fromCourtyardState.FindById(courtyardId));
    this.courtyard$ = this.store.pipe(select(fromCourtyardState.getCourtyard));
  }

  private setPageTitle() {
    if(this.router.url.endsWith('create')) {
      this.pageTitle = 'Registro de Pátio';
    } else {
      this.store.pipe(select(fromCourtyardState.getCourtyard)).subscribe(c => {
        this.pageTitle = 'Edição de Pátio: ' + c.name;
        Object.keys(this.courtyardForm.controls)
          .map(control => this.courtyardForm.controls[control].setValue(c[control]));
      })
    }
  }
}
