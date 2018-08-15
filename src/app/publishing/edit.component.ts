import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Publishing, Content, Media } from './publishing';

@Component({
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  id = null;
  publishing: Publishing;
  publishingForm: FormGroup = null;

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // check path parameter
    this.id = this.route.snapshot.paramMap.get('id');

    // If path id path parameter given, the publishing will be modified
    // otherwise that is a new one
    if (this.id) {
      // TODO implement get publishing by from server
    } else {
      this.publishing = new Publishing;
      this.publishing.content = new Content;
      this.publishing.content.media = new Media;
      this.publishing.status = 'draft';
      this.publishing.scheduled = new Date();
    }

    // set up angular reactive form
    this.publishingForm = new FormGroup({
      'message': new FormControl(this.publishing.content.message, [Validators.required]),
      'network': new FormControl(this.publishing.content.network, [Validators.required]),
      'postType': new FormControl(this.publishing.content.postType, [Validators.required]),
      'fileUrl': new FormControl(this.publishing.content.media.url),
      'fileName': new FormControl(this.publishing.content.media.filename),
      'content': new FormControl(this.publishing.content.media.content)
    });
  }

  /**
   * Get all validation errors for the given field.
   * If there is no error or the user has not been touched that field it returns null
   * @param {String} controlName Name of the FormControl
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
   * processing the submitted form's data
   */
  onSubmit() {
    console.log('submitted', this.publishingForm.value);

  }


}
