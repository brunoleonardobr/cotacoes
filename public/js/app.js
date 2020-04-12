console.log('javascript no frontend');

const cotacoesForm = document.querySelector('form')
const mainmensage = document.querySelector('h3')
const price = document.querySelector('#price')
const price_open = document.querySelector('#price_open')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('day_low')

cotacoesForm.addEventListener('submit',(event)=>{
    mainmensage.innerText = 'buscando...'
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainmensage.innerText = "O ativo deve ser informado"
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                mainmensage.innerText = `Alguma coisa deu errado - ${data.error.mensage}, código ${data.error.code}`;
                price.innerHTML = `${data.error.mensage} | código ${data.error.code}`
                price_open.innerHTML = ''
                day_high.innerHTML = ''
                day_low.innerHTML = ''
            }else{
                mainmensage.innerText = data.symbol
                price.innerHTML = `price: ${data.price}`
                price_open.innerHTML = `price open: ${data.price_open}`
                day_high.innerHTML = `day high: ${data.day_high}`
                day_low.innerHTML = `day low: ${data.day_low}`
            }
        })
    })
})