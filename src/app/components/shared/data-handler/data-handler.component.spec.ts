import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'zone.js/dist/zone-testing'
import { DataHandlerComponent } from './data-handler.component';

fdescribe('DataHandlerComponent', () => {
  let component: DataHandlerComponent;
  let fixture: ComponentFixture<DataHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should should display no data html element', () => {
    component.dataLength = 0;
    expect(component.isTableEmpty()).toBeTruthy();
  });

  it('should should not display no data html', () => {
    component.dataLength = 50;
    expect(component.isTableEmpty()).toBeFalsy();
  });

  it('should should display loading element', () => {
    component.loading = true;
    expect(component.loading).toBeTruthy();
  });
});
