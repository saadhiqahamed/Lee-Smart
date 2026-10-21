(() => {
 const get=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}};
 let cart=get('leeSmartCart',[]);const money=n=>'LKR '+Number(n).toLocaleString('en-LK');
 const save=()=>{localStorage.setItem('leeSmartCart',JSON.stringify(cart));render()};
 const add=(product,size,color,qty=1)=>{let found=cart.find(x=>x.id===product.id&&x.size===size&&x.color===color);if(found)found.qty+=qty;else cart.push({id:product.id,size,color,qty});save();window.showToast?.('Added to your bag');};
 const remove=i=>{cart.splice(i,1);save()};
 const update=(i,d)=>{cart[i].qty=Math.max(1,cart[i].qty+d);save()};
 const total=()=>cart.reduce((sum,item)=>sum+(window.products.find(p=>p.id===item.id)?.price||0)*item.qty,0);
 function render(){document.querySelectorAll('.bag-count').forEach(x=>x.textContent=`(${cart.reduce((s,i)=>s+i.qty,0)})`);document.querySelector('.cart-subtotal').textContent=money(total());document.querySelector('#checkout-total').textContent=money(total());const host=document.querySelector('.cart-content');if(!cart.length){host.innerHTML='<div class="empty-cart-wrap"><div class="empty-cart">YOUR BAG IS EMPTY</div><button class="button button-dark continue-shopping">CONTINUE SHOPPING <span>↗</span></button></div>';return}host.innerHTML=cart.map((item,i)=>{const p=window.products.find(x=>x.id===item.id);return `<article class="cart-item"><img src="${p.images[0]}" alt="${p.name}"><div><h3>${p.name}</h3><small>SIZE ${item.size} · ${item.color}</small><b>${money(p.price*item.qty)}</b><div class="cart-qty"><button data-qty="-1" data-index="${i}" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="1" data-index="${i}" aria-label="Increase quantity">+</button></div></div><button data-remove="${i}" aria-label="Remove ${p.name}">×</button></article>`}).join('')}
 document.addEventListener('click',e=>{const rm=e.target.closest('[data-remove]');if(rm)remove(+rm.dataset.remove);const q=e.target.closest('[data-qty]');if(q)update(+q.dataset.index,+q.dataset.qty)});
 window.LeeCart={add,remove,update,total,render,get items(){return cart}};document.addEventListener('DOMContentLoaded',render);
})();
