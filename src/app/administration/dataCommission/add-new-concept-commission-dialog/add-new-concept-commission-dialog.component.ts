import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommissionConceptModel } from 'src/app/data/models/commissions/commission-concept.model';
import { CommissionTypeModel } from 'src/app/data/models/commissions/commission-type.model';
import { CommissionConceptService } from 'src/app/services/commissions/commission-concept.service';
import { CommissionTypeService } from 'src/app/services/commissions/commission-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-concept-commission-dialog',
  templateUrl: './add-new-concept-commission-dialog.component.html',
  styleUrls: ['./add-new-concept-commission-dialog.component.css']
})
export class AddNewConceptCommissionDialogComponent {


  public commissionType: CommissionTypeModel[] = [];
  public commissionConcepts: CommissionConceptModel[] = [];

  public commissionForm: FormGroup = this.fb.group({
    idDataCommissionConcept: [''],
    concept: [''],
    idCommissionType: ['']
  })


  constructor(
    private fb: FormBuilder,
    private _commissionTypeService: CommissionTypeService,
    private _commiisionConceptService: CommissionConceptService,
    private _commissionConceptService: CommissionConceptService,
  ){}
  
  ngOnInit(): void {
    this.loadCommissiontypes();
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


  creatConcept(){
    const concept = this.commissionForm.get('concept')!.value;
    const idCommissionType = this.commissionForm.get('idCommissionType')?.value;
    const idDataCommissionConcept = this.commissionForm.get('idDataCommissionConcept')?.value;
    if(
      concept && idCommissionType
    ){
      Swal.fire({
        title: '¿Estás seguro de guardar este concepto ?',
        text: '¡Confirmar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result)=>{
        const dataToSave = {
          concept : concept,
          idCommissionType : idCommissionType,
          idDataCommissionConcept: idDataCommissionConcept
        };
        this._commiisionConceptService.createCommissionConcept(dataToSave)
        .subscribe(
          (data: any)=>{
            if(data.message){
              const successMessage = data.message;
              Swal.fire(successMessage, 'Exito');
            } else {
              Swal.fire('Error inesperado intente de nuevo', 'Error');
            }
          },
          (err) => {
            Swal.fire(
              err.error.error || 'Error inesperado, intente de nuevo',
              'Error'
            );
          }
        );
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de guardara.',
        icon: 'warning',
      });
    }
  }

  

 
}
