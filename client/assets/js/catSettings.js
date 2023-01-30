
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "teethColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationColor" : 13,
    "whiskersColor" : 13,
    "teethVariation" :  1,
    "animation" :  2,
    // "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headcolor);
  $('#dnateeth').html(defaultDNA.teethColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationColor').html(defaultDNA.decorationColor)
  $('#dnawhiskersColor').html(defaultDNA.whiskersColor)
  $('#dnateethVariation').html(defaultDNA.whiskersColor)
  $('#dnaanimation').html(defaultDNA.animation)
  // $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnateeth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationColor').html()
    dna += $('#dnawhiskersColor').html()
    dna += $('#dnateethVariation').html()
    dna += $('#dnaanimation').html()
    // dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    teethColor(colors[dna.teethColor],dna.teethColor)
    $('#teethcolor').val(dna.teethColor)
    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyescolor').val(dna.eyesColor)
    earsColor(colors[dna.earsColor],dna.earsColor)
    $('#earscolor').val(dna.earsColor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decoration').val(dna.decorationPattern)
    decorationColor(colors[dna.decorationColor],dna.decorationColor)
    $('#decorationcolor').val(dna.decorationColor)
    whiskersColor(colors[dna.whiskersColor],dna.whiskersColor)
    $('#whiskerscolor').val(dna.whiskersColor)
    teethVariation(dna.teethVariation)
    $('#teeth').val(dna.teethVariation)
    animation(dna.animation)
    $('#animation').val(dna.animation)
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#teethcolor').change(()=>{
    var colorVal = $('#teethcolor').val()
    teethColor(colors[colorVal],colorVal)
})
$('#eyescolor').change(()=>{
  var colorVal = $('#eyescolor').val()
  eyesColor(colors[colorVal],colorVal)
})
$('#earscolor').change(()=>{
  var colorVal = $('#earscolor').val()
  earsColor(colors[colorVal],colorVal)
})
$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})
$('#decoration').change(()=>{
  var decoration = parseInt($('#decoration').val())
  decorationVariation(decoration)
})
$('#decorationcolor').change(()=>{
  var colorVal = $('#decorationcolor').val()
  decorationColor(colors[colorVal],colorVal)
})
$('#whiskerscolor').change(()=>{
  var colorVal = $('#whiskerscolor').val()
  whiskersColor(colors[colorVal],colorVal)
})
$('#teeth').change(()=>{
  var teethVal = parseInt($('#teeth').val())
  teethVariation(teethVal)
})
$('#animation').change(()=>{
  var animationVal = parseInt($('#animation').val())
  animation(animationVal)
})

function renderRandomCat(){
  var randomDNA = {
    "headcolor" : Math.floor(Math.random() * 89) + 10,
    "teethColor" : Math.floor(Math.random() * 89) + 10,
    "eyesColor" : Math.floor(Math.random() * 89) + 10,
    "earsColor" : Math.floor(Math.random() * 89) + 10,
    //Cattributes
    "eyesShape" : Math.floor(Math.random() * 3) + 1,
    "decorationPattern" : Math.floor(Math.random() * 3) + 1,
    "decorationColor" : Math.floor(Math.random() * 89) + 10,
    "whiskersColor" : Math.floor(Math.random() * 89) + 10,
    "teethVariation" : Math.floor(Math.random() * 2) + 1,
    "animation" :  Math.floor(Math.random() * 4) + 1,
    // "lastNum" :  1
    }

    renderCat(randomDNA)
}

function createKitty(){
  var dnaCreated = String(getDna())
  instance.methods.createKittyGen0(dnaCreated).send() 
}

$('#random').click(()=>renderRandomCat())

$("#default").click(()=>renderCat(defaultDNA))

$("#create").click(()=>createKitty())
