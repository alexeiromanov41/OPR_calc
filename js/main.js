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
	let kEf = 0.7;
	let cEf;

	if (u1 < 2 || n < 1 || nG < 1 || power < 1 || t < 1 || kpd < 0.85) {
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
