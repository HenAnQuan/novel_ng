import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchValueComponent } from './search-value.component';

describe('SearchValueComponent', () => {
  let component: SearchValueComponent;
  let fixture: ComponentFixture<SearchValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchValueComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
