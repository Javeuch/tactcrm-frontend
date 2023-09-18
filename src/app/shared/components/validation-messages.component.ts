import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

class ErrorDef {
    error: string;
    errorText: string;
    errorProperty: string;
}

@Component({
    selector: '<validation-messages>',
    template: `<div class="has-danger" *ngIf="formCtrl.invalid && (formCtrl.dirty || formCtrl.touched)">
                    <div *ngFor="let errorDef of errorDefsInternal">
                        <div *ngIf="getErrorDefinitionIsInValid(errorDef)" style="color:tomato;" class="form-control-feedback">
                            {{getErrorDefinitionMessage(errorDef)}}
                        </div>
                    </div>
               </div>`
})
export class ValidationMessagesComponent {

    _errorDefs: ErrorDef[] = [];

    @Input() formCtrl;
    @Input() set errorDefs(value: ErrorDef[]) {
        this._errorDefs = value;
    }

    readonly standartErrorDefs: ErrorDef[] = [
        { error: 'required', errorText: 'Ce champ est requis' } as ErrorDef,
        { error: 'minlength', errorText: 'PleaseEnterAtLeastNCharacter', errorProperty: 'requiredLength' } as ErrorDef,
        { error: 'maxlength', errorText: 'PleaseEnterNoMoreThanNCharacter', errorProperty: 'requiredLength' } as ErrorDef,
        { error: 'email', errorText: 'InvalidEmailAddress' } as ErrorDef,
        { error: 'pattern', errorText: 'format incorrect', errorProperty: 'requiredPattern' } as ErrorDef
    ];

    get errorDefsInternal(): ErrorDef[] {
        let standarts = _.filter(this.standartErrorDefs, (ed) => !_.find(this._errorDefs, (edC) => edC.error === ed.error));
        let all = <ErrorDef[]>_.concat(standarts, this._errorDefs);

        return all;
    }

    constructor(
    ) { }

    getErrorDefinitionIsInValid(errorDef: ErrorDef): boolean {
        return !!this.formCtrl.errors[errorDef.error];
    }

    getErrorDefinitionMessage(errorDef: ErrorDef): string {
        let errorRequirement = this.formCtrl.errors[errorDef.error][errorDef.errorProperty];
        return !!errorRequirement
            ? errorDef.errorText
            : errorDef.errorText;
    }
}

