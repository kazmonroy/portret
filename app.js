const auth = "563492ad6f917000010000011b0450e2ec8347eb9e414e77dece0c2a";
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const moreBtn = document.querySelector(".more-btn");
const burger = document.querySelector(".burger");

// Variables
let searchValue;
let page = 1;
let fetchLink;

// Event listeners
searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", () => {
  searchPhotos(searchValue);
});

moreBtn.addEventListener("click", loadMore);

burger.addEventListener("click", navToggle);

function updateInput(e) {
  e.preventDefault();
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const fetchPhotos = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await fetchPhotos.json();
  return data;
}

function generateGallery(data) {
  data.photos.forEach((photo) => {
    const generateGallery = document.createElement("div");
    generateGallery.classList.add("photo");
    generateGallery.innerHTML = `
        <p>${photo.photographer}</p>
        <a href="${photo.src.large}"><img src="${photo.src.large}"> </img></a>

       
        `;

    gallery.appendChild(generateGallery);
  });
}

async function getPhotos() {
  const fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generateGallery(data);
}

async function searchPhotos(query) {
  const fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);

  clear();

  generateGallery(data);
}

async function loadMore() {
  page++;

  if (searchValue) {
    fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }

  const data = await fetchApi(fetchLink);

  generateGallery(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

function navToggle(e) {
  console.log(e);
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -2, background: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0 });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0 });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

getPhotos();
