const product = [
    {
        id: 0,
        image: 'assets/img/portfolio/bluestonebracelet.jpeg',
        title: 'Raghav Bhaiya',
        price: 120,
    },
    {
        id: 1,
        image: 'assets/img/portfolio/brownstonemala.jpeg',
        title: 'Raghav Bhaiya',
        price: 130,
    },
    {
        id: 2,
        image: 'assets/img/portfolio/rudrakshmala3.jpeg',
        title: 'Raghav Bhaiya',
        price: 180,
    },
    {
        id: 3,
        image: 'assets/img/portfolio/sphatikmala5.jpeg',
        title: 'Raghav Bhaiya',
        price: 120,
    },
    {
        id: 4,
        image: 'assets/img/portfolio/sphatikmala3.jpeg',
        title: 'Raghav Bhaiya',
        price: 120,
    },
];

const categories = [...new Set(product.map((item) => { return item }))];
let i = 0;

document.getElementById('root').innerHTML = categories.map((item) => {
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

var cart = [];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a,1);
    displaycart();
}

function displaycart(a){
    let j=0; total=0;
    document.getElementById("count").innerHTML = cart.length;
    if(cart.length==0){
        document.getElementById('cardItem').innerHTML = "Your Cart Is Empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        document.getElementById('cardItem').innerHTML = cart.map((item)=>
        {
            var {image , title , price} = item;
            total = total + price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
            <div class='row-box'>
                <img class='rowing' src='${image}'></img>
            </div>
                <p style = 'font-size:12px'>${title}</p>
                <h2 style = 'font-size:15px'>$ ${price}.00</h2>`+
                "<i class='bi bi-trash' onclick ='delElement("+(j++)+")'></i></div>"
            );
        }).join('');
    }
}