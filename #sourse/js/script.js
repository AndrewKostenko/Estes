new Zooming().listen('.introd_map img');

// view slider1
const viewItems1 = document.querySelectorAll('.view.v1 .view_item');

let viewSlider1 = new Swiper('.view_slider1', {
	spaceBetween: 10,
	allowTouchMove: true,
	noSwiping: false,
	navigation: {
		nextEl: ".view_next",
		prevEl: ".view_prev",
	},
	breakpoints: {
		1440: {
			spaceBetween: 20,
		},
	},
	on: {
		slideChange: function () {
			let viewSliderIndex = viewSlider1.realIndex;
			for (elem of viewItems1) {
				elem.classList.remove('active');
			}
			viewItems1[viewSliderIndex].classList.add('active');
		},
	},
})

if (viewItems1[viewSlider1.realIndex]) {
	viewItems1[viewSlider1.realIndex].classList.add('active');
}

for (elem of viewItems1) {
	elem.addEventListener('click', function () {

		if (event.target.closest('.view').querySelector('.view_slider1')) {
			viewSlider1.slideTo([...event.target.parentElement.children].indexOf(event.target));
		}
	})
}

// view slider2

const viewItems2 = document.querySelectorAll('.view.v2 .view_item');

let viewSlider2 = new Swiper('.view_slider2', {
	spaceBetween: 10,
	allowTouchMove: true,
	noSwiping: false,
	navigation: {
		nextEl: ".view_next",
		prevEl: ".view_prev",
	},
	breakpoints: {
		1440: {
			spaceBetween: 20,
		},
	},
	on: {
		slideChange: function () {
			let viewSliderIndex = viewSlider2.realIndex;
			for (elem of viewItems2) {
				elem.classList.remove('active');
			}
			viewItems2[viewSliderIndex].classList.add('active');
			console.log(viewSliderIndex);

		},
	},
})

if (viewItems2[viewSlider2.realIndex]) {
	viewItems2[viewSlider2.realIndex].classList.add('active');
}

for (elem of viewItems2) {
	elem.addEventListener('click', function () {
		if (event.target.closest('.view').querySelector('.view_slider2')) {
			viewSlider2.slideTo([...event.target.parentElement.children].indexOf(event.target));
		}
	})
}

// view slider3
const viewItems3 = document.querySelectorAll('.view.v3 .view_item');

let viewSlider3 = new Swiper('.view_slider3', {
	spaceBetween: 10,
	allowTouchMove: true,
	noSwiping: false,
	navigation: {
		nextEl: ".view_next",
		prevEl: ".view_prev",
	},
	breakpoints: {
		1440: {
			spaceBetween: 20,
		},
	},
	on: {
		slideChange: function () {
			let viewSliderIndex = viewSlider3.realIndex;
			for (elem of viewItems3) {
				elem.classList.remove('active');
			}
			viewItems3[viewSliderIndex].classList.add('active');
			console.log(viewSliderIndex);

		},
	},
})

if (viewItems3[viewSlider3.realIndex]) {
	viewItems3[viewSlider3.realIndex].classList.add('active');
}

for (elem of viewItems3) {
	elem.addEventListener('click', function () {
		if (event.target.closest('.view').querySelector('.view_slider3')) {
			viewSlider3.slideTo([...event.target.parentElement.children].indexOf(event.target));
		}
	})
}



// pres mask
function setCursorPosition(pos, elem) {
	elem.focus();
	if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
	else if (elem.createTextRange) {
		var range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd("character", pos);
		range.moveStart("character", pos);
		range.select()
	}
}
function mask(event) {
	var matrix = this.defaultValue,
		i = 0,
		def = matrix.replace(/\D/g, ""),
		val = this.value.replace(/\D/g, "");
	def.length >= val.length && (val = def);
	matrix = matrix.replace(/[_\d]/g, function (a) {
		return val.charAt(i++) || "_"
	});
	this.value = matrix;
	i = matrix.lastIndexOf(val.substr(-1));
	i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
	setCursorPosition(i, this)
}
const input = document.querySelectorAll("input");

for (elem of input) {
	elem.addEventListener("input", mask, false)
}
//claster sliders

new Swiper('.claster_slider  .swiper-container', {
	spaceBetween: 10,
	allowTouchMove: true,
	noSwiping: false,
	navigation: {
		nextEl: ".view_next",
		prevEl: ".view_prev",
	},
	breakpoints: {
		1440: {
			spaceBetween: 20,
		},
	},
})


//slider
new Swiper('.slider_items', {
	spaceBetween: 20,
	allowTouchMove: true,
	noSwipsing: false,
	navigation: {
		nextEl: ".slider_next",
		prevEl: ".slider_prev",
	},
})


//popup

const popupsLinks = document.querySelectorAll('*[data-popup]');
let activePopup = '';
let popupLock = false;

for (elem of popupsLinks) {
	elem.addEventListener('click', callPopup);
}
document.addEventListener('click', closePopup)

function callPopup() {
	event.preventDefault();

	if (activePopup) {
		activePopup.classList.remove('active');
		activePopup = '';
	}
	if (!popupLock) {
		let link = this.getAttribute('data-popup');

		activePopup = document.querySelector(link);
		activePopup.classList.add('active');
		document.body.classList.add('lock');
		document.body.classList.add('pl');

		if (activePopup) {
			document.body.classList.add('lock');
		}
		if (document.querySelector(`${link} .popup-zooov_topslider`)) {
			let topSlider = new Swiper(`${link} .popup-zooov_topslider`, {
				spaceBetween: 40,
			})
			let slider = new Swiper(`${link} .popup-zooov_slider`, {
				spaceBetween: 16,
				slidesPerView: 4,
				freeMode: true,
			})
			document.querySelector(`${link} .popup-zooov_slider`).addEventListener('click', function () {
				let targetElement = event.target.closest('.popup-zooov_item');
				let targetElements = Array.prototype.slice.call(event.target.closest('.popup-zooov_item').parentElement.children);
				topSlider.slideTo(targetElements.indexOf(targetElement));
			})
		}

		lockPopup(300);
	}
}

function closePopup() {
	if ((!event.target.closest('.popup_block') || event.target.closest('.popup_close')) && !popupLock && activePopup) {
		activePopup.classList.remove('active');
		document.body.classList.remove('lock');
		activePopup = '';
		document.body.classList.remove('pl');
		lockPopup(300);
	}

}

function lockPopup(time) {
	popupLock = true;
	setTimeout(function () {
		popupLock = false;
	}, time);

}


//quiz

let quizIndex = 0;
const quizForm = document.querySelector('.popup-quiz_form');
let quizBlocks = document.querySelectorAll('.popup-quiz_block');
let quizNext = document.querySelectorAll('.popup-quiz_next');
let quizBack = document.querySelectorAll('.popup-quiz_back');

quizBlocks[quizIndex].classList.add('active');

for (elem of quizBack) {
	elem.addEventListener('click', function () {
		if (quizIndex >= 1) {
			quizIndex--;

			for (elem of quizBlocks) {
				elem.classList.remove('active');
			}
			quizBlocks[quizIndex].classList.add('active');

		} else {
			activePopup.classList.remove('active');
			document.body.classList.remove('lock');
			activePopup = '';
			document.body.classList.remove('pl');
			lockPopup(300);
		}
	})
}


for (elem of quizNext) {
	elem.addEventListener('click', function () {
		let quizChecked = false;
		for (elem of quizBlocks[quizIndex].querySelectorAll('input')) {
			if (elem.checked && (quizIndex + 1 < quizBlocks.length)) {
				quizIndex++;
				for (elem of quizBlocks) {
					elem.classList.remove('active');
				}
				quizBlocks[quizIndex].classList.add('active');
			}

		}
	})
}


//quiz items last
const quizActiveItems = document.querySelectorAll('.popup-quiz_items.contacts .popup-quiz_item');

for (elem of quizActiveItems) {
	elem.addEventListener('click', function () {
		for (elem of quizActiveItems) {
			elem.classList.remove('active');
		}
		if (this.querySelector('input').checked) {
			this.classList.add('active');
		}
	})
}