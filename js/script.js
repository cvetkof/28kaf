let wingSpan;
let middleChord;
let area = 0;
let workLoad = 0;
let wingAngleAll = document.querySelectorAll('.given-wing_angle-radio');
let calculationButton = document.querySelectorAll('.button')[0];
let resetButton = document.querySelectorAll('.button')[1];
let forecastButton = document.querySelectorAll('.button')[2];
let refineForecastButton = document.querySelectorAll('.button')[3];
let grafButton = document.querySelectorAll('.button')[4];
let counter = 0;
let normMass = 0;
let counterPropability = 0;
let wingAngle = 0;
let propabilityFirst = 0;
let propabilitySecond = 0;
let propabilityThird = 0;
let propabilityFourth = 0;
let jointProbabilityFirst = 0;
let jointProbabilitySecond = 0;
let jointProbabilityThird = 0;
let jointProbabilityFourth = 0;
let mass = [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x:4, y:0}];



function setWingAngel() {
	for (let i of wingAngleAll) {
		if (i.checked) {
			wingAngle = i.value;
		}
	}
}

function setParameter() {
	setWingAngel();
	wingSpan = document.querySelector('.given-wingspan-value').value;
	middleChord = document.querySelector('.given-middle_chord-value').value;
}

function setArea() {
	area = wingSpan * middleChord;
	document.querySelector('.calculation-area-value').innerHTML = area;
	document.querySelector('.calculation-area-value').classList.add('color');
}

function setWorkload() {
	if ((wingSpan >= 7) && (wingSpan < 10)) {
		workLoad = 4300;
	} else {
		if ((wingSpan >= 10) && (wingSpan < 12)) {
			workLoad = 4200;
		} else {
			workLoad = 4100;
		}
	}

	document.querySelector('.calculation-workload-value').innerHTML = workLoad;
	document.querySelector('.calculation-workload-value').classList.add('color');
}

function setMass() {
	normMass = (workLoad * area) / 9.81;
	document.querySelector('.calculation-mass-value').innerHTML = normMass.toFixed(1);
	document.querySelector('.calculation-mass-value').classList.add('color');
}

function resetColorTable() {
	for (let i = 1; i < document.querySelectorAll('td').length; i++) {
		document.querySelectorAll('td')[i].style.backgroundColor = "";
	}
	for (let i = 1; i < document.querySelectorAll('th').length; i++) {
		document.querySelectorAll('th')[i].style.backgroundColor = "";
	}
}

function resetColorTd() {
	for (let i = 0; i < document.querySelectorAll('td').length; i++) {
		document.querySelectorAll('td')[i].style.backgroundColor = ""
	}
}

function resetParametrs() {
	document.querySelector('.calculation-area-value').innerHTML = "00";
	document.querySelector('.calculation-area-value').classList.remove('color');
	document.querySelector('.calculation-workload-value').innerHTML = "00";
	document.querySelector('.calculation-workload-value').classList.remove('color');
	document.querySelector('.calculation-mass-value').innerHTML = "00";
	document.querySelector('.calculation-mass-value').classList.remove('color');
	resetColorTable();	
	for (let i = 0; i < document.querySelectorAll('.forecast-propability-value').length; i++) {
		document.querySelectorAll('.forecast-propability-value')[i].classList.remove('color');
		document.querySelectorAll('.forecast-propability-value')[i].innerHTML = "00";
	}
	for (let i = 0; i < document.querySelectorAll('.par-value').length; i++) {
		document.querySelectorAll('.par-value')[i].classList.remove('color');
		document.querySelectorAll('.par-value')[i].innerHTML = "00";
	}
	counter = 0;
}

function getPropability(counter, step) {
	if (step == 1) {
		propabilityFirst = Number((1 / counter).toFixed(3));
		// console.log(propabilityFirst);
		// document.querySelectorAll('.forecast-propability-value')[0].innerHTML = (propabilityFirst * 100).toFixed(2);
		jointProbabilityFirst = propabilityFirst;
		jointProbabilitySecond = propabilityFirst;
		jointProbabilityThird = propabilityFirst;
		jointProbabilityFourth = propabilityFirst;
		mass = [{x: 1, y: jointProbabilityFirst}, {x: 2, y: jointProbabilitySecond}, {x: 3, y: jointProbabilityThird}, {x:4, y:jointProbabilityFourth}];
		} else {
			if (step == 2) {
				propabilitySecond = Number((1 / counter).toFixed(3));
				// console.log(propabilitySecond);
				jointProbabilitySecond = propabilityFirst + propabilitySecond - propabilityFirst * propabilitySecond;
				jointProbabilityThird = jointProbabilitySecond;
				jointProbabilityFourth = jointProbabilitySecond;
				mass = [{x: 1, y: jointProbabilityFirst}, {x: 2, y: jointProbabilitySecond}, {x: 3, y: jointProbabilityThird}, {x:4, y:jointProbabilityFourth}];
				// document.querySelectorAll('.forecast-propability-value')[1].innerHTML = (jointProbabilitySecond * 100).toFixed(2);
			} else {
				if (step == 3) {
					propabilityThird = Number((1 / counter).toFixed(3));
					// console.log(propabilityThird)
					jointProbabilityThird = propabilityFirst + propabilitySecond + propabilityThird
						- propabilityFirst * propabilitySecond - propabilityFirst * propabilityThird - propabilitySecond * propabilityThird
						+ propabilityFirst * propabilitySecond * propabilityThird;
					jointProbabilityFourth = jointProbabilityThird;
					mass = [{x: 1, y: jointProbabilityFirst}, {x: 2, y: jointProbabilitySecond}, {x: 3, y: jointProbabilityThird}, {x:4, y:jointProbabilityFourth}];
					// document.querySelectorAll('.forecast-propability-value')[2].innerHTML = (jointProbabilityThird * 100).toFixed(2);
				} else {
					propabilityFourth = Number((1 / counter).toFixed(3));
					// console.log(propabilityFourth);
					jointProbabilityFourth = 1 - propabilityFirst * propabilitySecond * propabilityThird * propabilityFourth;
					mass = [{x: 1, y: jointProbabilityFirst}, {x: 2, y: jointProbabilitySecond}, {x: 3, y: jointProbabilityThird}, {x:4, y:jointProbabilityFourth}];
					// document.querySelectorAll('.forecast-propability-value')[3].innerHTML = (jointProbabilityFourth * 100).toFixed(2);
				}
			}
		}
		// console.log(mass);
	}

function forecast() {
	for (let i = 0; i < document.querySelectorAll('.forecast-propability-value').length; i++) {
		document.querySelectorAll('.forecast-propability-value')[i].innerHTML = "00";
	}

	for (let i = 0; i < document.querySelectorAll('.forecast-propability-value').length; i++) {
		document.querySelectorAll('.forecast-propability-value')[i].classList.add('color');
	}

	let relativeWeightPowerPlant = 1846.2 / normMass;
	let relativeMassFuel = 3260 / normMass;
	let relativeMassSystems = 857.592 / normMass;

	// прогноз по нормальной взлетной массе
	// document.querySelectorAll('th')[6].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
	for (let i = 6; i < document.querySelectorAll('td').length; i = i + 11) {
		if ((Number(document.querySelectorAll('td')[i].textContent) > normMass * 0.9) &&
			(Number(document.querySelectorAll('td')[i].textContent) < normMass * 1.1)) {
				for (let j = i - 6; j <= (i + 4); j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "#00ff00";
				}
				counterPropability++;
			}
		}
	if (counterPropability != 0) {
		getPropability(counterPropability, 1);
		counterPropability = 0;
	} else {
		return;
	}

	console.log(document.querySelectorAll('td'));
	// console.log(document.querySelectorAll('td'));

	// проноз по относительной массе силовой установки
	// document.querySelectorAll('th')[8].style.backgroundColor = "rgb(255, 165, 0, 0.5)";
	document.querySelectorAll('.par-value')[0].classList.add('color');
	document.querySelectorAll('.par-value')[0].innerHTML = relativeWeightPowerPlant.toFixed(3);
	for (let i = 8; i < document.querySelectorAll('td').length; i = i + 11) {
		if (((Number(document.querySelectorAll('td')[i].textContent) > relativeWeightPowerPlant * 0.95) &&
			(Number(document.querySelectorAll('td')[i].textContent) < relativeWeightPowerPlant * 1.05)) &&
			(document.querySelectorAll('td')[i].style.backgroundColor == "rgb(0, 255, 0)")) {counterPropability++;}
		}
	if (counterPropability != 0) {
		getPropability(counterPropability, 2);
		counterPropability = 0;
		//перекрашиваем зеленый в желтый
		for (let i = 0; i < document.querySelectorAll('td').length; i = i + 11) {
			if (document.querySelectorAll('td')[i].style.backgroundColor == "rgb(0, 255, 0)") {
				for (let j = i; j < i + 11; j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgba(255, 255, 0, 0.5)";
				}
			}
		}
		//закрашиваем в зеленый по относительной массе силовой установки
		for (let i = 8; i < document.querySelectorAll('td').length; i = i + 11) {
			if (((Number(document.querySelectorAll('td')[i].textContent) > relativeWeightPowerPlant * 0.95) &&
				(Number(document.querySelectorAll('td')[i].textContent) < relativeWeightPowerPlant * 1.05)) &&
				(document.querySelectorAll('td')[i].style.backgroundColor == "rgba(255, 255, 0, 0.5)")) {
				for (let j = i - 8; j <= (i + 2); j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgb(0, 255, 0)";
				}
			}
		}
	} else {
		return;
	}

	

	// прогноз по относительной массе топлива
	// document.querySelectorAll('th')[9].style.backgroundColor = "rgb(255, 255, 0, 0.5)";
	document.querySelectorAll('.par-value')[1].classList.add('color');
	document.querySelectorAll('.par-value')[1].innerHTML = relativeMassFuel.toFixed(3);
	for (let i = 9; i < document.querySelectorAll('td').length; i = i + 11) {
		if (((Number(document.querySelectorAll('td')[i].textContent) > relativeMassFuel * 0.97) &&
			(Number(document.querySelectorAll('td')[i].textContent) < relativeMassFuel * 1.03)) &&
			(document.querySelectorAll('td')[i].style.backgroundColor == "rgb(0, 255, 0)")) {counterPropability++;}
		}
	if (counterPropability != 0) {
		getPropability(counterPropability, 3);
		counterPropability = 0;
		//перекрашиваем желтый в оранжевый
		for (let i = 0; i < document.querySelectorAll('td').length; i = i + 11) {
			if (document.querySelectorAll('td')[i].style.backgroundColor == "rgba(255, 255, 0, 0.5)") {
				for (let j = i; j < i + 11; j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgba(255, 165, 0, 0.5)";
				}
			}
		}
		//переркашиваем зеленый в желтый
		for (let i = 0; i < document.querySelectorAll('td').length; i = i + 11) {
			if (document.querySelectorAll('td')[i].style.backgroundColor == "rgb(0, 255, 0)") {
				for (let j = i; j < i + 11; j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgba(255, 255, 0, 0.5)";
				}
			}
		}
		//закрашиваем в зеленый по относительной массе топлива
		for (let i = 9; i < document.querySelectorAll('td').length; i = i + 11) {
			if (((Number(document.querySelectorAll('td')[i].textContent) > relativeMassFuel * 0.97) &&
				(Number(document.querySelectorAll('td')[i].textContent) < relativeMassFuel * 1.03)) &&
				(document.querySelectorAll('td')[i].style.backgroundColor == "rgba(255, 255, 0, 0.5)")) {
				for (let j = i - 9; j <= (i + 1); j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgb(0, 255, 0)";
				}
			}
		}
	} else {
		return;
	}



	// прогноз по относительной массе системы
	// document.querySelectorAll('th')[10].style.backgroundColor = "#00ff00";
	document.querySelectorAll('.par-value')[2].classList.add('color');
	document.querySelectorAll('.par-value')[2].innerHTML = relativeMassSystems.toFixed(3);
	for (let i = 10; i < document.querySelectorAll('td').length; i = i + 11) {
		if (((Number(document.querySelectorAll('td')[i].textContent) > relativeMassSystems * 0.95) &&
			(Number(document.querySelectorAll('td')[i].textContent) < relativeMassSystems * 1.05)) &&
			(document.querySelectorAll('td')[i - 1].style.backgroundColor == "rgb(0, 255, 0)")) {counterPropability++;}
		}
	if (counterPropability != 0) {
		getPropability(counterPropability, 4);
		counterPropability = 0;
		//перекрашиваем оранжевый в красный
		for (let i = 0; i < document.querySelectorAll('td').length; i = i + 11) {
			if (document.querySelectorAll('td')[i].style.backgroundColor == "rgba(255, 165, 0, 0.5)") {
				for (let j = i; j < i + 11; j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
				}
			}
		}
		//перекрашиваем желтый в оранжевый
		for (let i = 0; i < document.querySelectorAll('td').length; i = i + 11) {
			if (document.querySelectorAll('td')[i].style.backgroundColor == "rgba(255, 255, 0, 0.5)") {
				for (let j = i; j < i + 11; j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgba(255, 165, 0, 0.5)";
				}
			}
		}
		//переркашиваем зеленый в желтый
		for (let i = 0; i < document.querySelectorAll('td').length; i = i + 11) {
			if (document.querySelectorAll('td')[i].style.backgroundColor == "rgb(0, 255, 0)") {
				for (let j = i; j < i + 11; j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgba(255, 255, 0, 0.5)";
				}
			}
		}
		//закрашиваем в зеленый по относительной массе систем
		for (let i = 10; i < document.querySelectorAll('td').length; i = i + 11) {
			if (((Number(document.querySelectorAll('td')[i].textContent) > relativeMassSystems * 0.95) &&
				(Number(document.querySelectorAll('td')[i].textContent) < relativeMassSystems * 1.05)) &&
				(document.querySelectorAll('td')[i].style.backgroundColor == "rgba(255, 255, 0, 0.5)")) {
				for (let j = i - 10; j <= i; j++) {
					document.querySelectorAll('td')[j].style.backgroundColor = "rgb(0, 255, 0)";
				}
			}
		}
	}
}

function getGraf() {
	let data=[];

	// масштабирование реальных данных в данные для нашей координатной системы
	for(i=0; i<mass.length; i++){
		data.push({x: scaleX(mass[i].x)+margin, y: scaleY(mass[i].y) + margin});
	}
	 
	// функция, создающая по массиву точек линии
	var line = d3.line()
		.x(function(d){return d.x;})
		.y(function(d){return d.y;});
		// .curve(d3.curveBasis);

	// добавляем путь
	svg.append("g")
		.append("path")
		.attr("class", "graf")
		.attr("d", line(data))
		.style("stroke", "#00fc15")
		.style("stroke-width", 2);

	svg.selectAll(".dot")
		.data(mass)
		.enter().append("circle")
		.attr("class", "dot")
		.attr("r", 3)
		.attr("cx", function(d) { return scaleX(d.x)+margin; })
		.attr("cy", function(d) { return scaleY(d.y)+margin; });
}

function delGraf() {
	d3.selectAll('.graf').remove();
	d3.selectAll('.dot').remove();
}

function calculation() {
	setParameter();
	setArea();
	setWorkload();
	setMass();
	// calculationButton.setAttribute('disabled', true);
}

function mainFunction() {
	resetColorTd();
	delGraf();
	calculation();
	forecast();
	getGraf();
}

function forecasteTable (row, cell) {
	let row = document.querySelector(".forecast-table").insertRow(2);
	for (let i = 0; i < row; i++) {
		document.querySelector(".forecast-table").insertRow(i);
	}

	for (let i = 0; i < cell; i++) {
		row.insertCell(i).innerHTML = i;
	}
}


document.querySelector('.given-wingspan-value').addEventListener("input", mainFunction);
document.querySelector('.given-middle_chord-value').addEventListener("input", mainFunction);
resetButton.addEventListener("click", resetParametrs);
grafButton.addEventListener("click", delGraf);

document.querySelector('.btn4').addEventListener("click", forecasteTable(3, 3));






var height = 500, width = 900, margin = 50;

// создание объекта svg
var svg = d3.select("div.graf-content")
	.append("svg")
	.attr("class", "axis")
	.attr("width", width)
	.attr("height", height);


// длина оси X= ширина контейнера svg - отступ слева и справа
var xAxisLength = width - 2 * margin;

// длина оси Y = высота контейнера svg - отступ сверху и снизу
var yAxisLength = height - 2 * margin;

// функция интерполяции значений на ось Х  
var scaleX = d3.scaleLinear()
		.domain([0, 5])
		.range([0, xAxisLength]);

// функция интерполяции значений на ось Y
var scaleY = d3.scaleLinear()
		.domain([1, 0])
		.range([0, yAxisLength]);


// создаем ось X   
var xAxis = d3.axisBottom(scaleX).ticks(5);
// создаем ось Y             
var yAxis = d3.axisLeft(scaleY);

// отрисовка оси Х             
svg.append("g")       
	.attr("class", "x-axis")
	.attr("transform",  // сдвиг оси вниз и вправо
		"translate("+ margin +"," + (height - margin) + ")")
	.call(xAxis);

// отрисовка оси Y 
svg.append("g")       
	.attr("class", "y-axis")
	.attr("transform", // сдвиг оси вниз и вправо на margin
			"translate(" + margin + "," + margin + ")")
	.call(yAxis);	

svg.append("text")
	.attr("class", "x-label")
	.attr("text-anchor", "middle")
	.attr("x", width/2)
	.attr("y", height-4)
	.text("Количество параметров");

svg.append("text")
	.attr("class", "y-label")
	.attr("text-anchor", "middle")
	.attr("x", -height/2)
	.attr("y", width-890)
	.attr("transform", "rotate(-90)")
	.text("Совместная вероятность соответствия");

// создаем набор вертикальных линий для сетки   
d3.selectAll("g.x-axis g.tick")
	.append("line")
	.classed("grid-line", true)
	.attr("x1", 0)
	.attr("y1", 0)
	.attr("x2", 0)
	.attr("y2", - (yAxisLength));

// рисуем горизонтальные линии координатной сетки
d3.selectAll("g.y-axis g.tick")
	.append("line")
	.classed("grid-line", true)
	.attr("x1", 0)
	.attr("y1", 0)
	.attr("x2", xAxisLength)
	.attr("y2", 0);