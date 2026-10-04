/* ===== CART LOGIC =====
   The cart is saved in the visitor's browser (localStorage), so it stays
   there when they move between pages. You normally don't need to edit this. */
const CART_KEY = "aesthete-cart";
const money = n => "R " + n.toLocaleString("en-ZA");
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const saveCart = c => { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCount(); };
const findProduct = id => PRODUCTS.find(p => p.id === id);

function updateCount(){
  const n = getCart().reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = n);
}
function toast(msg){
  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className="toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 2000);
}
function addToCart(id){
  const cart = getCart(); const item = cart.find(i=>i.id===id);
  item ? item.qty++ : cart.push({id, qty:1});
  saveCart(cart); toast(findProduct(id).name + " added to cart");
}
function buyNow(id){
  const p = findProduct(id);
  if(p.stripeLink) window.location.href = p.stripeLink;
  else alert("Payment link not set up yet. Add a Stripe link for this product in js/products.js");
}

function productCard(p){
  return `<article class="product">
    <img src="${p.image}" alt="${p.name}" loading="lazy">
    <div class="product-info">
      <span class="product-cat">${p.type}</span>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <span class="price">${money(p.price)}</span>
      <div class="product-actions">
        <button class="btn btn-small" onclick="addToCart('${p.id}')">Add to cart</button>
        <button class="btn btn-small btn-outline" onclick="buyNow('${p.id}')">Buy now</button>
      </div>
    </div></article>`;
}

/* Home page: featured items */
function renderFeatured(){
  const el = document.getElementById("featured"); if(!el) return;
  el.innerHTML = PRODUCTS.filter(p=>p.featured).map(productCard).join("");
}

/* Shop page: filter buttons + grid */
function renderShop(){
  const grid = document.getElementById("shop-grid"); if(!grid) return;
  const filters = document.getElementById("filters");
  const params = new URLSearchParams(location.search);
  let current = params.get("category") || "All";
  const options = ["All", ...Object.keys(CATEGORIES), ...Object.values(CATEGORIES).flat()];
  const draw = () => {
    filters.innerHTML = options.map(o =>
      `<button class="filter-btn ${o===current?"active":""}" data-f="${o}">${o}</button>`).join("");
    const list = current==="All" ? PRODUCTS : PRODUCTS.filter(p=>p.category===current||p.type===current);
    grid.innerHTML = list.map(productCard).join("") || '<p class="empty">Nothing here yet.</p>';
  };
  filters.addEventListener("click", e => { if(e.target.dataset.f){ current = e.target.dataset.f; draw(); } });
  draw();
}

/* Cart page */
function renderCart(){
  const el = document.getElementById("cart"); if(!el) return;
  const cart = getCart().filter(i=>findProduct(i.id));
  if(!cart.length){ el.innerHTML = '<div class="empty"><h2>Your cart is empty</h2><br><a class="btn" href="shop.html">Browse the shop</a></div>'; return; }
  let total = 0;
  const rows = cart.map(i => { const p = findProduct(i.id); total += p.price*i.qty;
    return `<tr><td><img src="${p.image}" alt=""></td><td><strong>${p.name}</strong><br><small>${p.type}</small></td>
      <td>${money(p.price)}</td>
      <td><div class="qty"><button onclick="changeQty('${p.id}',-1)">−</button>${i.qty}<button onclick="changeQty('${p.id}',1)">+</button></div></td>
      <td>${money(p.price*i.qty)}</td><td><button class="remove" onclick="changeQty('${p.id}',-999)">Remove</button></td></tr>`; }).join("");
  el.innerHTML = `<table class="cart-table"><thead><tr><th></th><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead><tbody>${rows}</tbody></table>
    <div class="cart-summary"><div class="total"><span>Total</span><span>${money(total)}</span></div>
    <button class="btn" style="width:100%" onclick="checkout()">Checkout securely</button>
    <p class="note">Payments are processed securely by Stripe. For several different items you'll pay for each one in turn, or email us for a single invoice.</p></div>`;
}
function changeQty(id, d){
  let cart = getCart(); const item = cart.find(i=>i.id===id);
  item.qty += d; cart = cart.filter(i=>i.qty>0); saveCart(cart); renderCart();
}
function checkout(){
  const cart = getCart();
  if(cart.length === 1) return buyNow(cart[0].id);
  const lines = cart.map(i=>`${i.qty} x ${findProduct(i.id).name}`).join("%0D%0A");
  window.location.href = `mailto:hello@aesthetecreations.com?subject=Order request&body=Hi! I'd like to order:%0D%0A${lines}`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCount(); renderFeatured(); renderShop(); renderCart();
  const y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();
});
