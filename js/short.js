
const loadView =async (id) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/videos/category/1000`)
    const data = await res.json()
    const cards = data.data;

    const c = cards.sort((a,b) => {
        const viewB = parseInt(b.others.views)
        const viewA = parseInt(a.others.views)
       
        return viewB - viewA
    })

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''



    c.forEach(card => {
        
        const min = card.others.posted_date / 60;
        const hour = min / 60;
        const flourHour = Math.floor(hour)
        const minute = Math.floor((hour - flourHour) * 60);
        


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

