const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Bem vindo ao sistema de cotacoes',
        author: 'Bruno Leonardo'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Sobre',
        author: 'Bruno Leonardo'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Ajuda',
        author: 'Bruno Leonardo'
    })
})

app.get('/cotacoes',(req,res)=>{

    if(!req.query.ativo){
        return res.status(400).json({
            error:{
                mensage:'O ativo deve ser informado',
                code: 400
            }
            
        })
    }

    const symbol = req.query.ativo.toUpperCase()
    
    cotacoes(symbol,(err,body)=>{
        if(err){

            return res.status(err.code).json({error : {
                mensage: err.mensage,
                code: err.code
            }})
        }

        res.status(200).json(body)
    })
    console.log(req.query.ativo)
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errormensage : 'Não existe página depois de /help',
        author: 'Bruno Leonardo'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errormensage : 'Página não encontrada'})
})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
    
})