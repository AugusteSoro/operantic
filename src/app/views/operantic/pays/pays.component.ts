import { PopuppaysComponent } from './popuppays/popuppays.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { egretAnimations } from './../../../shared/animations/egret-animations';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { PaysService } from './pays.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss'],
  animations: egretAnimations
})
export class PaysComponent implements OnInit {

  rows = [];
  columns = [];
  temp = [];

  @Input() test: Observable<any>;

  public paysForm: FormGroup;


  continents = [
    { value: 'africa', viewValue: 'AFRIQUE' },
    { value: 'europe', viewValue: 'EUROPE' },
    { value: 'asia', viewValue: 'ASIE' },
    { value: 'oceania', viewValue: 'OCEANIE' },
    { value: 'Americas', viewValue: 'AMERIQUE' }
  ];

  public items: any[];
  public getItemSub: Subscription;
  obj: any;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private paysService: PaysService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildItemForm();
    this.getItems();

  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.items = rows;

  }


  buildItemForm() {

    this.paysForm = this.fb.group({
      pays: [this.continents[0] || '',  [Validators.required] ],

    });
  }

  submit() {
    let region = this.paysForm.get('pays').value;
    this.searchByRegion(region);

  }

  /**
   * Procedure qui permet de recuperer les pays
   */
  getItems() {

      this.getItemSub = this.paysService.getPays()
      .subscribe(data => {

        // Recuperer les resultats pour le filtre
        this.temp = data.body;

        let statuscode = data.status;

        switch (statuscode) {
          case 200: {
            this.items = data.body;
            break;
          }
          case 204: {
            this.loader.close();
            this.items = [];
            this.snack.open('No content', 'OK', { duration: 4000 });
            break;
          }
          case 500: {
            this.loader.close();
            this.snack.open('Internal server error!', 'OK', { duration: 4000 });
            break;
          }
          default: {
            this.loader.close();
            this.snack.open('Une erreur est survenue!', 'OK', { duration: 4000 });
            break;
          }
        }
      },
      error => {
        let statuscode = error.status;

        switch (statuscode) {
          case 404: {
            this.loader.close();
            this.snack.open('URL introuvable!', 'OK', { duration: 4000 });
            break;
          }
          case 500: {
            this.loader.close();
            this.snack.open('Internal server error!', 'OK', { duration: 4000 });
            break;
          }
          default: {
            this.loader.close();
            this.snack.open('Une erreur est survenue!', 'OK', { duration: 4000 });
            break;
          }

        }

      } );
  }

/**
 * Procedure qui permet la recherche par region
 * @param region
 */
  searchByRegion(region: string) {

    this.getItemSub = this.paysService.searchByRegion(region)
    .subscribe(data => {

      // Recuperer les resultats pour le filtre
      this.temp = data.body;

      let statuscode = data.status;

      switch(statuscode) {
        case 200: {
          this.items = data.body;
          break;
        }
        case 204: {
          this.loader.close();
          this.items = [];
          this.snack.open('No content', 'OK', { duration: 4000 })
          break;
        }
        case 500: {
          this.loader.close();
          this.snack.open('Internal server error!', 'OK', { duration: 4000 });
          break;
        }
        default: {
          this.loader.close();
          this.snack.open('Une erreur est survenue!', 'OK', { duration: 4000 });
          break;
        }
      }
    },
    error => {
      let statuscode = error.status;

      switch (statuscode) {
        case 404: {
          this.loader.close();
          this.snack.open('URL introuvable!', 'OK', { duration: 4000 });
          break;
        }
        case 500: {
          this.loader.close();
          this.snack.open('Internal server error!', 'OK', { duration: 4000 });
          break;
        }
        default: {
          this.loader.close();
          this.snack.open('Une erreur est survenue!', 'OK', { duration: 4000 });
          break;
        }

      }

    } );
}


/**
 * Procedure pour afficher plus d'informations sur un pays
 * @param data
 */
openPopUp(data: any = {}) {
  let title = 'Recapitulatif ' + data.name;
  let dialogRef: MatDialogRef<any> = this.dialog.open(PopuppaysComponent, {
    width: '720px',
    disableClose: true,
    data: { title: title, payload: data }
  });
}


}
