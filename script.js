function likePhone(id) {
  fetch("http://localhost:3000/liked", {
    method: "POST",
    body: JSON.stringify({ likedPhoneId: id }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

    // button.classList.toggle("like")
    
}

document.addEventListener("DOMContentLoaded", function () {
  const phoneList = document.getElementById("phoneList");
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("search-form");
  let allPhones = [];
  function fetchPhones() {
    return fetch("http://localhost:3000/phones")
      .then((res) => res.json())
      .then((data) => {
        allPhones = data;
        return data;
      });
  }
  function displayPhones(phones) {
    phoneList.innerHTML = "";
    phones.forEach((phone) => {
      const phoneDiv = document.createElement("div");
      phoneDiv.className = "phone-container";

      phoneDiv.classList.add("phone");
      phoneDiv.innerHTML = `<p>${phone.phone_name}</p>
            <img src="${phone.image}" alt="image">
            <strong>${phone.brand}</strong>
            <h5>${phone.description}</h5>
            <p>${phone.price}</p>
            
            <div class="info">
            <p>${phone.phone_name}</p>
            
            <strong>${phone.brand}</strong>
            <h5>${phone.description}</h5>
            <p>${phone.price}</p>
            
            </div>            `;
            const btn = document.createElement("button");
            btn.textContent = "like"
            btn.addEventListener("click",(e) => { 
                e.preventDefault()
                likePhone(phone.id)
                
                btn.classList.toggle("like")
             })

             phoneDiv.appendChild(btn)

      phoneList.appendChild(phoneDiv);
    });
  }
  function searchBar(searchTerm) {
    const filterPhones = allPhones.filter((phone) =>
      phone.phone_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayPhones(filterPhones);
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const searchTerm = searchInput.value.trim();
    searchBar(searchTerm);
  });

  // Listen to input event on search input for real-time filtering
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim();
    searchBar(searchterm);
  });
  fetchPhones().then((data) => {
    displayPhones(data);
  });
});
