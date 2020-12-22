import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleListPage } from './single-list.page';

describe('SingleListPage', () => {
  let component: SingleListPage;
  let fixture: ComponentFixture<SingleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
