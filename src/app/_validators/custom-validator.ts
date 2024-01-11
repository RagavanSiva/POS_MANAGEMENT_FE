import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `MinLength is ${minLength}`,
        },
      };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`,
        },
      };
    };
  }

  static override pattern(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Password must contain at least 8 characters with one Uppercase, one simple case, one number and one special character`,
        },
      };
    };
  }
  static patternURL(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Enter correct URL`,
        },
      };
    };
  }

  static alphanumericORPattern(
    lengths: number[] = [8, 11],
    pattern: RegExp = /^[a-zA-Z0-9]+$/
  ): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const isLengthValid = lengths.includes(control.value.length);
      const isPatternValid = pattern.test(control.value);

      if (
        (isLengthValid && isPatternValid) ||
        control.value == null ||
        control.value == ''
      ) {
        // If both length and alphanumeric pattern validations pass, return null (no validation error).
        return null;
      }

      // If any of the validations fail, return a validation error object.
      return {
        alphanumeric: {
          'zh-cn': `请输入8或11个字母和数字的组合`,
          en: `Enter either 8 or 11 alphanumeric characters`,
        },
      };
    };
  }

  static alphanumericPattern(
    minLength: number = 5,
    maxLength: number = 20,
    pattern: RegExp = /^[a-zA-Z0-9]+$/
  ): ValidatorFn {
    // Alphanumeric pattern

    return (control: AbstractControl): MyValidationErrors | null => {
      if (
        control.value == null ||
        control.value == '' ||
        (Validators.pattern(pattern)(control) === null &&
          Validators.maxLength(maxLength)(control) === null &&
          Validators.minLength(minLength)(control) === null)
      ) {
        // If the alphanumeric pattern validation passes, return null (no validation error).
        return null;
      }

      // If the alphanumeric pattern validation fails, return a validation error object.
      return {
        alphanumeric: {
          'zh-cn': `请输入5到20个字母和数字的组合`,
          en: `Enter ${minLength} to ${maxLength} alphanumeric characters`,
        },
      };
    };
  }

  static override email(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Email must be valid`,
        },
      };
    };
  }

  static customRequired(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        required: {
          'zh-cn': `最大长度为 `,
          en: `Please input your ${name}`,
        },
      };
    };
  }

  static exactLength(length: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (
        Validators.maxLength(length)(control) === null &&
        Validators.minLength(length)(control) === null
      ) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Character should be ${length} digits`,
        },
      };
    };
  }
  static customConfirmPasswordRequired(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        required: {
          'zh-cn': `最大长度为 `,
          en: `Please confirm your ${name}`,
        },
      };
    };
  }

  static monthValidator(): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;
      if (value && (isNaN(value) || value < 1 || value > 11)) {
        return {
          pattern: {
            'zh-cn': `最大长度为 `,
            en: `Month should be valid`,
          },
        };
      }
      return null;
    };
  }
}
