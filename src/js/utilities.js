function status(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response)
	} else {
		return Promise.reject(new Error(response.statusText))
	}
}

function json(response) {
	return response.json()
}

function text(response) {
	return response.text()
}

function hash (value) {
	let string = value + '';
	var hash = 0;
	if (string.length == 0) return hash;
	for (let i = 0; i < string.length; i++) {
		let char = string.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

function open(el) {
	if (hasClass(el, '_close')) {
		el.classList.remove('_close');
	}
	el.classList.add('_open');
}

function close(el) {
	if (hasClass(el, '_open')) {
		el.classList.remove('_open');
	}
	el.classList.add('_close');
}

function show(el) {
	if (hasClass(el, '_hide')) {
		el.classList.remove('_hide');
	}
	el.classList.add('_show');
}

function hide(el) {
	if (hasClass(el, '_show')) {
		el.classList.remove('_show');
	}
	el.classList.add('_hide');
}

function hasClass(element, className) {
    return element.classList.contains(className);
}

export {status, json, text, hash, open, close, show, hide, hasClass}