const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
const layouts = document.querySelectorAll(".layout");

allSideMenu.forEach((item, index)=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach((i, index)=> {
			i.parentElement.classList.remove('active');
			layouts[index].classList.remove("visible")
		})
		li.classList.add('active');
		layouts[index].classList.add('visible');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

var xmlns = "http://www.w3.org/2000/svg",
 xlinkns = "http://www.w3.org/1999/xlink",
 select = function (s) {
  return document.querySelector(s);
 },
 selectAll = function (s) {
  return document.querySelectorAll(s);
 },
 liquid = selectAll(".liquid"),
 tubeShine = select(".tubeShine"),
 label = select(".label"),
 follower = select(".follower"),
 dragger = select(".dragger"),
 dragTip = select(".dragTip"),
 minDragY = -380,
 liquidId = 0,
 step = Math.abs(minDragY / 100),
 snap = Math.abs(minDragY / 10),
 followerVY = 0;

TweenMax.set("svg", {
 visibility: "visible"
});

TweenMax.set(dragTip, {
 transformOrigin: "20% 50%"
});

var tl = new TimelineMax();
tl.staggerTo(
 liquid,
 0.7,
 {
  x: "-=200",
  ease: Linear.easeNone,
  repeat: -1
 },
 0.9
);

tl.time(100);

document.addEventListener("touchmove", function (event) {
 event.preventDefault();
});
Draggable.create(dragger, {
 type: "y",
 bounds: { minY: minDragY, maxY: 0 },
 onDrag: onUpdate,
 throwProps: true,
 throwResistance: 2300,
 onThrowUpdate: onUpdate,
 overshootTolerance: 0,
 snap: function (value) {
  //Use this to snap the values to steps of 10
  //return Math.round(value/snap) * snap
 }
});

function onUpdate() {
 liquidId = Math.abs(Math.round(dragger._gsTransform.y / step));

 label.textContent = liquidId + "°";
 TweenMax.to(liquid, 1.3, {
  y: dragger._gsTransform.y * 1.12,
  ease: Elastic.easeOut.config(1, 0.4)
 });
}

TweenMax.to(follower, 1, {
 y: "+=0",
 repeat: -1,
 modifiers: {
  y: function (y, count) {
   followerVY += (dragger._gsTransform.y - follower._gsTransform.y) * 0.23;
   followerVY *= 0.69;
   return follower._gsTransform.y + followerVY;
  }
 }
});

TweenMax.to(dragTip, 1, {
 rotation: "+=0",
 repeat: -1,
 modifiers: {
  rotation: function (rotation, count) {
   return rotation - followerVY;
  }
 }
});

TweenMax.to(label, 1, {
 y: "+=0",
 repeat: -1,
 modifiers: {
  y: function (y, count) {
   return y - followerVY * 0.5;
  }
 }
});

TweenMax.to(dragger, 1.4, {
 y: minDragY / 2,
 onUpdate: onUpdate,
 ease: Expo.easeInOut
});

//ScrubGSAPTimeline(tl);

//
