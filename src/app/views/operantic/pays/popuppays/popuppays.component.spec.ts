import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuppaysComponent } from './popuppays.component';




import { getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaysService } from '../pays.service';
import { MatInputModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


// Test du service
describe('PaysService getall', () => {
  let injector: TestBed;
  let service: PaysService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaysService]
    });
    injector = getTestBed();
    service = injector.get(PaysService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Test de verification de l\'API', () => {
    it('should return a status code 200', () => {

      service.getPays().subscribe(data => {
        expect(data.status).toBe(200);
      });

      const req = httpMock.expectOne(`${service.paysUrl}/all`);
      expect(req.request.method).toBe("GET");
    });
  });


});



// Test du component
describe('PopuppaysComponent', () => {
  let component: PopuppaysComponent;
  let fixture: ComponentFixture<PopuppaysComponent>;

  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [ReactiveFormsModule, FormsModule, MatInputModule],
     declarations: [PopuppaysComponent],
     providers: [PaysService, {
       provide: MatDialogRef ,
       useValue: {}
     }, {
     provide: MAT_DIALOG_DATA ,
     useValue: {} }],

   });
    fixture = TestBed.createComponent(PopuppaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Component create', () => {
    expect(component).toBeTruthy();
  });
});




















