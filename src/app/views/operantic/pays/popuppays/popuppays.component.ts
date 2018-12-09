import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-popuppays',
  templateUrl: './popuppays.component.html',
  styleUrls: ['./popuppays.component.scss']
})
export class PopuppaysComponent implements OnInit {

  currentDate: any;

  public itemForm: FormGroup;
  public flagSrc: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopuppaysComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.buildItemForm(this.data.payload);
  }

  buildItemForm(item) {

    // Recuperer la valeur du drapeau
    this.flagSrc = item.flag;

    this.itemForm = this.fb.group({
      name: [{value: item.name, disabled: true}],
      topLevelDomain: [{value: item.topLevelDomain, disabled: true}],
      region: [{value: item.region, disabled: true}],
      subregion: [{value: item.subregion, disabled: true}],
      population: [{value: item.population, disabled: true}],
      demonym: [{value: item.demonym, disabled: true}],
      area: [{value: item.area, disabled: true}],
      timezones: [{value: item.timezones, disabled: true}],
      currencies: [{value: item.currencies[0].name, disabled: true}],
      languages: [{value: item.languages[0].name, disabled: true}],

    });
  }


}
