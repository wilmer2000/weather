import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { SETTINGS_DEFAULT_VALUES } from '../../constants/languages.constant';
import { KeyValuePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { SettingsService } from '../../services/settings.service';
import { ISetting } from '../../interfaces/setting.interface';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    KeyValuePipe,
    MatButton,
  ],
  templateUrl: './settings.component.html',
  styles: `
    .full-width {
      width: 100%;
    }

    .container mat-card + mat-card {
      margin-top: 1.5rem;
    }
  `,
})
export class SettingsComponent {
  readonly languages: Record<string, string> = SETTINGS_DEFAULT_VALUES;
  settingsForm: FormGroup = new FormGroup({
    location: new FormGroup({
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    }),
    language: new FormControl('EN', Validators.required),
  });
  private readonly settingsService: SettingsService = inject(SettingsService);

  save(): void {
    if (this.settingsForm.valid) {
      const settings: ISetting = this.settingsForm.value as ISetting;
      this.settingsService.save(settings);
    } else {
      this.settingsForm.markAllAsTouched();
    }
  }
}
