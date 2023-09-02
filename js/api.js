// step-1: data load and display for categories

const loadCategory = async () => {
    const res = await fetch ('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()

    const categories = data.data;

    displayCategories(categories)
}

const displayCategories = (categories) => {

    const categoriesContainer = document.getElementById('category-container');

    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadPostData('${category.category_id}')"  class=" px-6 py-2 rounded hover:bg-red-500 hover:text-white bg-stone-200  focus:bg-red-500"> ${category.category}</button> 
        `
        categoriesContainer.appendChild(div)
    });
}



// step-2: data load and display for Post
const loadPostData = async (id) => {

    const res = await fetch (`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const cards = data.data;
    displayPost(cards)
    
}   

const displayPost = (cards) => {

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''

    const hiddenStatus = document.getElementById('hidden-container');
    
    if(cards.length == 0){
      hiddenStatus.classList.remove('hidden')
    }else{
        hiddenStatus.classList.add('hidden')
    }
    

    cards.forEach(card => {
        
const min = card.others.posted_date / 60;
const hour = min / 60;
const flourHour = Math.floor(hour)
const minute = Math.floor((hour - flourHour) * 60);




        const views = card.others.views
        const numberPart = parseFloat(views);
        // console.log(numberPart)


    const div = document.createElement('div');
    div.classList = `card bg-base-100 shadow-2xl`
    div.innerHTML = `
    <figure class="h-40">
    <img class="w-full" src="${card.thumbnail}" alt="" />
    <span class="absolute right-5 bottom-48 bg-black
     px-2 py-1 text-white">${(flourHour > 0 || minute > 0)? flourHour +'hrs' + minute + 'min': ' '} </span>
    </figure>
    <div class="card-body">
      <div class="flex gap-2">
      <figure class='w-10 h-10 rounded-full'>
      <img src="${card.authors[0].profile_picture}" alt="" />
      </figure>      
      <h2 class="card-title md:text-sm lg:text-xl">${card.title}</h2>
      </div>
      <div class="flex gap-1 justify-start items-center">
      <span class="pr-0">${card.authors[0].profile_name}</span>
      <img class="w-4 h-4" src="${card.authors[0].verified? 'verified.png':'white.png' }" alt="">
      </div>
      <p>${card.others.views} views</p>
    </div>
    
    `
    cardContainer.appendChild(div)
    
    })
}




const shortByView = () => {

}





loadPostData('1000')
loadCategory()



