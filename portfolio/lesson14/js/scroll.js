const anchors = document.querySelectorAll('[href^="#"]'),
			v = 0.5;  

anchors.forEach(function(item) { 
	item.addEventListener('click', function(e) {
		e.preventDefault();
		const scrollFrom = window.pageYOffset,  
					hashId = this.href.replace(/[^#]*(.*)/, '$1'); 
		let start = null,
				scrollTo = 0;
			
		if (document.querySelector(hashId)) {
			scrollTo = document.querySelector(hashId).getBoundingClientRect().top;
		} else {
			scrollTo = null;
		};

		requestAnimationFrame(step); 
	
		function step(time) {
			if (start === null) start = time;
			let progress = time - start,
					position = (scrollTo < 0 ? Math.max(scrollFrom - progress/v, scrollFrom + scrollTo) : Math.min(scrollFrom + progress/v, scrollFrom + scrollTo));
			window.scrollTo(0,position);
			if (position != scrollFrom + scrollTo) {
				requestAnimationFrame(step);
			} else {
				location.hash = hashId;
			}
		}
	});
})