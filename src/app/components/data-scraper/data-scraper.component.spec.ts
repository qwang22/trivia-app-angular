import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataScraperComponent } from './data-scraper.component';

describe('DataScraperComponent', () => {
  let component: DataScraperComponent;
  let fixture: ComponentFixture<DataScraperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataScraperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataScraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
