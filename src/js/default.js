const BASE_URL = 'http://localhost:3000/api/';

const getProduct = async () => {
    try {
        const productId = 743;
        const brand = 'Corona Premier';
        const response = await axios.get(`${BASE_URL}product/${productId}-${brand.toLowerCase().replace(' ', '-')}`);

        const product = response.data;

        var productPhoto = document.querySelector('.product-photo');
        productPhoto.setAttribute('src', `./src/assets/${product.image}`);

        var productBrand = document.getElementById('product-brand');
        productBrand.innerHTML = product.brand;

        var productDescription = document.getElementById('product-info');
        productDescription.innerHTML = product.information;

        var productSizes = document.getElementById('size-buttons');
        var skus = product.skus;
        var selectedSku = undefined;

        for (let i = 0; i < skus.length; i++) {

            var sku = skus[i];
            if (i === 0) {
                selectedSku = sku;
            }
            productSizes.innerHTML += `<span class="size-btn ${i === 0 ? 'active-btn' : ''} gray-theme px-[15px] py-[9px] text-sm mr-4 cursor-pointer">${sku.name}</span>`;
        }

        if (selectedSku) {
            await getSkuPrice(selectedSku.code);
            
            // This function checks every 5 seconds the price and stock of the selected product/sku
            setInterval(async () => {
                await getSkuPrice(selectedSku.code);
            }, 5 * 1000);

        }

    } catch (errors) {
        console.error(errors);
    }
};

const getSkuPrice = async (skuCode) => {
    let response = await axios.get(`${BASE_URL}stock-price`, { params: { sku: skuCode } });
    let sku = response.data;

    if (sku) {
        var productPrice = document.getElementById('product-price');
        productPrice.innerHTML = sku.priceString;

        var productStock = document.getElementById('product-stock');
        productStock.innerHTML = sku.stock;
    }
};

window.addEventListener("load", async (event) => {
    await getProduct();
});
