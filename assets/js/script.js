(function() {
	
	/* MENU */
	
	const body = document.querySelector('body');
	const menu = document.querySelector('.menu');
	const menu__trigger = document.querySelector('.menu__trigger');
	const menu__overlay = document.querySelector('.menu__overlay');
	const menu__item = document.querySelectorAll('.lower--level__trigger');
	
	function open__menu(event) {
		event.preventDefault();
		body.classList.toggle('menu__open');
		menu__trigger.classList.toggle('open');
		menu.classList.toggle('open');
	}
	
	function close__menu(event) {
		event.preventDefault();
		body.classList.remove('menu__open');
		menu__trigger.classList.remove('open');
		menu.classList.remove('open');
	}
	
	function collapse__section(element) {
		var section__height = element.scrollHeight;
		var element__transition = element.style.transition;
		element.style.transition = '';
		
		requestAnimationFrame(function() {
			element.style.height = section__height + 'px';
			element.style.transition = element__transition;
			
			requestAnimationFrame(function() {
				element.style.height = 0 + 'px';
			});
		});
		
		element.setAttribute('data-collapsed', 'true');
	}
	
	function expand__section(element) {
		var section__height = element.scrollHeight;
		
		element.style.height = section__height + 'px';
		
		element.addEventListener('transitioned', function(event) {
			element.removeEventListener('transitioned', arguments.callee);
			
			element.style.height = null;
		});
		
		element.setAttribute('data-collapsed', 'false');
	}
	
	function open__lowerLevel(event) {
		event.preventDefault();
		
		this.classList.toggle('open');
		
		var section = this.nextElementSibling;
		
		var isCollapsed = section.getAttribute('data-collapsed') === 'true';
		
		if (isCollapsed) {
			expand__section(section);
			section.setAttribute('data-collapsed', 'false');
		} else {
			collapse__section(section);
		}
	}
	
	menu__trigger.addEventListener('click', open__menu); 
	menu__overlay.addEventListener('click', close__menu); 
	
	if (window.matchMedia('(max-width: 1029px)').matches) {
		for (var i = 0; i < menu__item.length; i++) {
			menu__item[i].addEventListener('click', open__lowerLevel);
		}
	}
	
	/* TOOLTIP */
	
	const tooltip__trigger = document.querySelectorAll('.tooltip__trigger');
	const tooltip__content = document.querySelectorAll('.tooltip__content');
	
	function open__tooltip(event) {
		event.preventDefault();
		
		var tooltip = this.querySelector(':scope > .tooltip__content');
		
		tooltip.classList.toggle('open');
	}
	
	
	for (var i = 0; i < tooltip__trigger.length; i++) {
		tooltip__trigger[i].addEventListener('click', open__tooltip);
	}
	
	/* COOKIES */
	
	const cookies = document.querySelector('.cookies');
	const cookies__more = document.querySelector('.cookies__more');
	const cookies__btn = document.querySelector('.cookies__btn');
	
	function cookies__show__more(event) {
		event.preventDefault();
		
		var more = this.parentNode.nextElementSibling;
		
		more.classList.toggle('show');
	}
	
	function cookies__close(event) {
		event.preventDefault();
		
		cookies.classList.add('hide');
	}
	
	cookies__more.addEventListener('click', cookies__show__more);
	cookies__btn.addEventListener('click', cookies__close);
	
	/* TABS */
	
	const active__tab__offset = document.querySelector('.configurator__tab.active').offsetLeft;
	const tabs__scroller = document.querySelector('.configurator__tabs');
	
	if (window.matchMedia('(max-width: 1029px)').matches) {
		tabs__scroller.scrollLeft = active__tab__offset - 30;
	}
	
	/* BREADCRUMBS */
	
	const comparator__offset = document.querySelector('.comparator-table').getBoundingClientRect().top;
	const breadcrumbs = document.querySelector('.header__breadcrumbs');
	const menu__wrap = document.querySelector('.menu__wrap');
	
	function show__breadcrumbs(event) {
		if (window.scrollY > comparator__offset || document.documentElement.scrollTop > comparator__offset) {
			menu__wrap.classList.add('notrn');
			breadcrumbs.classList.add('show');
			menu__trigger.classList.add('show');
			body.classList.add('breadcrumbs__visible');
			body.offsetHeight;
			menu__wrap.classList.remove('notrn');
		} else {
			breadcrumbs.classList.remove('show');
			menu__trigger.classList.remove('show');
			body.classList.remove('breadcrumbs__visible');
		}
	} 
	
	if (window.matchMedia('(min-width: 1030px)').matches) {
		window.addEventListener('scroll', show__breadcrumbs);
	}
	
	/* POPUP */
	
	const popup__anchor = document.querySelectorAll('.popup__anchor');
	const popup__btn = document.querySelectorAll('.popup__inner .btn');
	
	
	function show__popup(event) {
		event.preventDefault();
		
		var anchor__category = this.dataset.anchor;
		var popup = document.querySelector('.popup[data-popup="' + anchor__category + '"]');
		var popup__btn = document.querySelector('.popup[data-popup="' + anchor__category + '"] .btn');
		
		popup.classList.remove('hidden');
		body.classList.add('menu__open');
		
		function close__popup(event) {
			event.preventDefault();
			
			popup.classList.add('hidden');
			body.classList.remove('menu__open');
		}
		
		popup__btn.addEventListener('click', close__popup);
	}
	
	for (var i = 0; i < popup__anchor.length; i++) {
		popup__anchor[i].addEventListener('click', show__popup);
	}
	
})();