import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroClientesPage } from './registro-clientes.page';

describe('RegistroClientesPage', () => {
  let component: RegistroClientesPage;
  let fixture: ComponentFixture<RegistroClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroClientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
