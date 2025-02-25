// 1st prize = 1, 2nd prize = 2, 3rd prize=  3, consolation prize = 4, other = 5

const awards = [
    ["Gold Prize", "INOVA-CROATIA", 2024, "inova-croatia.webp", 1],
    ["Consolation Prize", "National Round - National Young Competition for Information Processing", 2024, "final-round-national-young-association-for-information-processing.webp", 4],
    ["First Prize", "Regional Round - National Young Competition for Information Processing", 2024, "regional-round-national-young-association-for-information-processing.webp", 1],
    ["Third Prize", "VNU Foreign Languages Olympiad for High-school Students (Vietnam National University)", 2024, "vnu-foreign-language-olympiad.webp", 3],
    ["Third Prize", "National Round - International Office Information Championship - VIETTEL", 2024, "national-round-MOS-championship.webp", 3],
    ["Third Prize", "Regional Round - National Young Competition for Information Processing", 2023, "tht2023.webp", 3],
    ["First Prize", "School's English competition for Excellent students", 2024, "school-level-contest-for-excellent-pupils-english.webp", 1],
    ["First Prize", "School's Information Technology competition for Excellent students", 2024, "school-level-contest-for-excellent-pupils-informatics.webp", 1],
    ["Gold Award", "English - National Round - Asian Science and Mathematics Olympiad (ASMO)", 2023, "asmo-state-level-english.webp", 1],
    ["Gold Award", "Science - State Round - ASMO", 2023, "asmo-state-level-science.webp", 1],
    ["Best Business Branding Idea", "ERCI Start-up Championship", 2021, "erci2021.webp", 5]
]

const award_type = ["First Prize", "Second Prize", "Third Prize", "Consolation", "Other"]

let warnDiv = document.getElementById("screen_warning")
let screenWarningBypassed = false

function bypassWarning() {
    warnDiv.style.display = 'none'
    document.removeEventListener('resize', checkScreenSize)
    document.removeEventListener('DOMContentLoaded', checkScreenSize)
    document.body.removeEventListener("resize", checkScreenSize)
    screenWarningBypassed = true

}

function createFilters() {

    // Create year filtering
    let f_year = document.getElementById("f_year")
    let years = new Set()

    awards.forEach((v, _, __) => {years.add(v[2])})
    
    years.forEach((v, _, __) => {
        let opt_element = document.createElement("option")
        opt_element.value = v
        opt_element.innerText = v
        f_year.add(opt_element)
    })

    // Create awards filtering
    let f_prize = document.getElementById("f_prize")
    
    award_type.forEach((v, i, _) => {
        let opt_element = document.createElement('option')
        opt_element.value = i+1
        opt_element.innerText = v
        f_prize.add(opt_element)
    })
    
}

function checkScreenSize() {

    
    console.log(window.innerWidth)
    if (window.innerWidth < 830) {
        warnDiv.style.display = "block"
    } else {
        warnDiv.style.display = "none"
    }
}

// Toggle modals and nothing else
function toggleModal(open) {

    let modalDiv = document.getElementById("project_modal")
    if (!open) {
        modalDiv.style.display = "none"
    } else {
    
    modalDiv.style.display = "flex"
    }



    

    // If user clicks anywhere outside the modal, close it
    window.onclick = function(event) {
    if (event.target == modalDiv) {
        modalDiv.style.display = "none";
    }
    }
}

function filterAwards(ev) {

    let f_year = document.getElementById("f_year")
    
    let f_prize = document.getElementById("f_prize")

    let f_year_int = parseInt(f_year.value)
    let f_prize_int = parseInt(f_prize.value)


    // console.log(parseInt(f_year.value), parseInt(f_prize.value))

    dynamicallyRenderAwards(undefined, undefined, f_year_int, f_prize_int)
}

// This part does a rather simple thing: it inserts cards displaying my awards into the DOM. 
// that way, i could just add another entry to the array above if I ever got another award.
function dynamicallyRenderAwards(_, ev, f_year=undefined, f_prize=undefined) {
    

let award_sorted = awards.sort((a, b) => b[2] - a[2])

let awardListDOM = document.getElementById("award_list_1")

awardListDOM.innerHTML = ""
// console.log(awardListDOM)

// <div class="award_card">
    // <img width="100%" src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" alt="">
    //         <p>20xx</p>
    //         <h3>[Award Name]</h3>
            
    //     </div>

console.log("filter", f_year, f_prize)
awards.forEach(element => {
    
    // Filtering logic
    console.log(element[2], element[4])

    if (f_year != undefined) {
        console.log("f_year", f_year, isNaN(f_year))
        
        if (element[2] != f_year && !isNaN(f_year)) {
            
            return
        }
    }

    if (f_prize != undefined) {
        console.log("f_prize", f_prize, isNaN(f_prize))
        if (f_prize != element[4] && !isNaN(f_prize)) {
            
            return
        }
    }


    let awardCard = document.createElement("div");
    awardCard.className = "award_card";
    let imgDOM = document.createElement("img")
    imgDOM.loading = "lazy"
    
    if (element[3] != undefined) {
        imgDOM.src = "assets/certs/archive/" + element[3]
    
    } else {
        imgDOM.src = "assets/placeholder.webp"
    }

    imgDOM.style.width = "auto"
    imgDOM.style.height = "auto"
    imgDOM.style.maxWidth = "100%"
    imgDOM.style.maxHeight = "100%"
    

    let pDOM = document.createElement("p")
    let prizeLabel = document.createElement("h3")
    let h3DOM = document.createElement("h3")
    
    let imgContainer = document.createElement("div")
    imgContainer.style.height = "200px"
    imgContainer.style.width = "100%"
    imgContainer.style.display = "flex"
    imgContainer.style.alignItems = "center"
    imgContainer.style.justifyContent = "center"

    pDOM.innerText = element[2]
    prizeLabel.innerText = element[0]
    h3DOM.innerText = element[1]
    
    h3DOM.className = "award_title"
    
    imgContainer.appendChild(imgDOM)

    awardCard.appendChild(imgContainer);
    awardCard.appendChild(pDOM);
    awardCard.appendChild(prizeLabel);
    awardCard.appendChild(h3DOM);
    awardListDOM.appendChild(awardCard)

});

}

function resetFilter() {
document.getElementById("f_year").value = "*"
document.getElementById("f_prize").value = "*"
dynamicallyRenderAwards(undefined, undefined, undefined, undefined)
}

document.addEventListener("DOMContentLoaded", dynamicallyRenderAwards)
document.addEventListener("DOMContentLoaded", createFilters)
document.addEventListener("DOMContentLoaded", (ev) => { warnDiv = document.getElementById("screen_warning") })
document.addEventListener("DOMContentLoaded", checkScreenSize)
// document.addEventListener("resize", checkScreenSize)
// document.addEventListener("resize", checkScreenSize)
