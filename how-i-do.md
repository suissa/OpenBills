# Atomic FUCKING BIO Design - 

Fiz uma pequena grande mudança nas *Organelles* para melhorar meu conceito biológico, 
dessa vez adicionei o conceito de *Enzyme* (enzima), o qual possui algumas características, 
que EU, achei deveras interessante.

Vamos iniciar nossa jornada pela Biologia conhecendo para que serve a enzima. 

![](https://ka-perseus-images.s3.amazonaws.com/7cfb71d72534e7c98b02fd1afc815a4100dccfcc.svg)

> Enzimas são grupos de substâncias orgânicas de natureza normalmente proteica 
> (existem também enzimas constituídas de RNA [1], as ribozimas), com atividade intra ou 
> extracelular que têm funções catalisadoras, catalisando reações químicas que, sem a sua presença, 
> dificilmente aconteceriam. 
> 
> Isso é conseguido através do abaixamento da energia de ativação necessária para que se dê uma 
> reação química, resultando no aumento da velocidade da reação e possibilitando o metabolismo 
> dos seres vivos. A capacidade catalítica das enzimas torna-as adequadas para aplicações industriais, 
> como na indústria farmacêutica ou na alimentar.

**Perceba como elas são importantes:**

> Em sistemas vivos, a maioria das reações bioquímicas dá-se em vias metabólicas, que são 
> sequências de reações em que o produto de uma reação é utilizado como reagente na reação 
> seguinte. Diferentes enzimas catalisam diferentes passos de vias metabólicas, agindo de forma 
> concertada de modo a não interromper o fluxo nessas vias.


Quero que você atenha-se a essa frase: 

> Diferentes enzimas catalisam diferentes passos de vias metabólicas, 
> agindo de forma concertada de modo a não interromper o fluxo nessas vias.


Traduzindo isso para nós, programadores, podemos pensar nas enzimas como funções e 
nas vias metabólicas como as rotas da nossa API.


**Fazendo apenas um adendo,** analise essa frase: 

> "o produto de uma reação é utilizado como reagente na reação seguinte"

Podemos exemplificar assim:

```js

const Reaction = ( reagent ) => react( reagent )

const product1 = Reaction( reagent )
const product2 = Reaction( product1 )
const product3 = Reaction( product2 )

// ...

```


> **E agora?**


![](http://i2.kym-cdn.com/entries/icons/original/000/008/798/Too_Easy_2.png)
 

Após essa introdução básica vamos entender como a Enzima trabalha:


 > As enzimas convertem uma substância, chamada de substrato, noutra denominada produto, 
 > e são extremamente específicas para a reação que catalisam. Isso significa que, em geral, uma 
 > enzima catalisa um e só um tipo de reacção química. Consequentemente, o tipo de enzimas 
 > encontradas numa célula determina o tipo de metabolismo que a célula efetua.


Podemos fazer a seguinte analogia: **se as enzimas convertem X em Y podemos dizer 
que ela é uma função (catalizadora).**


```js

const product = Enzyme.catalyze( Reaction( substrate ) )

```


> A atividade enzimática pode depender da presença de determinadas moléculas, 
> genericamente chamadas cofatores.


Vamos lembrar que fizemos uma analogia com as rotas, sendo assim essa função precisa ter a seguinte
assinatura dos parâmetros: `( req, res )`.


```js

module.exports = (Organism) => (req, res) => {

  const cofactors = { req, res }

}

```


Criamos a `const cofactors` com o `req` e `res` para que possamos injeta-los na Enzima.

Após esse pequeno esclarecimento acerca da Enzima podemos partir para nossa função de rota:

```js

module.exports = (Organism) => 
  (req, res) => {
    const query = {}
    const success = require('./ribosomes/success-200-json')(res)
    const error = require('./ribosomes/error-json')(res)
    
    return Organism.find(query)
                    .exec()
                    .then(success)
                    .catch(error)
  }

```


Primeira coisa que faremos é separar a Enzima desse código.

![](http://i.giphy.com/GmdFiZtdJtQty.gif)

> **CALMA!** 

> Juro que será mais fácil que mijar sentado.


```js
// _enzymes/find.js
module.exports = ( Organism, query ) => Organism.find( query ).exec()

```


> Viu? Indolor!


Ainda precisamos conhecer mais um conceito para podermos refatorar nossa função da rota.


> Determinadas substâncias, podem inibir a atividade de algumas enzimas, diminuindo-a ou 
> eliminando-a totalmente; são os chamados inibidores enzimáticos.


Como não queremos inibir a execução da Enzima iremos fazer uma analogia desse conceito 
com o *callback* de **erro** da *Promise* (`catch`). 

> Agora sim chegou **A HORA**!

Vamos refatorar a `_organelles/find.js` assim:


```js

module.exports = (Organism) => 
  (req, res) => {
    const substrate = {}
    const enzyme = `find`
    const convertToProduct = require(`./ribosomes/success-200-json`)(res)
    const inhibitor = require(`./ribosomes/error-json`)(res)
    const catalyze = require(`./../_enzymes/${enzyme}`)

    return catalyze( Organism, substrate, cofactors )
                                .then( convertToProduct )
                                .catch( inhibitor )
  }

```


Para facilitar o entendimento pense no seguinte: o `substrate` é nossa antiga `query`, pois é com 
esse valor que iremos gerar um `product` como resultado da reação.

Como o sucesso dessa reação será nosso produto, chamei ele de `convertToProduct` porque será 
utilizado no `then`, ficando: `then( convertToProduct )`. 

**Caso você não entenda essas simples palavras em Inglês dar-te-ei essa dica já!**

>**ESTUDE! Pois para um programador isso é obrigatório e não uma opção.**

*Traduzindo: então converta para produto*

Já sabemos que o *callback* de erro foi instanciado em `inhibitor`, sei que parece estranho 
nomear **tão diferentemente** o sucesso do erro, porém para esse contexto achei que foi a 
melhor solução, mas estou sempre aberto a sugestōes.

Você deve se indagar:

> Mas e a **porra** do `cofactors` você fez só de bonito?
>  
> - Não, fiz de lindo.

Ainda não usamos o `cofactors` pois a Enzima de *find* não precisou, mas vamos ver uma Enzima 
que precise: `findByFilter`.

```js

module.exports = (Organism) => (req, res) => {

    const substrate = req.query
    const cofactors = { req, res }
    const enzyme = __filename.split(`_organelles/`)[1].split('.js')[0]
    const convertToProduct = require(`./ribosomes/success-200-json`)(res)
    const inhibitor = require(`./ribosomes/error-json`)(res)
    const catalyze = require(`./../_enzymes/${enzyme}`)

    return catalyze( Organism, substrate, cofactors )
                                .then( convertToProduct )
                                .catch( inhibitor )
}
```


Percebeu que agora eu pego o nome da Enzima a partir do nome do seu arquivo???


```js

const enzyme = __filename.split(`_organelles/`)[1].split('.js')[0]

```


Agora apenas observe nossa Enzima:


```js

module.exports = (Organism, query, {req, res}) => {

    let filtros = Object
                        .keys( query )
                        .map( el => ( Number.isNaN( parseInt( query[el] ) ) )
                                              ? {[el]: new RegExp(query[el].trim(), 'gi') }
                                              : {[el]: query[el]} )
                        .reduce(( acc, cur ) => Object.assign( acc, cur ), {})

    return Organism.find( filtros ).exec() 
}

```

![](https://ka-perseus-images.s3.amazonaws.com/1d7e59bb1a3bfce307a001c2d4bbf763d0d11641.svg)

## Factories <3

> Where the love  lives.

### Organism

Nessa *factory* recebemos o `DNA` e a `Molecule` e retornamos o `Organism` que pode ser comparada com uma célula, sua saída é essa:

```js

{ name: 'Bill',
   find: [Function],
   create: [Function],
   getSchema: [Function],
   findByFilter: [Function],
   findAllPopulate: [Function],
   findById: [Function],
   findByIdPopulate: [Function],
   update: [Function],
   remove: [Function],
   findOne: [Function],
   test: [Function] }

```

Logo retornamos um objeto com o nome do `Organism/Module` e sua organelas, que sao as açōes executadas a partir de uma rota (pensar em uma nomenclatura). 


> Como refatorar nosso code.


```js

const mongoose = require('mongoose')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

module.exports = (DNA, Molecule) => {

  const Organism = mongoose.model(DNA.name, Molecule) 
  const Organelles = require('./../_config/organism/organelles.default')

  const OrganellesCell = 
    (Array.isArray(DNA.organelles))
      ? (Array.isArray(DNA.middlewares)) 
          ? DNA.organelles.concat(Organelles).concat(DNA.middlewares)
            : DNA.organelles.concat(Organelles)
      : Organelles

  const createOrganelles = (acc, name) => 
    Object.assign(acc, {
        [name]: require(organellesPath+name)(Organism, DNA.populate)})

  return OrganellesCell.reduce(createOrganelles, {name: DNA.name})
}

```

Primeiramente irei refatorar o teste se algo eh um array:

```js

const mongoose = require('mongoose')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

module.exports = (DNA, Molecule) => {

  const Organism = mongoose.model(DNA.name, Molecule)
  const Organelles = require('./../_config/organism/organelles.default')

  const OrganellesCell = 
    ( DNA.organelles.map ) // Array.isArray(DNA.organelles)
      ? ( DNA.middlewares.map ) // Array.isArray(DNA.middlewares)
          ? DNA.organelles.concat(Organelles).concat(DNA.middlewares)
            : DNA.organelles.concat(Organelles)
      : Organelles

  const createOrganelles = (acc, name) => 
    Object.assign(acc, {
        [name]: require(organellesPath+name)(Organism, DNA.populate)})


  return OrganellesCell.reduce(createOrganelles, {name: DNA.name})
}

```

Utilizei a técnica de checar se uma funcionalidade existe, no caso: `DNA.organelles.map`. Com isso saberemos se ela é ou nao um *array*.

Deixando os requires no topo, saudades do C <3

```js

const mongoose = require('mongoose')
const Organelles = require('./../_config/organism/organelles.default')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

```


Iniciamos a serie de remoção das funçōes de dentro do module.exports.

```js

const createOrganism = ( name, Molecule ) => mongoose.model( name, Molecule )

module.exports = (DNA, Molecule) => {

  const Organism = createOrganism( DNA.name, Molecule )
//...
}

```



Criei a createCell que cria a Cell, antiga OrganellesCell

```js

const mongoose = require('mongoose')
const Organelles = require('./../_config/organism/organelles.default')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

const createOrganism = ( name, Molecule ) => 
  mongoose.model( name, Molecule )

const createCell = ( DNA, Organelles ) =>
  ( DNA.organelles.map ) // Array.isArray(DNA.organelles)
    ? ( DNA.middlewares.map ) // Array.isArray(DNA.middlewares)
        ? DNA.organelles.concat(Organelles).concat(DNA.middlewares)
        : DNA.organelles.concat(Organelles)
    : Organelles

module.exports = (DNA, Molecule) => {

  const Organism = createOrganism( DNA.name, Molecule )
  const Cell = createCell( DNA, Organelles )

  const createOrganelles = (acc, name) => 
    Object.assign(acc, {
        [name]: require(organellesPath+name)(Organism, DNA.populate)})


  return Cell.reduce(createOrganelles, {name: DNA.name})
}

```

Separei a fn createOrganelles onde injeto `Organism` e `DNA.populate` para que ela nao acesse vars globais/fora do seu escopo. Bem aqui: `return Cell.reduce(createOrganelles( Organism, DNA.populate), {name: DNA.name} )`


```js

const mongoose = require('mongoose')
const Organelles = require('./../_config/organism/organelles.default')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

const createOrganism = ( name, Molecule ) => 
  mongoose.model( name, Molecule )

const createCell = ( DNA, Organelles ) =>
  ( DNA.organelles.map ) // Array.isArray(DNA.organelles)
    ? ( DNA.middlewares.map ) // Array.isArray(DNA.middlewares)
        ? DNA.organelles.concat(Organelles).concat(DNA.middlewares)
        : DNA.organelles.concat(Organelles)
    : Organelles

const createOrganelles = ( Organism, populate ) => ( acc, name ) => 
  Object.assign( acc, {
    [name]: require( organellesPath+name )( Organism, populate )
  } )

module.exports = (DNA, Molecule) => {

  const Organism = createOrganism( DNA.name, Molecule )
  const Cell = createCell( DNA, Organelles )

  return Cell.reduce(createOrganelles( Organism, DNA.populate ), {name: DNA.name} )
}

```

Entao apenas substitui as fns createOrganism e createCell onde tinha seus valores salvos em suas consts.

```js

const mongoose = require('mongoose')
const Organelles = require('./../_config/organism/organelles.default')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

const createOrganism = ( name, Molecule ) => 
  mongoose.model( name, Molecule )

const createCell = ( DNA, Organelles ) =>
  ( DNA.organelles.map ) // Array.isArray(DNA.organelles)
    ? ( DNA.middlewares.map ) // Array.isArray(DNA.middlewares)
        ? DNA.organelles.concat(Organelles).concat(DNA.middlewares)
        : DNA.organelles.concat(Organelles)
    : Organelles

const createOrganelles = ( Organism, populate ) => ( acc, name ) => 
  Object.assign( acc, {
    [name]: require( organellesPath+name )( Organism, populate )
  } )

module.exports = (DNA, Molecule) => 
  createCell( DNA, Organelles )
    .reduce( createOrganelles( createOrganism( DNA.name, Molecule ), 
                                DNA.populate), 
                                {name: DNA.name} 
                              )

```


Para finalizar encapsulei as fns chamadas no module.exports para deixar mais legivel, agora a fn mestre eh aMakeLife que executa a Mitosis na Cell.

Foi coisa simples, mas espero que possa ajudar alguem e claro se vc quiser comentar com a sua refatoraçao eu agradeço.

```js

const mongoose = require('mongoose')
const Organelles = require('./../_config/organism/organelles.default')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

const createOrganism = ( name, Molecule ) => 
  mongoose.model( name, Molecule )

const createCell = ( DNA, Organelles ) =>
  ( DNA.organelles.map ) // Array.isArray(DNA.organelles)
    ? ( DNA.middlewares.map ) // Array.isArray(DNA.middlewares)
        ? DNA.organelles.concat(Organelles).concat(DNA.middlewares)
        : DNA.organelles.concat(Organelles)
    : Organelles

const createOrganelles = ( Organism, populate ) => ( acc, name ) => 
  Object.assign( acc, {
    [name]: require( organellesPath+name )( Organism, populate )
  } )

const Mitosis = ( DNA, Molecule ) => ( Cell ) => 
  Cell.reduce( createOrganelles(  createOrganism( DNA.name, Molecule ), 
                                  DNA.populate ), 
                                {name: DNA.name} 
                                )

const MakeLife = ( DNA, Molecule, Organelles ) => 
  Mitosis( DNA, Molecule )(createCell( DNA, Organelles ))
    
module.exports = ( DNA, Molecule ) => MakeLife( DNA, Molecule, Organelles ) 

```

Nao me aguentei e fui estudar pesquisar mais um pouco sobre Biologia e acabou virando nisso:

```js

const mongoose = require('mongoose')
const Organelles = require('./../_config/organism/organelles.default')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

const createCytoplasm = ( name, Molecule ) => 
  mongoose.model( name, Molecule )

const createCell = ( DNA, Organelles ) =>
  ( DNA.organelles.map ) // Array.isArray(DNA.organelles)
    ? ( DNA.middlewares.map ) // Array.isArray(DNA.middlewares)
        ? Transcript( DNA, Organelles, `with middlewares` )
        : Transcript( DNA, Organelles )
    : Organelles

const createOrganelles = ( Organism, organellesPath ) => 
  ( acc, name ) => 
    Object.assign( acc, {
      [ name ]: require( organellesPath+name )( Organism )
    } )

const Transcript = ( DNA, Organelles, middlewares = false ) => 
  ( middlewares )
    ? DNA.organelles.concat(Organelles)
    : DNA.organelles.concat(Organelles).concat(DNA.middlewares)

const Synthesis = ( DNA, Molecule ) => 
  createOrganelles( createCytoplasm( DNA.name, Molecule ), organellesPath )

const Mitosis = ( DNA, Molecule ) => ( Cell ) => 
  Cell.reduce( Synthesis( DNA, Molecule ), {name: DNA.name} )

const MakeLife = ( DNA, Molecule, Organelles ) => 
  Mitosis( DNA, Molecule )( createCell( DNA, Organelles ) )
    
module.exports = ( DNA, Molecule ) => MakeLife( DNA, Molecule, Organelles )

```


## Citoplasma

Além de servir de meio das reações metabólicas vitais 
(glicólise anaeróbia e a síntese proteica), é onde se localizam 
as mitocôndrias e o citoesqueleto, este mantendo a consistência e 
a forma da célula. É também o local de armazenamento de substâncias 
químicas indispensáveis à vida.

fonte: [https://pt.wikipedia.org/wiki/Citoplasma](https://pt.wikipedia.org/wiki/Citoplasma)


## Complexo de Golgi

> A maior parte das vesículas transportadoras que saem do retículo endoplasmático, são transportadas até o complexo de Golgi, onde são modificadas, ordenadas e enviadas na direção dos seus destinos finais. A organela está presente na maior parte das células eucarióticas, mas tende a ser mais proeminente nas células de órgãos responsáveis pela secreção de certas substâncias, tais como o pâncreas, a hipófise e a tireoide.

...

> À medida que se movem de cisterna a cisterna através das pilhas, as proteínas são modificadas sucessivamente em cada estágio, até que a glicosilação se complete.

fonte: [https://pt.wikipedia.org/wiki/Complexo_de_Golgi](https://pt.wikipedia.org/wiki/Complexo_de_Golgi)


## Fontes

- [Enzyme](https://en.wikipedia.org/wiki/Enzyme)
- [Enzyme inhibitor](https://en.wikipedia.org/wiki/Enzyme_inhibitor)
- [Enzyme kinetics](https://en.wikipedia.org/wiki/Enzyme_kinetics)
- [Enzymes and the active site](https://www.khanacademy.org/science/biology/energy-and-enzymes/introduction-to-enzymes/a/enzymes-and-the-active-site)
- [Enzyme structure and function](https://www.khanacademy.org/test-prep/mcat/biomolecules/enzyme-structure-and-function/a/enzyme-structure-and-function)
- [Catalysis](https://en.wikipedia.org/wiki/Catalysis)
- [Substrate](https://en.wikipedia.org/wiki/Substrate_(chemistry))
- [Metabolism](https://en.wikipedia.org/wiki/Metabolism)
- [Metabolic pathway](https://en.wikipedia.org/wiki/Metabolic_pathway)


![](https://cdn.meme.am/cache/instances/folder230/47194230.jpg)


