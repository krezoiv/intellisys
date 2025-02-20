import { Component } from '@angular/core';
import { format } from 'date-fns';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MonthsModel } from 'src/app/data/models/months.models';
import { MonthsService } from 'src/app/services/months.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommissionsService } from 'src/app/services/commissions.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService
import { CommissionTypeService } from 'src/app/services/commissions/commission-type.service';
import { CommissionTypeModel } from 'src/app/data/models/commissions/commission-type.model';
import { CommissionConceptService } from 'src/app/services/commissions/commission-concept.service';
import { CommissionConceptModel } from 'src/app/data/models/commissions/commission-concept.model';
import { DataCommissionDetailService } from 'src/app/services/commissions/data-commission-detail.service';
import { DataCommissionDetailModel } from 'src/app/data/models/commissions/data-commission-detail';
import { MatTableDataSource } from '@angular/material/table';
import { TotalValueByCommissionType, getLastDataBatchAmount } from 'src/app/data/interfaces/commissions.interfaces';
import { formatNumber } from '@angular/common'; // Importamos la función formatNumber
import { AddNewConceptCommissionDialogComponent } from '../add-new-concept-commission-dialog/add-new-concept-commission-dialog.component';
import { UpdateCommissionDetailDialogComponent } from '../update-commission-detail-dialog/update-commission-detail-dialog.component';
import { FieldsValidationsService } from 'src/app/services/middlewares/fields-validations.service';


@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.css'],
})
export class NewDataComponent {
  public currentDate: Date = new Date();
  public maxDate = format(this.currentDate, 'yyyy-MM-dd HH:mm:ss');
 /* public fieldsErrorMessages = {
    patternRequired:
      '*El campo es obligatorio y debe contener solo caracteres alfabéticos sin tíldes',
    required: '*Campo requerido',
    onlyNumber: '*Campo solo debe contener núnmeros sin espacios',
    dpi: '*campo es obligatorio, debe de ser numérico de 13 digitos',
    patternNotRequired:
      '*El campo debe contener solo caracteres alfabéticos sin tíldes',
  };*/

  public fieldsErrorMessages = this.fieldsValidationsService.fieldsErrorMessages;
  public userName: string | null = null;
  public months: MonthsModel[] = [];
  public commissionType: CommissionTypeModel[] = [];
  public commissionConcepts: CommissionConceptModel[] = [];
 
  displayedColumns: string[] = [
    'idDataDetail',
    'Position',
    'idDoc',
    'Document',
    'Reference',
    'Concept',
    'Description',
    'Total',
    'actions',
  ];
  dataSource: MatTableDataSource<DataCommissionDetailModel> =
    new MatTableDataSource<DataCommissionDetailModel>();

  public dataCommissionForm: FormGroup = this.fb.group({
    // idDataBatch: [''],
    batchDataDate: [''],
    idMonth: [''],
    totalAmount: [0],
    userName: [''],
    invoice: [''],
    ncs: [''],
  });

  public commissionDetailForm: FormGroup = this.fb.group({
    idCommissionType: [''],
    idDataCommissionConcept: [''],
    reference: [''],
    description: [''],
    value: [''],
    idDataBatch: [''],
  });

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _monthsServices: MonthsService,
    private authService: AuthService,
    private _dataCommission: CommissionsService,
    private _commissionConceptService: CommissionConceptService,
    private _commissionTypeService: CommissionTypeService,
    private _dataCommissionDetailService: DataCommissionDetailService,
    private fieldsValidationsService: FieldsValidationsService,
    private _newConceptCommission : MatDialog,
    private _updateCommissionDetail : MatDialog
  ) {}
  
  

  ngOnInit(): void {
    this.loadMonths();
    this.loadCommissiontypes();
    const userName = this.authService.getUserNameFromToken();
    this.dataCommissionForm.patchValue({
      userName: userName,
    });
  }

  isValidField(field: string) {
    return (
      this.dataCommissionForm.controls[field].errors &&
      this.dataCommissionForm.controls[field].touched
    );
  }

  loadMonths() {
    this._monthsServices.getMonths().subscribe(
      (monthList) => {
        this.months = monthList;
      },
      (error) => {
        console.log('Error al obtener lista de meses ', error);
      }
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

  createDataCommission() {
    // Obtener los valores de los campos necesarios
    const batchDataDate = this.dataCommissionForm.get('batchDataDate')!.value;
    const idMonth = this.dataCommissionForm.get('idMonth')!.value;
    const totalAmount = this.dataCommissionForm.get('totalAmount')!.value;
    const userName = this.dataCommissionForm.get('userName')!.value;

    // Verificar si los campos requeridos están llenos
    if (
      batchDataDate &&
      idMonth &&
      (totalAmount || totalAmount === 0) &&
      userName
    ) {
      // Mostrar confirmación utilizando Swal
      Swal.fire({
        title: '¿Estás seguro de guardar estos datos?',
        text: '¡Confirmar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          // Guardar los valores en una variable
          const dataToSave = {
            //idDataBatch: null,
            batchDataDate: batchDataDate,
            idMonth: idMonth,
            totalAmount: totalAmount,
            userName: userName,
          };

          // Llamar al servicio para guardar los datos
          this._dataCommission.addNewDataCommission(dataToSave).subscribe(
            (data: any) => {
              if (data.message) {
                // Comprobar si la respuesta contiene un mensaje de éxito
                const successMessage = data.message;
                // Mostrar el mensaje de éxito utilizando Swal
                Swal.fire(successMessage, 'Éxito');
                // Puedes realizar cualquier otra acción después de un éxito aquí
              } else {
                // Si la respuesta no contiene un mensaje de éxito, mostrar un mensaje genérico de error
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
        }
      });
    } else {
      // Si los campos requeridos no están llenos, mostrar un mensaje de advertencia
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de guardaraa.',
        icon: 'warning',
      });
    }
  }

  createCommissionDetail() {
    const idCommissionType = this.commissionDetailForm.get('idCommissionType')!.value;
    const idDataCommissionConcept = this.commissionDetailForm.get('idDataCommissionConcept')!.value;
    const reference = this.commissionDetailForm.get('reference')!.value;
    const description = this.commissionDetailForm.get('description')!.value;
    const value = this.commissionDetailForm.get('value')!.value;
    const idDataBatch = this.commissionDetailForm.get('idDataBatch')!.value;

    if (
      idCommissionType &&
      idDataCommissionConcept &&
      reference &&
      description &&
      value
    ) {
      Swal.fire({
        title: '¿Estás seguro de guardar este detalle ?',
        text: '¡Confirmar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        const dataToSave = {
          idCommissionType: idCommissionType,
          idDataCommissionConcept: idDataCommissionConcept,
          reference: reference,
          description: description,
          value: value,
          idDataBatch: idDataBatch,
        };

        this._dataCommissionDetailService
          .createDataCommissionDetail(dataToSave)
          .subscribe(
            (data: any) => {
              if (data.message) {
                const successMessage = data.message;
                Swal.fire(successMessage, 'Exito');
                this.getCommissionsDetailsList();
                this.getTotalValueByCommissionType();
                this. getLastDataBatchTotalAmount();
                this.commissionDetailForm.reset();
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
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de guardara.',
        icon: 'warning',
      });
    }
  }

  getCommissionsDetailsList() {
    this._dataCommissionDetailService
      .getLastComDataDetails()
      .subscribe((details) => {
        this.dataSource.data = details;
        console.log(details);
      });
  }

  addNewConcept() {
    this._newConceptCommission.open(AddNewConceptCommissionDialogComponent, {
      width: '40%',
      
    })
  }

  updateCommissionDetail(row: DataCommissionDetailModel){
    this._updateCommissionDetail.open(UpdateCommissionDetailDialogComponent, {
      width: '70%',
      data: row,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getCommissionsDetailsList();
        this.getTotalValueByCommissionType();
        this. getLastDataBatchTotalAmount();
        this.commissionDetailForm.reset();
      }
    }); 
  }
  
  deleteCommissionDetail(row: any){
    // Obtén el idDataDetail del objeto de detalle de comisión seleccionado
    const idDataDetail = row.idDataDetail;
  
    // Mostrar un cuadro de diálogo de confirmación
    Swal.fire({
      title: '¿Estás seguro de eliminar este detalle de comisión?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama al servicio para eliminar el detalle de comisión
        this._dataCommissionDetailService.deleteCommissionDetail(idDataDetail).subscribe(
          (data: any) => {
            if (data.message) {
              // Si la eliminación tiene éxito, muestra un mensaje de éxito
              const successMessage = data.message;
              Swal.fire(successMessage, 'Éxito');
              this.getCommissionsDetailsList();
              this.getTotalValueByCommissionType();
              this. getLastDataBatchTotalAmount();
              this.commissionDetailForm.reset();
            } else {
              // Si hay un error al eliminar, muestra un mensaje de error
              Swal.fire('Error al eliminar el detalle de comisión', 'Error');
            }
          },
          (error) => {
            // Maneja los errores de la solicitud HTTP
            Swal.fire('Error al eliminar el detalle de comisión', 'Error');
            console.error('Error al eliminar el detalle de comisión', error);
          }
        );
      }
    });
  }
  

  // Método para obtener el valor total de facturas y notas de crédito
  getTotalValueByCommissionType() {
    this._dataCommission.getTotalValueByCommissionType().subscribe(
      (data: TotalValueByCommissionType[]) => {
        console.log('Respuesta del servicio:', data);
        const invoiceData = data.find(
          (item) => item.CommissionType === 'Facturas'
        );
        const ncsData = data.find(
          (item) => item.CommissionType === 'Notas de Crédito'
        );

        console.log('Datos de facturas:', invoiceData?.TotalValue);
        console.log('Datos de notas de crédito:', ncsData?.TotalValue);

        if (invoiceData && ncsData) {
          // Asigna los valores de facturas y notas de crédito a los campos correspondientes en el formulario
          this.dataCommissionForm.patchValue({
            invoice: invoiceData ? invoiceData.TotalValue : 0,
            ncs: ncsData ? ncsData.TotalValue : 0,
          });
        } else {
          this.toastr.error(
            'No se encontraron datos para facturas o notas de crédito',
            'Error'
          );
        }
      },
      (error) => {
        // Maneja los errores de la solicitud HTTP
        this.toastr.error('Error al obtener los datos de comisión', 'Error');
        console.error('Error al obtener los datos de comisión', error);
      }
    );
  }

  getLastDataBatchTotalAmount() {
    this._dataCommission.getLastDataBatchTotalAmount().subscribe(
      (data: getLastDataBatchAmount[]) => {
        // Manejar los datos recibidos del servicio
        // Por ejemplo, puedes asignar el total al campo totalAmount en el formulario
        if (data && data.length > 0) {
          const lastData = data[0]; // Suponiendo que el servicio devuelve el último valor en la primera posición del arreglo
          this.dataCommissionForm.patchValue({
            totalAmount: lastData.totalAmount
          });
        } else {
          // Manejar el caso en que no se obtengan datos del servicio
          this.toastr.error('No se pudo obtener el último valor del lote de datos', 'Error');
        }
      },
      (error) => {
        // Manejar errores de la solicitud HTTP
        this.toastr.error('Error al obtener el último valor del lote de datos', 'Error');
        console.error('Error al obtener el último valor del lote de datos', error);
      }
    );
  }
  
}
