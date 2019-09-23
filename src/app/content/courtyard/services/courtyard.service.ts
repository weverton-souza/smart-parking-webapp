import { Injectable, Injector } from '@angular/core';
import { AbstractService } from '@/shared/abstracts/shared.abstract';
import { Courtyard } from '../models/courtyard.model';

@Injectable({
  providedIn: 'root'
})
export class CourtyardService extends AbstractService<Courtyard> {
  constructor(private injector: Injector) { 
    super(injector, '/courtyards');
  }
}
