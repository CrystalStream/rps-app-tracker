import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { BacklogRepository } from './repositories/backlog.repository';
import { BacklogService } from './services/backlog.service';
import { COMPONENTS } from './components';
import { PAGES } from './pages';




@NgModule({
  imports: [
    NativeScriptModule
  ],
  exports: [
    ...PAGES
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES
   ],
  providers: [
    BacklogRepository,
    BacklogService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class BacklogModule { }
