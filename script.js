const searchBtn = document.querySelector('.fa-search')
const form = document.getElementsByTagName('form')[0]
const cardContainer = document.querySelector('.cards-container')
let search = document.getElementById('search-input')


form.addEventListener('submit', (e) => {
    e.preventDefault()
})
const getMealData = async function () {
    let searchInput = document.getElementById('search-input').value.trim()
    const fetchData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    const data = await fetchData.json()
    console.log(data.meals)

    let html = ''
    if (data.meals) {
        data.meals.forEach(meal => {
            const { idMeal: id, strMeal: title, strMealThumb: img, strSource: link, strArea: region, strYoutube: youtube } = meal
            html +=
                `
                    <div class="card" data-id=${id}>
                        <img src="${img}" alt="">
                        <div class="recipe-info">
                            <h3>${title}</h3>
                            <span class="recipe-rate">
                                <p>${region}</p>
                                <a href="${youtube}" target="_blank">Video</a>
                            </span>
                            <a href="${link}" target="_blank">Full Recipe</a>
                        </div>
                    </div>
                `
            searchInput = ''
        })
    } else {
        html = `<h2 class="error">Sorry, no recipe found about <span class="error-search">${searchInput}</span> ! Please try again!</h2>`
    }

    cardContainer.innerHTML = html
    search.value = ''

}

searchBtn.addEventListener('click', getMealData)

//Remove Intro Screen 
const welcomeScreen = document.querySelector('.welcome-screen')
const closeBtn = document.querySelector('.hide-btn')

closeBtn.addEventListener('click', () => { welcomeScreen.classList.add('hide') })