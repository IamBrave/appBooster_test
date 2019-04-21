//чекбоксы
var checkAll = document.querySelector('.TableAside-LabelAll');
var inp = document.querySelector('.TableAside-InputAll');
var asideCboxes = document.querySelectorAll('.TableAside-Input');

checkAll.onclick = function () {
	if (inp.checked == false) {
		for (var i = 0; i < asideCboxes.length; i++) {
			asideCboxes[i].checked = true;
		}
	} else {
		for (var i = 0; i < asideCboxes.length; i++) {
			asideCboxes[i].checked = false;
		}
	}
}

//доп блок
var tableAddBtns = document.querySelectorAll('.TableAside-Arrow');

for (var i = 0; i < tableAddBtns.length; i++) {
	tableAddBtns[i].onclick = function (e) {
		var i = this.getAttribute('data-id');
			var addCells = document.querySelectorAll('.Table-Add[data-id="' + i + '"]');
			var adds = document.querySelectorAll('.TableAside-Add[data-id="' + i + '"], .Table-Add[data-id="' + i + '"]');

		if (this.classList.contains('TableAside-Arrow_Active')) {
			this.classList.remove('TableAside-Arrow_Active');
			for (var i = 0; i < adds.length; i++) {
				adds[i].classList.remove('Active');
			}
		} else {
			this.classList.add('TableAside-Arrow_Active');
			for (var i = 0; i < adds.length; i++) {
				adds[i].classList.add('Active');
			}
			var addsCount = addCells.length;
			var hgt = adds[1].offsetHeight * addsCount - addsCount;
			adds[0].style.height = hgt+'px';
		}
	}
}


//ховер иконок
var icons = document.querySelectorAll('.Table-Add td a');
for (var i = 0; i < icons.length; i++) {
	icons[i].onmouseenter = function (e) {
		var index = e.target.getAttribute('data-app');
		var currentIcons = document.querySelectorAll('.Table-Add td a[data-app="' + index + '"]');
		console.log(currentIcons);
		for (var i = 0; i < currentIcons.length; i++) {
			currentIcons[i].classList.add('Active');
		}
	}
	icons[i].onmouseleave = function() {
		for (var i = 0; i < icons.length; i++) {
			icons[i].classList.remove('Active')	
		}
	}
}

//tablecell
/*
var cells = document.querySelectorAll('.Table-Cell');
var col = document.querySelectorAll('.TableAside-Row div.TableAside-Col');



for (var i = 0; i < cells.length; i++) {
	var hgt = Math.ceil(col[0].offsetHeight);
	cells[i].style.height = hgt+'px';
	if (col[i] !== undefined ) {
		col[i].style.height = hgt+'px';
	}
}
*/

