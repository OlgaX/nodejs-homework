// variables
const menu = [];
let orders = [];
const carts = {
    createForm: [],
    updateForm: [],
    deleteForm: [],
};
const addToCartBtns = document.querySelectorAll('[data-addToCart]');
const getOrderBtns = document.querySelectorAll('[data-getOrder]');
const createOrderBtn = document.getElementById('createOrderBtn');
const updateOrderBtn = document.getElementById('updateOrderBtn');
const deleteOrderBtn = document.getElementById('deleteOrderBtn');
const menuForUpdateOrder = document.getElementById('menuForUpdateOrder');

// on init
getMenu();
getOrders();

// listeners
addToCartBtns.forEach((i) => i.addEventListener('click', addToCartHandler));
getOrderBtns.forEach((i) => i.addEventListener('click', getOrderHandler));
createOrderBtn.addEventListener('click', createOrderHandler);
updateOrderBtn.addEventListener('click', updateOrderHandler);
deleteOrderBtn.addEventListener('click', deleteOrderHandler);

// get menu

function getMenu() {
    fetch('/products').then(res => res.json()).then((data) => {
        const select = document.querySelectorAll("[data-menu]");

        select.forEach((menu) => {
            data.forEach((i) => {
                const option = document.createElement("option");
                option.value = i._id;
                option.text = i.name;
                menu.add(option);
            })
        });

        menu.push(...data);

    });
}

// get orders

function getOrders() {
    fetch('/orders').then(res => res.json()).then((data) => {
        const selects = document.querySelectorAll('[data-order]');

        selects.forEach((select) => {
            select.options.length = 1;

            data.forEach((i) => {
                const option = document.createElement('option');
                option.value = i._id;
                option.text = i._id;
                select.add(option);
            })
        });

        orders = data;
    });
}

// get order

function getOrderHandler(e) {
    const form = e.target.closest('form');
    const formData = new FormData(form);
    const orderId = formData.get('order');

    if (!orderId) return;

    fetch(`/orders/${orderId}`).then(res => res.json()).then((data) => {
        clearCart(form);

        if (form.name === 'updateForm') {
            menuForUpdateOrder.removeAttribute('hidden');
        }

        if (data.productIds && data.productIds.length) {
            data.productIds.forEach((id) => addToCart(id, form))
        }
    });
}

// create order

function createOrderHandler() {
    if (!carts.createForm.length) return;

    const options = {
        method: 'POST',
        body: JSON.stringify({productIds: carts.createForm}),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    fetch(`/orders`, options).then(res => res.json()).then((data) => {
        showNotification(document.createForm, data);
        resetForm(document.createForm);
        getOrders();
    });
}

// update order

function updateOrderHandler() {
    const formData = new FormData(document.updateForm);
    const orderId = formData.get('order');

    if (!orderId) return;

    if (!carts.updateForm.length) {
        const options = {
            method: 'DELETE',
        };

        fetch(`/orders/${orderId}`, options).then(res => res.json()).then((data) => {
            showNotification(document.updateForm, data);
            resetForm(document.updateForm);
            menuForUpdateOrder.setAttribute('hidden', 'hidden');
            getOrders();
        });
    } else {
        const options = {
            method: 'PUT',
            body: JSON.stringify({productIds: carts.updateForm}),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        fetch(`/orders/${orderId}`, options).then(res => res.json()).then((data) => {
            showNotification(document.updateForm, data);
            resetForm(document.updateForm);
            menuForUpdateOrder.setAttribute('hidden', 'hidden');

            const formData = new FormData(document.deleteForm);

            if (orderId === formData.get('order')) {
                resetForm(document.deleteForm);
            }
        });
    }
}

// delete order

function deleteOrderHandler() {
    const formData = new FormData(document.deleteForm);
    const orderId = formData.get('order');

    if (!orderId) return;

    const options = {
        method: 'DELETE',
    };

    fetch(`/orders/${orderId}`, options).then(res => res.json()).then((data) => {
        showNotification(document.deleteForm, data);
        resetForm(document.deleteForm);
        getOrders();

        const formData = new FormData(document.updateForm);

        if (orderId === formData.get('order')) {
            resetForm(document.updateForm);
            menuForUpdateOrder.setAttribute('hidden', 'hidden');
        }
    });
}

// add to cart

function addToCartHandler(e) {
    const form = e.target.closest('form');
    const formData = new FormData(form);
    const productId = formData.get('menu');

    addToCart(productId, form);
}

function addToCart(productId, form) {
    const product = menu.find((i) => i._id === productId);

    const cart = form.querySelector('[data-cart]');

    if (productId) {
        const productIdx = carts[form.name].length;
        carts[form.name].push(productId);
        cart.innerHTML += form.name === 'deleteForm' ? `${product.name}<br>` :
            `<div>${product.name} <button class="btn btn-link text-danger p-0" onclick="removeFromCartHandler('${form.name}', ${productIdx})">x</button></div>`;
    }

    toggleCartView(form);
}

// remove from cart

function removeFromCartHandler(formName, productIdx) {
    const filteredCart = carts[formName].filter((i, idx) => productIdx !== idx);
    const form = document[formName];

    clearCart(form);
    filteredCart.forEach((id) => addToCart(id, form));
}

// reset form

function resetForm(form) {
    form.reset();
    clearCart(form);
}

// clear cart
function clearCart(form) {
    const cart = form.querySelector('[data-cart]');
    carts[form.name] = [];
    cart.innerHTML = '';
    toggleCartView(form);
}

// toggle cart view

function toggleCartView(form) {
    const cart = form.querySelector('[data-cart]');
    const cartEmpty = form.querySelector('[data-cartEmpty]');

    if (carts[form.name].length) {
        cartEmpty.setAttribute('hidden', 'hidden');
        cart.removeAttribute('hidden');
    } else {
        cartEmpty.removeAttribute('hidden');
        cart.setAttribute('hidden', 'hidden');
    }
}

// show notification

function showNotification(form, data) {
    const outputContainer = form.querySelector('[data-output]');
    const output = form.querySelector('[data-orderId]');
    outputContainer.toggleAttribute('hidden');
    output.innerText = data._id;

    setTimeout(() => outputContainer.toggleAttribute('hidden'), 5000)
}
