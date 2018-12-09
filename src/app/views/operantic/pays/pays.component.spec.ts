import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { PaysService } from './pays.service';
import { MatInputModule, MatDialogRef, MAT_DIALOG_DATA, MatCardModule, MatOptionModule, MatSelectModule, MatIconModule, MatSnackBar, MatDialog } from '@angular/material';
import { FormsModule, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { PaysComponent } from './pays.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('PaysComponent', () => {
  it('true expect to be true', () => {
    expect(true).toBe(true);
  });
});


// Test du component
describe('PaysComponent create', () => {
  let component: PaysComponent;
  let fixture: ComponentFixture<PaysComponent>;

  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [ReactiveFormsModule,
      FormsModule,
      MatInputModule,
      MatCardModule,
      MatOptionModule,
      MatSelectModule,
      NgxDatatableModule,
      MatIconModule,
      HttpClientTestingModule,
      BrowserAnimationsModule],

     declarations: [PaysComponent],

     providers: [PaysService,
      {
       provide: MatDialogRef ,
       useValue: {}
     }, {
     provide: MAT_DIALOG_DATA ,
     useValue: {}
    },
    MatDialog,
    MatSnackBar,
    AppLoaderService,
    PaysService,
    FormBuilder
  ],

   });

    fixture = TestBed.createComponent(PaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('component create', () => {
    expect(component).toBeTruthy();
  });
});

// Test du service
describe('PaysService search by region', () => {
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

      service.searchByRegion('africa').subscribe(data => {
        expect(data.status).toBe(200);
      });

      const req = httpMock.expectOne(`${service.paysUrl}/region/africa`);
      expect(req.request.method).toBe('GET');
    });
  });


});
