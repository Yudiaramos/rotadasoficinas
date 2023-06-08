function converteParaRomano(num){
    var RomanoParaArabe = { //possiveis numeros arabes para romanos
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };

    let romano = ''; // inicia romano com uma string vazia

    for(var key in RomanoParaArabe){
        while(num >= RomanoParaArabe[key]){ //compara se o numero é maior que o atual romano
            romano += key; //se sim soma o romano
            num -= RomanoParaArabe[key]; //caso isso aconteca romano anterior e removido
        }
    }
    document.getElementById('romanInput').value = romano; // valor romano ja convertido e o novo valor do input romano
}

document.getElementById('convert').addEventListener('click', function(){ //cria evento para clique do botão "converter"
    let number = document.getElementById('numberInput').value; //le o valor dado no input de numeros arábes

    converteParaRomano(number); //chama funcao de conversao para romano
});

