/***** Вычисление диаметра провода по сечению      begin*************/
const calcWireD = document.getElementById('calcWireD');
const sqIn = document.getElementById('wireS');
const dOut = document.getElementById('wireD');

calcWireD.addEventListener('click', () => {
	let S = sqIn.value;
	if (S <= 0) {
		alert('Недопустимое значение');
	} else {
		let D = Math.sqrt((4 * S) / Math.PI).toFixed(2);
		console.log(D);
		dOut.value = D;
	}
});
/***** Вычисление диаметра провода по сечению      end*************/

/***** Расчет емкости АКБ      begin*************/
const u1AKB = document.getElementById('u1AKB');
const nAKBG = document.getElementById('nAKBG');
const nGroup = document.getElementById('nGroup');
const powerD = document.getElementById('powerD');
const timeD = document.getElementById('timeD');
const kpdUPS = document.getElementById('kpdUPS');
const CAKB = document.getElementById('CAKB');
const calcCAKB = document.getElementById('calcCAKB');
let cEf;

calcCAKB.addEventListener('click', () => {
	let u1 = u1AKB.value;
	let n = nAKBG.value;
	let nG = nGroup.value;
	let power = powerD.value;
	let t = timeD.value;
	let kpd = kpdUPS.value;
	let C;
	let uAll;
	let cellNumber;
	let dischargeConstPower;
	let dischargeConstCurrent;
	let cEf;

	const getK = () => {
		let kEfCalc;
		const tableK = [
			{
				timeK: 5,
				koef: 0.18,
			},
			{
				timeK: 10,
				koef: 0.4,
			},
			{
				timeK: 15,
				koef: 0.5,
			},
			{
				timeK: 20,
				koef: 0.5,
			},
			{
				timeK: 25,
				koef: 0.58,
			},
			{
				timeK: 30,
				koef: 0.61,
			},
			{
				timeK: 35,
				koef: 0.64,
			},
			{
				timeK: 40,
				koef: 0.67,
			},
			{
				timeK: 45,
				koef: 0.68,
			},
			{
				timeK: 50,
				koef: 0.7,
			},
			{
				timeK: 55,
				koef: 0.72,
			},
			{
				timeK: 60,
				koef: 0.73,
			},
			{
				timeK: 90,
				koef: 0.8,
			},
			{
				timeK: 120,
				koef: 0.84,
			},
			{
				timeK: 600,
				koef: 1,
			},
		];

		for (let index = 0; index < tableK.length; index++) {
			const element = tableK[index];
			if (element.timeK == t) {
				kEfCalc = element.koef;
				break;
			} else if (element.timeK > t) {
				kEfCalc = 0.01;
				break;
			} else {
				kEfCalc = 1;
				break;
			}
		}

		// tableK.forEach((element, index) => {
		// 	if (element.timeK == t) {
		// 		console.log(index);
		// 		return (kEfCalc = element.koef);
		// 	} else if (element.timeK > t) {
		// 		return (kEfCalc = 0.01);
		// 	} else {
		// 		return (kEfCalc = 1);
		// 	}
		// });
		return kEfCalc;
	};

	let kEf = getK();
	console.log(kEf);

	if (u1 < 2 || n < 1 || nG < 1 || power < 1 || t < 5 || kpd < 0.85) {
		alert('Недопустимое значение');
	} else {
		uAll = u1 * n;
		cellNumber = u1 / 2;
		dischargeConstPower = power / n / cellNumber / nG;
		dischargeConstCurrent = dischargeConstPower / 1.9;
		cEf = (t * dischargeConstCurrent) / 60;
		C = (cEf / kEf / kpd).toFixed(2);

		CAKB.value = C;
	}
});
/***** Расчет емкости АКБ      end*************/
