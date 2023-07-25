import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  isDragover = false;
  file: File | null = null;
  nextStep = false;
  allowedFileMimeType = 'video/mp4';
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255)
    ],
    nonNullable: true
  });

  uploadForm = new FormGroup({
    title: this.title
  })

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if(!this.file || this.file.type !== this.allowedFileMimeType) {
      return;
    }

    this.uploadForm.get('title')?.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    );

    this.nextStep = true;
  }

  uploadFile() {
    console.log('File uploaded');
  }
}
