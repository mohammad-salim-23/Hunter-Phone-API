const loadPhone =async (searchText,isShowAll) =>{
  const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);

}
const displayPhones = (phones,isShowAll)=>{
  const phoneContainer = document.getElementById('phones-container');
  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';
  const btn = document.getElementById('show-btn');
  if(phones.length>12 && !isShowAll){
   
    btn.classList.remove('hidden');
  }else{
    btn.classList.add('hidden');
  }
 if(!isShowAll){
  phones = phones.slice(0,12);
 }
  
  phones.forEach(phone=>{
   console.log(phone);
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card  bg-base-100 shadow-xl p-4`;
    phoneCard.innerHTML = `
    
    <figure class="px-10 pt-10">
      <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
 
    `;
    phoneContainer.appendChild(phoneCard);

  })
  troggleLoadSpinner(false);
 
}

// handle search button
const handleSearch = (isShowAll) =>{
  troggleLoadSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value ;
  console.log(searchText)
  loadPhone(searchText,isShowAll);
}

// another search handler
// const handleSearch2 = () =>{
//   troggleLoadSpinner(true);
//    const searchField2 = document.getElementById('search-field2');
//    const searchText2 = searchField2.value ;
//    loadPhone(searchText2);
// }
const troggleLoadSpinner = (isloading) =>{

  const loadingSpinner = document.getElementById('loading');
  if(isloading){
  loadingSpinner.classList.remove('hidden');
  }else{
    loadingSpinner.classList.add('hidden');
  }
}
const handleShowAll =() =>{
  handleSearch(true);
}

// handle show details
const handleShowDetail =async (id) =>{
  // load single phone data
  const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`) ;
  const data  = await res.json();
  console.log(data);
}
