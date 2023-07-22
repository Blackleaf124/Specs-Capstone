// const { default: axios } = require("axios")
const weekDisplay = document.getElementById("calendar")
const weekBtn = document.getElementById("nxtWeekBtn")
const gridSpaces = document.getElementsByClassName("gridSpaces")

let currentWeek = 1
let woodProduction = 0
let stoneProduction = 0
let foodProduction = 0

let generalBuilding = false
let buildingLumberHut = false
let buildingQuary = false
let buildingFarm = false
let buildingLoggingCo = false
let buildingPasture = false
let buildStatus = [buildingLumberHut, buildingQuary, buildingFarm, buildingLoggingCo, buildingPasture]

Array.from(gridSpaces).forEach(element => {
    element.addEventListener('click', () => {
        for(i = 0; i < buildStatus.length; i++){
            console.log(buildStatus[i]);
            if(buildStatus[i] == true){
                let sym = ""
                if(i == 0){sym = "L"}else if(i == 1){sym = "Q"}else if(i == 2){sym = "F"}else if(i == 3){sym = "%"}else{sym = "#"}
                element.innerText = sym
                return
            }
        }
    })
})

function passWeek (){
    console.log(gridSpaces);
    currentWeek++
    weekDisplay.innerText = 'Week: ' + currentWeek
    // axios.get("http://127.0.0.1:5000/api/week")
    // .then(res => {
    //     console.log(res.data.info.string);
    // })
}

weekBtn.addEventListener("click", passWeek)
// gridSpaces.addEventListener("click", handleClick)
