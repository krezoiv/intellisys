import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommissionConceptModel } from 'src/app/data/models/commissions/commission-concept.model';
import { CommissionTypeModel } from 'src/app/data/models/commissions/commission-type.model';
import { CommissionConceptService } from 'src/app/services/commissions/commission-concept.service';
import { CommissionTypeService } from 'src/app/services/commissions/commission-type.service';
import { FieldsValidationsService } from 'src/app/services/middlewares/fields-validations.service';
import { AddNewConceptCommissionDialogComponent } from '../add-new-concept-commission-dialog/add-new-concept-commission-dialog.component';
import Swal from 'sweetalert2';
import { DataCommissionDetailService } from 'src/app/services/commissions/data-commission-detail.service';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-update-commission-detail-dialog',
  templateUrl: './update-commission-detail-dialog.component.html',
  styleUrls: ['./update-commission-detail-dialog.component.css']
})
export class UpdateCommissionDetailDialogComponent {

  commissionDetailForm!: FormGroup;
  public commissionConcepts: CommissionConceptModel[] = [];
  public commissionType: CommissionTypeModel[] = [];
  public fieldsErrorMessages = this.fieldsValidationsService.fieldsErrorMessages;

 /* public commissionDetailForm: FormGroup = this.fb.group({
    idCommissionType: [''],
    idDataCommissionConcept: [''],
    reference: [''],
    description: [''],
    value: [''],
    idDataBatch: [''],
  });
  */

 
  constructor(
    private fb: FormBuilder,
    private fieldsValidationsService: FieldsValidationsService,
    private _commissionConceptService: CommissionConceptService,
    private _commissionTypeService: CommissionTypeService,
    private _commissionDetailService: DataCommissionDetailService,
    private _dataCommissionDetailService: DataCommissionDetailService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<UpdateCommissionDetailDialogComponent>,
    private _newConceptCommission : MatDialog,
  ){ }


  ngOnInit(): void {
    //this.loadCommissiontypes();

    this.commissionDetailForm = this.fb.group({
      idCommissionType: [''],
      idDataCommissionConcept: [''],
      reference: [''],
      description: [''],
      value: [''],
      idDataBatch: [''],
      idDataDetail: ['']
    });
    if(this.editData){
      this.commissionDetailForm.controls['idCommissionType'].setValue(this.editData.idCommissionType);
      this.commissionDetailForm.controls['idDataCommissionConcept'].setValue(this.editData.idDataCommissionConcept);
      this.commissionDetailForm.controls['reference'].setValue(this.editData.reference);
      this.commissionDetailForm.controls['description'].setValue(this.editData.description);
      this.commissionDetailForm.controls['value'].setValue(this.editData.value);
      this.commissionDetailForm.controls['idDataBatch'].setValue(this.editData.idDataBatch);
      this.commissionDetailForm.controls['idDataDetail'].setValue(this.editData.idDataDetail);

    }


    this.loadCommissiontypes();
    this.getCommissionConcept();
    
    
  }

  isValidField(field: string) {
    return (
      this.commissionDetailForm.controls[field].errors &&
      this.commissionDetailForm.controls[field].touched
    );
  }



  loadCommissiontypes() {
    this._commissionTypeService.getCommissionTypes().subscribe(
      (commissionTypeList) => {
        this.commissionType = commissionTypeList;
      },
      (error) => {
        console.log('Error al obtener lista de tipo de  documento ', error);
      }
    );
  }

  loadCommissionConceptByCommissionType(idCommissionType: number) {
    this._commissionConceptService
      .getCommissionConceptByCommissionType(idCommissionType)
      .subscribe(
        (concepts) => {
          this.commissionConcepts = concepts;
        },
        (error) => {
          console.error('Error al obtener lista de conceptos', error);
        }
      );
  }
  onCommissionTypeSelected(event: any) {
    const selectedIdCommissionType = event.value;
    console.log('selected idCommissionType: ', selectedIdCommissionType);

    if (
      selectedIdCommissionType !== undefined &&
      selectedIdCommissionType !== null
    ) {
      this.loadCommissionConceptByCommissionType(selectedIdCommissionType);
    }
  }

  getCommissionConcept(){
    const idDataCommissionConcept = this.commissionDetailForm!.get('idDataCommissionConcept')!.value;
    this._commissionConceptService.getCommissionConceptById(idDataCommissionConcept).subscribe(
      (commissionConcepts)=> {
        this.commissionConcepts = commissionConcepts
      }
    )
  }

  addNewConcept() {
    this._newConceptCommission.open(AddNewConceptCommissionDialogComponent, {
      width: '40%',
      
    })
  }




  updateCommissionDetail(){
    if(this.commissionDetailForm.valid){
      const idDataDetail = this.commissionDetailForm!.get('idDataDetail')!.value;
      const updateCommissionDetailData = this.commissionDetailForm.value;

      Swal.fire({
        title: '¿Estás seguro de modificar?',
        text: '!! Confirmar !!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if(result.isConfirmed){
          this._commissionDetailService.updateCommissionDetail(idDataDetail, updateCommissionDetailData)
          .subscribe((data:any) =>{
            if(data.message){
              const successMessage = data.message;
              Swal.fire(successMessage, 'Éxito');
              this.dialogRef.close(true);
            } else {
              Swal.fire('No se pudo moficar');
            }
          }, (err) => {
            Swal.fire('No se pudo moficar', err);
          })
        }
      })

    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de guardar.',
        icon: 'warning',
      });
    }
  }
  
  

}
