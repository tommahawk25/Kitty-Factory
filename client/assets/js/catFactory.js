
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

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.face').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function teethColor(color,code) {
    $('.teeth').css('border-color', '#' + color + ' transparent transparent transparent')  //This changes the color of the cat
    $('#teethcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnateeth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyesColor(color,code) {
    $('.pupils').css('background', '#' + color)  //This changes the color of the cat
    $('#eyescode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earsColor(color,code) {
    $('.ear').css('background', '#' + color)  //This changes the color of the cat
    $('#earscode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationColor(color,code) {
    $('.spot').css('background', '#' + color)  //This changes the color of the cat
    $('#decorationColorCode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationColor').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function whiskersColor(color,code) {
    $('.whisker').css('background', '#' + color)  //This changes the color of the cat
    $('#whiskerscode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnawhiskersColor').html(code) //This updates the body color part of the DNA that is displayed below the cat
}



//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2:
            normalEyes()
            $('#eyeName').html('Chill')
            eyesType1()
            break
        case 3:
            normalEyes()
            $('#eyeName').html('Curious')
            eyesType2()
            break   
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
        case 2:
            $('#decorationName').html('One')
            decorationType2()
            break
        case 3:
            $('#decorationName').html('None')
            decorationType3()
            break
    }
}

function teethVariation(num) {
    $('#dnateethVariation').html(num)
    switch (num) {
        case 1:
            $('#teethVariation').html('Basic')
            teethVariationType1()
            break
        case 2:
            $('#teethVariation').html('None')
            teethVariationType2()
            break
    }
}

function animation(num) {
    $('#dnaanimation').html(num)
    switch (num) {
        case 1:
            $('#animationName').html('Moving head')
            animationType1()
            break
        case 2:
            $('#animationName').html('Moving eyes')
            animationType2()
            break
        case 3:
            $('#animationName').html('Crazy')
            animationType3()
            break
        case 4:
            $('#animationName').html('None')
            resetAnimation()
            break
    }
}

async function normalEyes() {
    await $('.eyes').find('span').css('border', 'none')
}

async function eyesType1() {
    await $('.eyes').find('span').css('border-top', '8px solid')
}

async function eyesType2() {
    await $('.eyes').find('span').css('border-left', '8px solid')
}


async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.spot').css({ "width": "50px", "height": "15px", "border-radius": "40%", "background-color": "rgb(158, 146, 129)", "position": "absolute", "left": "76px", "Transform": "rotate(0deg)", "top": "-119px"})
    $('.spot2').css({ "width": "38px", "height": "13px", "top": "-102", "left": "83px", "Transform": "rotate(0deg)"})
    $('.spot3').css({ "width": "26px", "height": "11px", "top": "-87", "left": "90px", "Transform": "rotate(0deg)"})
}

async function decorationType2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.spot').css({ "width": "50px", "height": "15px", "border-radius": "40%", "background-color": "rgb(158, 146, 129)", "position": "absolute", "left": "76px", "Transform": "rotate(90deg)", "top": "-105px"})
    $('.spot2').css({ "width": "0px", "height": "0px", "top": "-102", "left": "83px"})
    $('.spot3').css({ "width": "0px", "height": "0px", "top": "-87", "left": "90px"})
}

async function decorationType3() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.spot').css({ "width": "0px", "height": "0px", "border-radius": "40%", "background-color": "rgb(158, 146, 129)", "position": "absolute", "left": "76px", "Transform": "rotate(90deg)"})
    $('.spot2').css({ "width": "0px", "height": "0px", "top": "-102", "left": "83px"})
    $('.spot3').css({ "width": "0px", "height": "0px", "top": "-87", "left": "90px"})
}

async function teethVariationType1() {
    $('.teeth').css({"border-width": "10px 5px 0 5px"})
}

async function teethVariationType2() {
    $('.teeth').css({"border-width": "0 0 0 0"})
}

function animationType1() {
    resetAnimation()
    $('.face').addClass("movingHead")
}

function animationType2() {
    resetAnimation()
    $('.eye').addClass("movingEyes")
}

function animationType3() {
    resetAnimation()
    $('.eye').addClass("movingEyes")
    $('.face').addClass("movingHead")
}

function resetAnimation() {
    $('.face').removeClass('movingHead')
    $('.eye').removeClass('movingEyes')
}
