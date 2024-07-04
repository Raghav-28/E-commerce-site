const product = [
    {
        id: 0,
        image: 'assets/img/portfolio/onemukhi.webp',
        title: 'Raghav Bhaiya',
        price: 120,
        category: 'beads',
    },
    {
        id: 1,
        image: 'assets/img/portfolio/twomukhi.jpg',
        title: 'Raghav Bhaiya',
        price: 130,
        category: 'rudrakshmala',
    },
    {
        id: 2,
        image: 'assets/img/portfolio/threemukhi.webp',
        title: 'Raghav Bhaiya',
        price: 180,
        category: 'rudrakshmala',
    },
    {
        id: 3,
        image: 'assets/img/portfolio/fourmukhi.webp',
        title: 'Raghav Bhaiya',
        price: 120,
        category: 'sphatikmala',
    },
    {
        id: 4,
        image: 'assets/img/portfolio/sphatikmala3.jpeg',
        title: 'Raghav Bhaiya',
        price: 120,
        category: 'sphatikmala',
    },
    {
        id: 5,
        image: 'assets/img/portfolio/sphatikmala3.jpeg',
        title: 'Raghav Bhaiya',
        price: 120,
        category: 'sphatikmala',
    },
    {
        id: 6,
        image: 'assets/img/portfolio/rudrakshmala6.jpeg',
        title: 'Raghav Bhaiya',
        price: 120,
        category: 'rudrakshmala',
    },
    {
        id: 7,
        image: 'assets/img/portfolio/rudrakshmala8.jpeg',
        title: 'Raghav Bhaiya',
        price: 120,
        category: 'rudrakshmala',
    },
    
];

const categories = [...new Set(product.map((item) => { return item }))];
let cart = [];

function filterProducts() {
    const titleFilter = document.getElementById('filterTitle').value.toLowerCase();
    const minPriceFilter = parseFloat(document.getElementById('filterMinPrice').value) || 0;
    const maxPriceFilter = parseFloat(document.getElementById('filterMaxPrice').value) || Infinity;

    const filteredProducts = product.filter(item => {
        const matchesCategory = !titleFilter || item.category.toLowerCase() === titleFilter;
        const matchesPrice = item.price >= minPriceFilter && item.price <= maxPriceFilter;
        return matchesCategory && matchesPrice;
    });

    displayProducts(filteredProducts);
}

function displayProducts(products) {
    let i = 0;
    document.getElementById('root').innerHTML = products.map((item) => {
        var { image, title, price } = item;
        return (
            `<div class='box'>
                <div class='img-box'>
                    <img class='images' src='${image}'></img>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>$ ${price}.00</h2>` +
            `<button>
                <a href="portfolio-details.html#rudrakashabeads-section" class="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details">
                    Details
                </a>
            </button>` +
            `<button onclick='addtocart(${i++})'>Add to Cart</button>
                </div>
            </div>`
        );
    }).join('');
}

function addtocart(a) {
    cart.push({ ...product[a] }); // Use product array instead of categories
    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage
    displaycart();
}


function delElement(a) {
    cart.splice(a, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

function displaycart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let j = 0;
    let total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById('cardItem').innerHTML = "Your Cart Is Empty";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    } else {
        document.getElementById('cardItem').innerHTML = cart.map((item) => {
            var { image, title, price } = item;
            total = total + price;
            document.getElementById("total").innerHTML = "$ " + total + ".00";
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowing' src='${image}'></img>
                    </div>
                    <p style='font-size:12px'>${title}</p>
                    <h2 style='font-size:15px'>$ ${price}.00</h2>` +
                "<i class='bi bi-trash' onclick='delElement(" + (j++) + ")'></i></div>"
            );
        }).join('');
    }
}

// Initial display
displayProducts(product);