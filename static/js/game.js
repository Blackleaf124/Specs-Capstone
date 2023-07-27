const weekDisplay = document.getElementById("calendar")
const weekBtn = document.getElementById("nxtWeekBtn")
const gridSpaces = document.getElementsByClassName("gridSpaces")
const lumberBtn = document.getElementById("buildLumberBtn")
const quarryBtn = document.getElementById("buildQuarryBtn")
const farmBtn = document.getElementById("buildFarmBtn")
const loggingBtn = document.getElementById("buildLoggingBtn")
const pastureBtn = document.getElementById("buildPastureBtn")
const vilListDiv = document.getElementById("villagersListedDiv")
const startBtn = document.getElementById("startBtn")
const vilBtn = document.getElementById("newVilBtn")
const woodNum = document.getElementById("woodNum")
const stoneNum = document.getElementById("stoneNum")
const foodNum = document.getElementById("foodNum")

let currentWeek = 0
let currentWood = 0
let currentStone = 0
let currentFood = 0
let woodProduction = 0
let stoneProduction = 0
let foodProduction = 0
let villagerMult = 1.3

let generalBuilding = false
let buildingLumberHut = false
let buildingQuary = false
let buildingFarm = false
let buildingLoggingCo = false
let buildingPasture = false

function resetBuilding (){
    generalBuilding = false
    buildingLumberHut = false
    buildingQuary = false
    buildingFarm = false
    buildingLoggingCo = false
    buildingPasture = false
}

Array.from(gridSpaces).forEach(element => {
    element.addEventListener('click', () => {
        let buildStatus = [buildingLumberHut, buildingQuary, buildingFarm, buildingLoggingCo, buildingPasture]
        for(i = 0; i < buildStatus.length; i++){
            console.log(buildStatus[i]);
            if(buildStatus[i] == true){
                let sym = ""
                if(i == 0){sym = "L"}else if(i == 1){sym = "Q"}else if(i == 2){sym = "F"}else if(i == 3){sym = "%"}else{sym = "#"}
                if(i == 0){woodProduction = woodProduction + 50}else if(i == 1){stoneProduction = stoneProduction + 20}else if(i == 2){foodProduction = foodProduction + 30}else if(i == 3){woodProduction = woodProduction + 125}else{foodProduction = foodProduction + 50}
                element.innerText = sym
                resetBuilding()
                return
            }
        }
    })
})

function startGame(){
    currentWood = 50
    woodNum.innerText = currentWood
    currentWeek = 1
    calendar.innerText = "Week: " + currentWeek
    getVillagers()
    startBtn.remove()
}

function getVillagers (){
    axios.get("http://127.0.0.1:5000/api/week")
    .then(res => {
        villagerList = res.data.villagers.list
        villagerList.forEach(object => {
            console.log(object.name + " and " + object.skill)
            const villagerDiv = document.createElement("div")
            const nameh = document.createElement("h4")
            const skillh = document.createElement("h5")
            const dismissBtn = document.createElement("button")

            nameh.innerText = object.name
            skillh.innerText = object.skill
            dismissBtn.innerText = "Dismiss"

            vilListDiv.appendChild(villagerDiv)
            villagerDiv.appendChild(nameh)
            villagerDiv.appendChild(skillh)
            villagerDiv.appendChild(dismissBtn)
        })
    })
}

function passWeek(){
    resetBuilding()
    currentWeek++
    weekDisplay.innerText = 'Week: ' + currentWeek
    console.log(currentWood)
    console.log(woodProduction)
    let currentWoodFlt = currentWood + (woodProduction * villagerMult)
    currentWood = Math.round(currentWoodFlt)
    woodNum.innerText = currentWood
    let currentStoneFlt = currentStone + (stoneProduction * villagerMult)
    currentStone = Math.round(currentStoneFlt)
    stoneNum.innerText = currentStone
    let currentFoodFlt = currentFood + (foodProduction * villagerMult)
    currentFood = Math.round(currentFoodFlt)
    foodNum.innerText = currentFood
}

function newVillager (){
    resetBuilding()
    axios.get("http://127.0.0.1:5000/api/newVil")
    .then(res => {
        newVillager = res.data.new.vil
        const villagerDiv = document.createElement("div")
        const nameh = document.createElement("h4")
        const skillh = document.createElement("h5")
        const dismissBtn = document.createElement("button")

        nameh.innerText = newVillager.name
        skillh.innerText = newVillager.skill
        dismissBtn.innerText = "Dismiss"

        vilListDiv.appendChild(villagerDiv)
        villagerDiv.appendChild(nameh)
        villagerDiv.appendChild(skillh)
        villagerDiv.appendChild(dismissBtn)
        villagerMult = villagerMult + .1
        console.log(newVillager);
    })
}

startBtn.addEventListener("click", startGame)
weekBtn.addEventListener("click", passWeek)
vilBtn.addEventListener("click", newVillager)
lumberBtn.addEventListener("click", () => {
    resetBuilding()
    if(currentWood >= 50){
        currentWood = currentWood - 50
        woodNum.innerText = currentWood
        buildingLumberHut = true
        console.log(buildingLumberHut)
    }
})
quarryBtn.addEventListener("click", () => {
    resetBuilding()
    if(currentWood >= 125){
        currentWood = currentWood - 125
        woodNum.innerText = currentWood
        buildingQuary = true
        console.log(buildingQuary)
    }
})
farmBtn.addEventListener("click", () => {
    resetBuilding()
    if(currentWood >= 100){
        currentWood = currentWood - 100
        woodNum.innerText = currentWood
        buildingFarm = true
        console.log(buildingFarm)
    }
})
loggingBtn.addEventListener("click", () => {
    resetBuilding()
    if(currentStone >= 700){
        currentStone = currentStone - 700
        stoneNum.innerText = currentStone
        buildingLoggingCo = true
        console.log(buildingLoggingCo)
    }
})
pastureBtn.addEventListener("click", () => {
    resetBuilding()
    if(currentStone >= 500 && currentFood >= 200){
        currentStone = currentStone - 500
        currentFood = currentFood - 200
        stoneNum.innerText = currentStone
        foodNum.innerText = currentFood
        buildingPasture = true
        console.log(buildingPasture)
    }
})
