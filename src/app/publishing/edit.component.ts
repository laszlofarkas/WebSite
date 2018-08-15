import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Publishing, Content, Media } from './publishing';
import { PublishingService } from './publishing.service';

@Component({
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  id = null; // id of the current publishing if it is not new
  publishing: Publishing;
  publishingForm = null; // angular reactive FormGroup
  submitting = false; // determine is any rest request is in progress
  showModal = false; // shows the delete modal

  // list of possible options for network field
  networkList = [
    { key: 'facebook', name: 'Facebook' },
    { key: 'googlePlus', name: 'Google plus' }
  ];

  postTypes = [
    { key: 'photo', name: 'Photo' },
    { key: 'text', name: 'Text' }
  ];

  constructor(
    private route: ActivatedRoute,
    private publishingService: PublishingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // check path parameter
    this.id = this.route.snapshot.paramMap.get('id');

    // If path id path parameter given, the publishing will be modified
    // otherwise that is a new one
    if (this.id) {
      this.publishingService.find(this.id).subscribe((publishing) => {
        this.publishing = publishing;
        this.iniForm();
      });
    } else {
      this.publishing = new Publishing;
      this.publishing.content = new Content;
      this.publishing.content.media = new Media;
      this.publishing.status = 'draft';
      this.publishing.scheduled = new Date();
      this.iniForm();
    }
  }

  /**
   * Initialize Angular FormGroup to use in HTML
   */
  private iniForm() {
    this.publishingForm = new FormGroup({
      'message': new FormControl(this.publishing.content.message, [Validators.required]),
      'network': new FormControl(this.publishing.content.network, [Validators.required]),
      'postType': new FormControl(this.publishing.content.postType, [Validators.required]),
      'fileUrl': new FormControl(this.publishing.content.media.url),
      'fileName': new FormControl(this.publishing.content.media.fileName),
      'content': new FormControl(this.publishing.content.media.content)
    });
  }

  /**
   * Get all validation errors for the given field.
   * If there is no error or the user has not been touched that field it returns null
   * @param {string} controlName Name of the FormControl
   */
  getErrors(controlName) {
    const status = this.publishingForm.get(controlName);
    // if the user didn't touch the field then it won't show any error
    if (status.dirty || status.touched) {
      return status.errors;
    } else {
      return null;
    }
  }

  /**
   * processing the submitted form's data and update the publishing
   */
  onSubmit() {
    this.submitting = true;
    if (this.publishingForm.valid) {
      const values = this.publishingForm.value;
      this.publishing.content.message = values.message;
      this.publishing.content.network = values.network;
      this.publishing.content.postType = values.postType;
      this.publishing.content.media = new Media;
      if (values.postType === 'photo') {
        this.publishing.content.media.url = values.fileUrl;
        this.publishing.content.media.fileName = values.fileName;
      } else if (values.postType === 'text') {
        this.publishing.content.media.content = values.content;
      }
      if (this.id) {
        this.publishingService.update(this.id, this.publishing).subscribe(() => {
          this.submitting = false;
          this.router.navigateByUrl('publishing');
        });
      } else {
        this.publishingService.create(this.publishing).subscribe(() => {
          this.submitting = false;
          this.router.navigateByUrl('publishing');
        });
      }
    }
  }

  delete() {
    this.showModal = true;
  }

  modalConfirm() {
    this.publishingService.delete(this.id).subscribe(() => {
      this.router.navigateByUrl('publishing');
    });
  }

  modalCancel() {
    this.showModal = false;
  }

}
