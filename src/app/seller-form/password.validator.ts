import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

/** An actor's name can't match the actor's role */
export const matchPasswordsValidator: ValidatorFn = (
   control: AbstractControl,
 ): ValidationErrors | null => {
   const password = control.get('password');
   const rePassword = control.get('rePassword');
   return password && rePassword && password.value !== rePassword.value ? {passwordsDoesNotMatch: true} : null;
 };