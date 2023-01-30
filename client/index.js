var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x1BAb8A87a05335991eb39Bf1999839ae1d734697";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0]

        console.log(instance)

        instance.events.Birth()
        .on("data", function(event){
          console.log(event)
          let owner = event.returnValues.owner
          let tokenId = event.returnValues.tokenId
          let mumId = event.returnValues.mumId
          let dadId = event.returnValues.dadId
          let genes = event.returnValues.genes
          let generation = event.returnValues.generation

          $(".creationMessage").css("display", "block")
          $(".creationMessage").text(" ")
          $(".creationMessage").append("<b>Success!<br>Owner: </b>" + owner
                                    + "<br><b>Kitty ID: </b>" + tokenId
                                    + "<br><b>Mum ID: </b>" + mumId
                                    + "<br><b>Dad ID: </b>" + dadId
                                    + "<br><b>Genes: </b>" + genes
                                    + "<br><b>Generation: </b>" + generation)

            renderCatOnEvent(tokenId, genes, generation)
        
        })
        .on("error", console.error)

    })

})

$("#show").click(()=>renderCat2())

$("#showAll").click(()=>showAll())

$("#breedButton").click(()=>breedKitties3())

async function showAll() {
    $("#showAllKitties").text("")
    result = await instance.methods.tokensOfOwner(user).call()
    console.log(result)
    for (let i = result.length -1; i >= 0; i--) {
        kittyId = result[i]
        kitty = await instance.methods.getKitty(kittyId).call()
        $("#showAllKitties").append("<b>Kitty ID: </b>" + kittyId + ",<b>Mum ID: </b>" + kitty.mumId + ",<b>Dad ID: </b>" + kitty.dadId + ",<b>DNA: </b>" + kitty.genes + ",<b>Generation: </b>" + kitty.generation + "<br>")
    }
}

async function breedKitties3(){
    var kittyId1 = document.getElementById('enterId1').value
    var kittyId2 = document.getElementById('enterId2').value
    _tokenId = await instance.methods.breed(kittyId1, kittyId2).send()
}

async function renderCatOnEvent(tokenId, genes, generation) {
    $('#generation2').html(generation)
    $('#kittyId2').html(tokenId) 

    stringGenes = genes.toString()

    var headcolor2 = stringGenes[0] + stringGenes[1]
    var teethColor2 = stringGenes[2] + stringGenes[3]
    var eyesColor2 = stringGenes[4] + stringGenes[5]
    var earsColor2 = stringGenes[6] + stringGenes[7]
    var eyesShape2 = stringGenes[8]
    var decorationPattern2 = stringGenes[9]
    var decorationColor2 = stringGenes[10] + stringGenes[11]
    var whiskersColor2 = stringGenes[12] + stringGenes[13]
    var teethVariation2 = stringGenes[14]
    var animation2 = stringGenes[15]

    headColor29(colors[headcolor2],headcolor2)
    teethColor29(colors[teethColor2],teethColor2)
    eyesColor29(colors[eyesColor2],eyesColor2)
    earsColor29(colors[earsColor2],earsColor2)
    eyesFunction(eyesShape2)
    decorationFunction(decorationPattern2)   
    decorationColor29(colors[decorationColor2],decorationColor2)
    whiskersColor29(colors[whiskersColor2],whiskersColor2)
    teethFunction(teethVariation2)
    animationFunction(animation2)  
}

async function renderCat2(){

    var _tokenId = document.getElementById('enterId').value
    await renderGeneration(_tokenId)
    await renderGenes(_tokenId)
    $('#kittyId2').html(_tokenId)    
}

async function renderGeneration(_tokenId) {
    var kittyGeneration = await instance.methods.getKittyGeneration(_tokenId).call()

    stringGeneration = kittyGeneration.toString()
    $('#generation2').html(stringGeneration)

}

async function renderGenes(_tokenId) {
    var kittyGenes = await instance.methods.getKittyGenes(_tokenId).call()
    // return kittyGenes
    stringGenes = kittyGenes.toString()
    console.log(stringGenes)

    var headcolor2 = stringGenes[0] + stringGenes[1]
    var teethColor2 = stringGenes[2] + stringGenes[3]
    var eyesColor2 = stringGenes[4] + stringGenes[5]
    var earsColor2 = stringGenes[6] + stringGenes[7]
    var eyesShape2 = stringGenes[8]
    var decorationPattern2 = stringGenes[9]
    var decorationColor2 = stringGenes[10] + stringGenes[11]
    var whiskersColor2 = stringGenes[12] + stringGenes[13]
    var teethVariation2 = stringGenes[14]
    var animation2 = stringGenes[15]

    headColor29(colors[headcolor2],headcolor2)
    teethColor29(colors[teethColor2],teethColor2)
    eyesColor29(colors[eyesColor2],eyesColor2)
    earsColor29(colors[earsColor2],earsColor2)
    eyesFunction(eyesShape2)
    decorationFunction(decorationPattern2)   
    decorationColor29(colors[decorationColor2],decorationColor2)
    whiskersColor29(colors[whiskersColor2],whiskersColor2)
    teethFunction(teethVariation2)
    animationFunction(animation2)
}

function eyesFunction(eyesShape2) {
    $('#dnashape2').html(eyesShape2)
    if (eyesShape2 == 1) {
        normalEyes29()
    }
    else if (eyesShape2 == 2) {
        eyesType129()
    }
    else {
        eyesType229()
    }
}

function decorationFunction(decorationPattern2) {
    $('#dnadecoration2').html(decorationPattern2)
    if (decorationPattern2 == 1) {
        normaldecoration29()
    }
    else if (decorationPattern2 == 2) {
        decorationType229()
    }
    else {
        decorationType329()
    }
}

function teethFunction(teethVariation2) {
    $('#dnateethVariation2').html(teethVariation2)
    if (teethVariation2 == 1) {
        teethVariationType129()
    }
    else {
        teethVariationType229()
    }

}

function animationFunction(animation2) {
    $('#dnaanimation2').html(animation2)
    if (animation2 == 1) {
        animationType129()
    }
    else if (animation2 == 2) {
        animationType229()
    }
    else if (animation2 == 3) {
        animationType329()
    }
    else {
        resetAnimation2()
    }
}