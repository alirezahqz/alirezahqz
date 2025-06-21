import { products } from "./products.js";
import {
  tempQuantities,
  changeTempQty,
  addToCartWithQty,
  updateCartCount
} from "./shop.js";

// استخراج اسلاگ دسته از نام فایل (مثلاً "beauty")
const slug = location.pathname.match(/category_(.+?)\.html/)[1];
const container = document.getElementById("cat-products");

// نمایش محصولات مربوط به دسته
products.filter(p => p.category === slug).forEach(p => {
  tempQuantities[p.id] = tempQuantities[p.id] || 1;

  container.insertAdjacentHTML("beforeend", `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.price.toLocaleString()} تومان</p>

      <div class="qty-control">
        <button onclick="changeTempQty('${p.id}', -1)">➖</button>
        <span id="temp-qty-${p.id}">${tempQuantities[p.id]}</span>
        <button onclick="changeTempQty('${p.id}', 1)">➕</button>
      </div>

      <button onclick="addToCartWithQty('${p.name}', ${p.price}, '${p.id}')">
        افزودن به سبد خرید
      </button>
    </div>
  `);
});

// لود هدر و فوتر و آپدیت شمارنده
fetch("header.html").then(r => r.text()).then(t => {
  document.getElementById("load-header").innerHTML = t;
  setTimeout(updateCartCount, 50);
});
fetch("footer.html").then(r => r.text()).then(t =>
  document.getElementById("load-footer").innerHTML = t
);
