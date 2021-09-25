const searchBtn = document.querySelector('.fa-search')
const form = document.getElementsByTagName('form')[0]
const cardContainer = document.querySelector('.cards-container')
let search = document.getElementById('search-input')


form.addEventListener('submit', (e) => {
    e.preventDefault()
})
const getMealData = async function () {
    displayLoading()
    let searchInput = document.getElementById('search-input').value.trim()
    const fetchData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    const data = await fetchData.json()
    console.log(data.meals)

    let html = ''
    if (data.meals) {

        data.meals.forEach(meal => {
            displayLoading()
            const { idMeal: id, strMeal: title, strMealThumb: img, strSource: link, strArea: region, strYoutube: youtube, strCategory: category } = meal
            html +=
                `
                    <div class="card" data-id=${id}>
                        <img src="${img}" alt="${title} image">
                        <div class="recipe-info">
                            <h3>${title}</h3>
                            <span class="recipe-rate">
                                <p>${region}</p>
                                <p>${category}</p>
                                <a href="${youtube}" target="_blank" onclick="event.stopPropagation();">Video</a>
                            </span>
                            <a href="${link}" target="_blank" onclick="event.stopPropagation();">Full Recipe</a>
                        </div>
                    </div>
                `
            searchInput = ''
        })
    } else {
        html = `<h2 class="error">Sorry, no recipe found about <span class="error-search">${searchInput}</span> ! Please try again!</h2>`
    }
    // const cards = document.querySelector('.card')
    // cards.forEach(card => card.addEventListener('click'), getMealId(data.meals[0].idMeal))
    cardContainer.innerHTML = html
    search.value = ''

    cardContainer.addEventListener('click', (e) => {
        const targetID = (e.target.closest('.card').dataset.id)
        getMealId(targetID)
    })
}


/**************************************************
Fetch request for individual recipe by selected ID
***************************************************/

async function getMealId(targetID) {
    const mealIdFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${targetID}`)
    const mealIdRes = await mealIdFetch.json()

    displayMolda(mealIdRes)
}

/**************************************************
Render response data into modal to simulate a page
***************************************************/
let steps
const displayMolda = (meal) => {
    modal.classList.add('active')
    meal = meal.meals[0]
    console.log(meal)

    const { strMeal: title, strMealThumb: img, strInstructions: desc } = meal
    console.log(title)
    let newHtml = `
                <div class="modal-top">
                
                    <h2>${title}</h2>
                    <img src="${img}" alt="${title} meal image">
                    <p>${desc}</p>
                </div>
                <div class="modal-bottom">
                    <h4>Ingredients:</h4>
                    <div class="recipe-steps">
                        <p>REcipe steps goes here</p>
                    </div>
                </div>
            `
    modal.insertAdjacentHTML('afterbegin', newHtml)
}


/**************************************************
* Load getMealData function by hitting the enter key
***************************************************/
searchBtn.addEventListener('click', getMealData)
search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') getMealData()
})

//Remove Intro Screen 
//Remove Modal Screen
const welcomeScreen = document.querySelector('.welcome-screen') //welcome screen variable
const closeBtn = document.querySelector('.hide-btn') //welcome screen X close btn

const modal = document.querySelector('.modal-wrap') //modal variable
const closeModal = document.querySelector('.fa-times') //modal screen X close btn

closeBtn.addEventListener('click', () => { welcomeScreen.classList.add('hide') })
closeModal.addEventListener('click', () => {
    modal.classList.remove('active')
    modal.innerHTML = ''

    //maybe insertAdjacentHtml
    modal.appendChild(closeModal);
})


//Loader on api calls
const loader = document.querySelector('.loader')

function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

function hideLoading() {
    window.addEventListener('load', () => {
        loader.classList.remove('display');
    })
}
