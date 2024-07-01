'use strict';

import Inputmask from 'inputmask';
import {json, open, close, hide, show, hasClass} from './utilities';


export default class Form {
	constructor(form) {
		this.$form = form;
		this.$formSuccess = this.$form.nextElementSibling;
		this.$formInputs = this.$form.querySelectorAll('.form__inputs input');
        this.$submitButton = this.$form.querySelector('button[type="submit"]');
		this.to = this.$form.getAttribute('action');

		this.init();
	}

	init() {
        this.$form.querySelectorAll('[data-required]').forEach((el) => {
            const $elWrapper = el.closest('[data-input-wrapper]');

			el.addEventListener('focus', () => {
				$elWrapper.classList.add('__label-move');
			});

			el.addEventListener('blur', (e) => {
				this.checkField(e.currentTarget);
				this.checkValid();
                if(e.currentTarget.value != '') {
                    $elWrapper.classList.remove('__label-fix');
                    $elWrapper.classList.add('__label-move');
                } else {
                    $elWrapper.classList.add('__label-fix');
                    $elWrapper.classList.remove('__label-move');
                }
			});

			el.addEventListener('change', (e) => {
			    this.checkValid();
			});
		});

		this.$form.addEventListener('submit', (e) => {
			if(this.$form.querySelector('input[name="user_name"]').value != ''){
				e.preventDefault();
				return;
			}

			this.sendIfValid(e);
		});
	}

	sendIfValid(e) {
	    e.preventDefault();

	    if (!this.checkFields()) return;

	    const formData = new FormData(this.$form);

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
	}

    checkValid() {
		this.$submitButton.classList.remove('__disabled');
		if (this.$form.querySelectorAll('.__invalid').length > 0) {
			this.$submitButton.classList.add('__disabled');
		}
	}

	checkField($field) {
		let valid = true;
		const name = $field.getAttribute('name');
        const $fieldWrapper = $field.closest('[data-input-wrapper]');

        if( $field.getAttribute('name') != 'user_name' ) {
			if ($field.value == '') {
				valid = false;
			}
			if (valid) {
				$fieldWrapper.classList.remove('__invalid');
				$fieldWrapper.classList.add('__valid');
			} else {
				$fieldWrapper.classList.remove('__valid');
				$fieldWrapper.classList.add('__invalid');
			}
		}
	}

	checkFields() {
		let valid = true;

        this.$form.querySelectorAll('[data-required]').forEach((el) => {
			const $fieldWrapper = el.closest('[data-input-wrapper]');

			this.checkField(el);
			if (hasClass($fieldWrapper, '__invalid')) {
				valid = false;
			}
		});

		if (valid) {
			this.$submitButton.classList.remove('__disabled');
		} else {
			this.$submitButton.classList.add('__disabled');
		}

		return valid;
	}

	success(data) {
		console.log(data);

		hide(this.$form);
		show(this.$formSuccess);

		this.reset();
	}

	reset() {
		this.$formInputs.forEach((input) => {
			input.value = '';
		});
	}

	error() {}
}