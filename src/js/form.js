'use strict';

import {status, json, hide, show} from './utilities';

export default class Form {
	constructor(form) {
		this.$form = form;
		this.$formWrap = this.$form.closest('[data-form-wrapper]');
		this.$formSuccessWrap = this.$formWrap.nextElementSibling;
		this.$formSuccesTitle = this.$formSuccessWrap.querySelector('[data-form-success-title]');
		this.$formSuccesDesc = this.$formSuccessWrap.querySelector('[data-form-success-desc]');
		this.$formInputs = this.$form.querySelectorAll('.form__body input');
		this.$formTextarea = this.$form.querySelectorAll('.form__body textarea');
		this.to = this.$form.getAttribute('action');

		this.bind();
	}

	bind() {
		this.$form.addEventListener('submit', (e) => {
			if(this.$form.querySelector('input[name="user_name"]').value != ''){
				e.preventDefault();
				return;
			}

			if(this.$form.querySelector('input:not([name="verify_code"]).is-invalid')) {
				return;
			}
			if(this.$form.querySelector('textarea[name="subject"].is-invalid')) {
				return;
			}

			this.sendIfValid(e);
		});
	}

	success(data) {
		console.log(data);

		this.$formSuccesTitle.textContent = data.title ? data.title : '';
		this.$formSuccesDesc.textContent = data.body ? data.body : '';

		hide(this.$formWrap);
		show(this.$formSuccessWrap);

		this.reset();
	}

	reset() {
		this.$formInputs.forEach((input) => {
			input.value = '';
		});
		this.$formTextarea.forEach((textarea) => {
			textarea.value = '';
		});
	}

	error() {}

	sendIfValid(e) {
	    e.preventDefault();

	    var formData = new FormData(this.$form);
		formData.append($('[name="csrf-param"]').attr('content'), $('[name="csrf-token"]').attr('content'));
		var formUrl = window.location.href;
	    formData.append('url', formUrl);

	    fetch(this.to,{
			method: 'POST',
			body: formData,
	    })
	    .then(status)
	    .then(json)
	    .then(data => {
			this.success(data);
	    })
	    .catch(() => {
			this.error();
	    });

		this.$form.dataset.formType != '' ? ym(96343654,'reachGoal', this.$form.dataset.formType) : '';
	}
}