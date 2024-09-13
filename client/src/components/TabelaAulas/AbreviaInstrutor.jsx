'use strick';

function AbreviaInstrutor({instrutor}){
    const nomes = instrutor.split(' ')
    if(nomes.length === 1){
        return nomes[0];
    }
    return `${nomes[0]} ${nomes[nomes.length - 1]}` 

}
export default AbreviaInstrutor;