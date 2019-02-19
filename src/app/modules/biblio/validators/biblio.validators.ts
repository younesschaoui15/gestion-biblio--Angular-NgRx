import {AbstractControl, ValidatorFn} from '@angular/forms';


export function title(control: AbstractControl): { [key: string]: any } | null {
  const isNotValid = /i5an/.test(control.value);
  return isNotValid ? {title: {value: control.value}} : null;
}

export function titleReg(titre: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isNotValid = titre.test(control.value);
    return isNotValid ? {title: {value: control.value}} : null;
  };
}

export function password(control: AbstractControl): { [key: string]: boolean } | null {
  const pw = control.get('pw');
  const coPw = control.get('coPw');

  return pw && coPw && pw.value !== coPw.value ? {password: true} : null;
}
