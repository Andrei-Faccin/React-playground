// Importações do projeto
let teclado = require('prompt-sync')();

// Entrada e dados

console.log('Digite o primeiro valor: ');
console.log('Digite o segundo valor: ');

// Processamento

let valor1 = parseFloat(teclado());
let valor2 = parseFloat(teclado());
let soma = valor1 + valor2;

// SAIDA
//console.log(`Seu primeiro valor é: ${valor1}, e seu segundo valor: ${valor2}`);
//console.log('+------------------------+');
///console.log('|     Loja do Andrei     |');
//console.log('+------------------------+');
//console.log('|1. Comprar              |');
//console.log('|2. Ver Estoque          |');
//console.log('+------------------------+');
console.log(`sua soma é: ${soma}`);