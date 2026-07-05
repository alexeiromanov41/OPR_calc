/***** Вычисление условного обозначения      begin*************/
const genLMD = document.getElementById('genLMD');
const catLMD = document.getElementById('catLMD');
const pwrLMD = document.getElementById('pwrLMD');
const mnfLMD = document.getElementById('mnfLMD');
const lenLMD = document.getElementById('lenLMD');
const headCleanLMD = document.getElementById('headCleanLMD');
const headWeldLMD = document.getElementById('headWeldLMD');
const nameFeedLMD = document.getElementById('nameFeedLMD');
const wnULMD = document.getElementById('wnULMD');

const faULMD = document.getElementById('faULMD');
const fgULMD = document.getElementById('fgULMD');
const cdULMD = document.getElementById('cdULMD');
const mpULMD = document.getElementById('mpULMD');
const psULMD = document.getElementById('psULMD');

const nameResLMD = document.getElementById('nameResLMD');
const artResLMD = document.getElementById('artResLMD');
const calcStrLMD = document.getElementById('calcStrLMD');

const pwrSecLMD = document.getElementById('powerSectionLMD');
const clHdSecLMD = document.getElementById('cleanHeadSectionLMD');
const wlHdSecLMD = document.getElementById('weldHeadSectionLMD');
const prSnrSecLMD = document.getElementById('pressureSensorSectionLMD');
const prtGasFltrSecLMD = document.getElementById('protectGasFilterSectionLMD');
const fdSecLMD = document.getElementById('feedSectionLMD');

catLMD.addEventListener('change', () => {
	if (catLMD.value === 'M') {
		clHdSecLMD.classList.add('displayNone');
		wlHdSecLMD.classList.remove('displayNone');

		prSnrSecLMD.classList.add('displayNone');
		prtGasFltrSecLMD.classList.remove('displayNone');

		fdSecLMD.classList.remove('displayNone');
	} else {
		clHdSecLMD.classList.remove('displayNone');
		wlHdSecLMD.classList.add('displayNone');

		prSnrSecLMD.classList.remove('displayNone');
		prtGasFltrSecLMD.classList.add('displayNone');

		fdSecLMD.classList.add('displayNone');
	}
});

calcStrLMD.addEventListener('click', () => {
	let strName = '';
	let strArt = '';

	strName += catLMD.value;
	strArt += catLMD.value;
	strName += '-';
	strName += pwrLMD.options[pwrLMD.selectedIndex].text;
	strArt += pwrLMD.value;
	strName += '-';
	strName += mnfLMD.value;
	strArt += mnfLMD.value;
	strName += '-';
	strName += 'L';
	strName += lenLMD.value;
	strArt += lenLMD.value;
	strName += '-';
	strName += 'H';

	/* **************** */
	if (catLMD.value === 'C') {
		/* Чистка */
		strName += headCleanLMD.value;
		strArt += headCleanLMD.value;
	} else {
		/* Сварка */
		strName += headWeldLMD.value;
		strArt += headWeldLMD.value;
	}
	/* **************** */

	strName += '-';
	strName += 'F';

	/* **************** */
	if (faULMD.checked) {
		strName += '1';
		strArt += '1';
	} else {
		strName += '0';
		strArt += '0';
	}
	/* **************** */

	/* **************** */
	if (fgULMD.checked) {
		strName += '1';
		strArt += '1';
	} else {
		strName += '0';
		strArt += '0';
	}
	/* **************** */

	/* **************** */
	if (catLMD.value === 'C') {
		/* Чистка */
		/* **************** */
		if (cdULMD.checked) {
			strName += '1';
			strArt += '1';
		} else {
			strName += '0';
			strArt += '0';
		}
		/* **************** */
	} else {
		/* Сварка */
		/* **************** */
		if (mpULMD.checked) {
			strName += '1';
			strArt += '1';
		} else {
			strName += '0';
			strArt += '0';
		}
		/* **************** */
	}
	/* **************** */

	/* **************** */
	if (psULMD.checked) {
		strName += '1';
		strArt += '1';
	} else {
		strName += '0';
		strArt += '0';
	}
	/* **************** */

	strName += '-';

	/* **************** */
	if (catLMD.value === 'C') {
		/* Чистка */
	} else {
		/* Сварка */
		strName += 'W';
		strName += nameFeedLMD.value;
		strArt += nameFeedLMD.value;
		strName += '-';
	}
	/* **************** */

	strName += 'G';
	strName += genLMD.value;
	strArt += genLMD.value;

	nameResLMD.value = strName;
	artResLMD.value = strArt;
});
/***** Вычисление условного обозначения       end*************/

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

		if (t >= 5) {
			for (let index = 0; index < tableK.length; index++) {
				const element = tableK[index];
				if (element.timeK == t) {
					kEfCalc = element.koef;
					break;
				} else if (element.timeK > t) {
					let i1 = index;
					let i0 = i1--;
					let kPr = (
						(tableK[i1].koef - tableK[i0].koef) /
						(tableK[i1].timeK - tableK[i0].timeK)
					).toFixed(10);
					let kB = (tableK[i1].koef - kPr * tableK[i1].timeK).toFixed(10);
					kEfCalc = (parseFloat(kPr * t) + parseFloat(kB)).toFixed(4);
					break;
				} else if (index == tableK.length - 1 && kEfCalc == undefined) {
					kEfCalc = 1;
					break;
				}
			}
		}

		return kEfCalc;
	};

	let kEf = getK();
	console.log('Kef = ' + kEf);

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
