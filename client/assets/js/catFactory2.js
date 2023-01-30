
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

function headColor29(color,code) {
    $('.face2').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode2').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody2').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function teethColor29(color,code) {
    $('.teeth2').css('border-color', '#' + color + ' transparent transparent transparent')  //This changes the color of the cat
    $('#teethcode2').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnateeth2').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyesColor29(color,code) {
    $('.pupils2').css('background', '#' + color)  //This changes the color of the cat
    $('#eyescode2').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes2').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earsColor29(color,code) {
    $('.ear2').css('background', '#' + color)  //This changes the color of the cat
    $('#earscode2').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears2').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationColor29(color,code) {
    $('.spot29').css('background', '#' + color)  //This changes the color of the cat
    $('#decorationColorCode2').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationColor2').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function whiskersColor29(color,code) {
    $('.whisker2').css('background', '#' + color)  //This changes the color of the cat
    $('#whiskerscode2').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnawhiskersColor2').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

async function normalEyes29() {
    await $('.eyes2').find('span').css('border', 'none')
}

async function eyesType129() {
    await $('.eyes2').find('span').css('border-top', '8px solid')
}

async function eyesType229() {
    await $('.eyes2').find('span').css('border-left', '8px solid')
}

async function normaldecoration29() {
    $('.spot29').css({ "width": "50px", "height": "15px", "border-radius": "40%", "position": "relative", "left": "76px", "Transform": "rotate(0deg)", "top": "-119px"})
    $('.spot229').css({ "width": "38px", "height": "13px", "top": "-118", "left": "83px", "Transform": "rotate(0deg)"})
    $('.spot329').css({ "width": "26px", "height": "11px", "top": "-116", "left": "90px", "Transform": "rotate(0deg)"})
}

async function decorationType229() {
    $('.spot29').css({ "width": "50px", "height": "15px", "border-radius": "40%", "position": "relative", "left": "76px", "Transform": "rotate(90deg)", "top": "-105px"})
    $('.spot229').css({ "width": "0px", "height": "0px", "top": "-118", "left": "83px"})
    $('.spot329').css({ "width": "0px", "height": "0px", "top": "-116", "left": "90px"})
}

async function decorationType329() {
    $('.spot29').css({ "width": "0px", "height": "0px", "border-radius": "40%", "position": "relative", "left": "76px", "Transform": "rotate(90deg)"})
    $('.spot229').css({ "width": "0px", "height": "0px", "top": "-118", "left": "83px"})
    $('.spot329').css({ "width": "0px", "height": "0px", "top": "-116", "left": "90px"})
}

async function teethVariationType129() {
    $('.teeth2').css({"border-width": "10px 5px 0 5px"})
}

async function teethVariationType229() {
    $('.teeth2').css({"border-width": "0 0 0 0"})
}

function animationType129() {
    resetAnimation2()
    $('.face2').addClass("movingHead")
}

function animationType229() {
    resetAnimation2()
    $('.eye2').addClass("movingEyes")
}

function animationType329() {
    resetAnimation2()
    $('.eye2').addClass("movingEyes")
    $('.face2').addClass("movingHead")
}

function resetAnimation2() {
    $('.face2').removeClass('movingHead')
    $('.eye2').removeClass('movingEyes')
}
