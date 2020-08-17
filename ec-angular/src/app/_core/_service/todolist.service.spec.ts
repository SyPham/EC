/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodolistService } from './todolist.service';

describe('Service: Todolist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodolistService]
    });
  });

  it('should ...', inject([TodolistService], (service: TodolistService) => {
    expect(service).toBeTruthy();
  }));
});
