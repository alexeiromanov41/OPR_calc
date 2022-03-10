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

// console.log(S);
