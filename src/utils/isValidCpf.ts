export function isValidCpf(cpf: string): boolean {
	cpf = cpf.replace(/[^\d]/g, '');

	if (cpf.length !== 11) {
		return false;
	}

	if (/^(\d)\1+$/.test(cpf)) {
		return false;
	}

	let soma = 0;
	for (let i = 0; i < 9; i++) {
		soma += parseInt(cpf.charAt(i)) * (10 - i);
	}
	let resto = soma % 11;
	const digito1 = resto < 2 ? 0 : 11 - resto;

	soma = 0;
	for (let i = 0; i < 10; i++) {
		soma += parseInt(cpf.charAt(i)) * (11 - i);
	}
	resto = soma % 11;
	const digito2 = resto < 2 ? 0 : 11 - resto;

	if (
		parseInt(cpf.charAt(9)) !== digito1 ||
		parseInt(cpf.charAt(10)) !== digito2
	) {
		return false;
	}

	return true;
}
