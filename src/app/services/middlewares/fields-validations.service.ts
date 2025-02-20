import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldsValidationsService {


  public fieldsErrorMessages = {
    patternRequired:
      '*El campo es obligatorio y debe contener solo caracteres alfabéticos sin tíldes',
    required: '*Campo requerido',
    onlyNumber: '*Campo solo debe contener núnmeros sin espacios',
    dpi: '*campo es obligatorio, debe de ser numérico de 13 digitos',
    patternNotRequired:
      '*El campo debe contener solo caracteres alfabéticos sin tíldes',
  };

  

  constructor() { }
}
