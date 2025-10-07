 document.addEventListener('DOMContentLoaded', () => {

            // --- Mahsulotlar ma'lumotlari (ko'proq mahsulot) ---
            const products = [
                // Parfyumeriya
                { id: 1, name: 'ROSES MUSK', price: 250000, category: 'parfume', image: 'https://picsum.photos/seed/rose1/400/400' },
                { id: 2, name: 'ECLAT MONPARIS', price: 320000, category: 'parfume', image: 'https://picsum.photos/seed/eclat1/400/400' },
                { id: 3, name: 'AVON FAR AWAY', price: 180000, category: 'parfume', image: 'https://picsum.photos/seed/avon1/400/400' },
                { id: 4, name: 'CHANEL NO. 5', price: 1200000, category: 'parfume', image: 'https://picsum.photos/seed/chanel1/400/400' },
                { id: 5, name: 'DIOR SAUVAGE', price: 950000, category: 'parfume', image: 'https://picsum.photos/seed/dior1/400/400' },
                { id: 6, name: 'ARMANI CODE', price: 1100000, category: 'parfume', image: 'https://picsum.photos/seed/armani1/400/400' },
                { id: 7, name: 'YSL LIBRE', price: 1350000, category: 'parfume', image: 'https://picsum.photos/seed/ysl1/400/400' },
                { id: 8, name: 'GUCCI GUILTY', price: 980000, category: 'parfume', image: 'https://picsum.photos/seed/gucci1/400/400' },
                // Bujuteriya
                { id: 9, name: 'Kumush uzuk', price: 450000, category: 'bujiteriya', image: 'https://picsum.photos/seed/ring1/400/400' },
                { id: 10, name: 'Oltin sirg\'a', price: 2500000, category: 'bujiteriya', image: 'https://picsum.photos/seed/earring1/400/400' },
                { id: 11, name: 'Zanjirbilag\'uzuk', price: 780000, category: 'bujiteriya', image: 'https://picsum.photos/seed/bracelet1/400/400' },
                { id: 12, name: 'Tilla bo\'yinbaq', price: 3200000, category: 'bujiteriya', image: 'https://picsum.photos/seed/necklace1/400/400' },
                { id: 13, name: 'Qimmatbax toshli sirg\'a', price: 1500000, category: 'bujiteriya', image: 'https://picsum.photos/seed/earring2/400/400' },
                { id: 14, name: 'Zargarlik buyumi', price: 920000, category: 'bujiteriya', image: 'https://picsum.photos/seed/jewelry1/400/400' },
                { id: 15, name: 'Patnisirg\'a', price: 620000, category: 'bujiteriya', image: 'https://picsum.photos/seed/earring3/400/400' },
                { id: 16, name: 'Quloqchalar uchun klips', price: 350000, category: 'bujiteriya', image: 'https://picsum.photos/seed/clips1/400/400' },
            ];

            // --- Elementlarni olish ---
            const loaderContainer = document.querySelector('.loader-container');
            const productGrid = document.getElementById('productGrid');
            const resultCount = document.getElementById('resultCount');
            const categoryFilter = document.getElementById('categoryFilter');
            const priceFilter = document.getElementById('priceFilter');
            const priceValue = document.getElementById('priceValue');
            const searchInput = document.getElementById('searchInput');

            // Modal elementlari
            const productModal = document.getElementById('productModal');
            const modalClose = document.getElementById('modalClose');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalPrice = document.getElementById('modalPrice');
            const modalAddToCartBtn = document.getElementById('modalAddToCart');

            // Savat elementlari
            const cartIcon = document.getElementById('cartIcon');
            const cartSidebar = document.getElementById('cartSidebar');
            const cartClose = document.getElementById('cartClose');
            const cartItemsContainer = document.getElementById('cartItems');
            const cartCount = document.getElementById('cartCount');
            const cartTotal = document.getElementById('cartTotal');

            // --- Savat mantiqi ---
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const updateCartUI = () => {
                cartItemsContainer.innerHTML = '';
                let total = 0;
                let itemCount = 0;

                cart.forEach(item => {
                    const cartItemEl = document.createElement('div');
                    cartItemEl.className = 'cart-item';
                    cartItemEl.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">${item.price.toLocaleString('uz-UZ')} so'm</p>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}">&times;</button>
                    `;
                    cartItemsContainer.appendChild(cartItemEl);
                    total += item.price;
                    itemCount++;
                });

                cartCount.textContent = itemCount;
                cartTotal.textContent = total.toLocaleString('uz-UZ');

                document.querySelectorAll('.cart-item-remove').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const productId = parseInt(e.target.dataset.id);
                        cart = cart.filter(item => item.id !== productId);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartUI();
                    });
                });
            };

            const addToCart = (productId) => {
                const productToAdd = products.find(p => p.id === productId);
                if (productToAdd) {
                    cart.push(productToAdd);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartUI();
                }
            };

            // --- Mahsulotlarni chiqarish funktsiyasi ---
            const displayProducts = (productsToShow) => {
                productGrid.innerHTML = '';
                resultCount.textContent = productsToShow.length;

                if (productsToShow.length === 0) {
                    productGrid.innerHTML = '<p>Afsuski, hech narsa topilmadi.</p>';
                    return;
                }

                productsToShow.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="price">${product.price.toLocaleString('uz-UZ')} so'm</p>
                            <button class="add-to-cart-btn" data-id="${product.id}">Savatga qo'shish</button>
                        </div>
                    `;
                    productGrid.appendChild(card);
                });

                document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const productId = parseInt(btn.dataset.id);
                        addToCart(productId);
                    });
                });

                document.querySelectorAll('.product-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        if (e.target.classList.contains('add-to-cart-btn')) return;
                        
                        const productId = parseInt(card.querySelector('.add-to-cart-btn').dataset.id);
                        const product = products.find(p => p.id === productId);
                        openProductModal(product);
                    });
                });
            };

            // --- Modal oynasi mantiqi ---
            const openProductModal = (product) => {
                modalImage.src = product.image;
                modalTitle.textContent = product.name;
                modalPrice.textContent = `${product.price.toLocaleString('uz-UZ')} so'm`;
                modalAddToCartBtn.dataset.id = product.id;
                productModal.classList.add('active');
            };

            const closeProductModal = () => {
                productModal.classList.remove('active');
            };

            modalClose.addEventListener('click', closeProductModal);
            productModal.addEventListener('click', (e) => {
                if (e.target === productModal.querySelector('.modal-overlay')) {
                    closeProductModal();
                }
            });

            modalAddToCartBtn.addEventListener('click', () => {
                const productId = parseInt(modalAddToCartBtn.dataset.id);
                addToCart(productId);
                closeProductModal();
            });

            // --- Savat paneli mantiqi ---
            cartIcon.addEventListener('click', () => {
                cartSidebar.classList.add('open');
            });

            cartClose.addEventListener('click', () => {
                cartSidebar.classList.remove('open');
            });

            // --- Filtrlash va qidirish funktsiyasi ---
            const filterAndSearchProducts = () => {
                const selectedCategory = categoryFilter.value;
                const maxPrice = parseInt(priceFilter.value);
                const searchTerm = searchInput.value.toLowerCase();

                const filtered = products.filter(product => {
                    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
                    const priceMatch = product.price <= maxPrice;
                    const searchMatch = product.name.toLowerCase().includes(searchTerm);
                    return categoryMatch && priceMatch && searchMatch;
                });

                displayProducts(filtered);
            };
            
            // --- Event Listenerlar ---
            categoryFilter.addEventListener('change', filterAndSearchProducts);
            priceFilter.addEventListener('input', () => {
                priceValue.textContent = parseInt(priceFilter.value).toLocaleString('uz-UZ');
                filterAndSearchProducts();
            });
            searchInput.addEventListener('input', filterAndSearchProducts);

            // --- Loading va boshlang'ich sozlamalar ---
            setTimeout(() => {
                displayProducts(products);
                updateCartUI();
                loaderContainer.classList.add('hidden');
            }, 2000);
        });