// Importações do projeto
let input = require('fs').readFileSync('entrada.txt', 'utf8');
var lines = input.split('\n')

// Entrada e dados

let valor1 = parseInt(lines.shift());
let valor2 = parseInt(lines.shift());

// Processamento

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