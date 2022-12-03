import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-demo-form-with-validations-explicit',
  templateUrl: './demo-form-with-validations-explicit.component.html',
  styleUrls: ['./demo-form-with-validations-explicit.component.css']
})
export class DemoFormWithValidationsExplicitComponent implements OnInit {

  myForm: FormGroup;
  sku: AbstractControl;

  constructor(fb: FormBuilder) { 
    // create a FormGroup
    // takes an object of key-value pairs that specify the FormControls in this group
    this.myForm = fb.group({
      // apply custom validator
      'sku': ['', Validators.compose([Validators.required, skuValidator])]
    });
    this.sku = this.myForm.controls['sku'];
    this.sku.valueChanges.subscribe((value: string) => {
      console.log('sku changed to:', value);
    });
    this.myForm.valueChanges.subscribe((value: string) => {
      console.log('form changed to:', value);
    });
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log('you submitted value: ', value);
  }

}

// custom validator
function skuValidator(control: FormControl): { [s:string]: boolean } {
  if (!control.value.match(/^123/)) {
    return { invalidSku: true };
  }
}
