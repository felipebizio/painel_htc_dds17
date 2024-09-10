import { useEffect, useState } from "react";

function Saudacao(){
    //Criando estado de saudaçãoo
    const [saudacaoPeriodo, setSaudacaoPeriodo] = useState('');

    useEffect(()=>{
        atualizaSaudacao();

        const intervalo = setInterval(atualizaSaudacao,1000);

        //Interrompe a função ao desmonstar o elemento
        return() =>{
            clearInterval(intervalo);
        }
    });
    //Criando texto da saudação
    function atualizaSaudacao(){
        //Declarando o objeto do tipo Date
        const agora = new Date();

        //Obtendo hora em inteiro exemplo 21:15 retorna 21
        const hora = agora.getHours();

        //Obtendo dia da semana em inteiro iniciando em domingo como 0 e sabado como 6
        const dia = agora.getDay();

        //Declarando variavel texto saudacao
        let textoSaudacao = '';

        //Definindo arrays dias da semana
        const diaSemana = [
            'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira','Quinta-Feira', 'Sexta-Feira', 'Sabado'
        ]

        //Adicionando o dia da semana ao textoSaudacao
        textoSaudacao = diaSemana[dia];

        if (hora >= 18){
            textoSaudacao += ' - Boa Noite!';
        }else if (hora >= 12){
            textoSaudacao += ' - Boa Tarde!';
        }else if(hora >= 6){
            textoSaudacao += ' - Bom Dia!';
        }else {
            textoSaudacao += ' - Boa Madrugada!';
        }
        setSaudacaoPeriodo(textoSaudacao);
    }
    
    return (
        <h1>{saudacaoPeriodo}</h1>
    )
}

export default Saudacao;