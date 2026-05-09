export const products = [
    {
        id: 'country-loaf',
        name: 'Sourdough Country Loaf',
        description: 'Classic artisan loaf with crispy crust and soft, airy crumb',
        images: [
            { webp: 'images/products/country-loaf/webp/country_load.webp?v=3', fallback: 'images/products/country-loaf/country_load.jpeg?v=3', alt: 'Sourdough country loaf with crispy crust', width: 2040, height: 1530, loading: 'eager' }
        ],
        ingredients: ['Water', 'Wheat Flour', 'Salt', 'Extra Virgin Olive Oil'],
        sizes: [
            { label: '800-850g', price: 12 },
            { label: '400-450g', price: 8 }
        ],
        category: 'Sourdough Breads'
    },
    {
        id: 'burger-buns',
        name: 'Sourdough Burger Buns',
        description: 'Soft and flavorful buns, perfect for your gourmet burgers',
        images: [
            { webp: 'images/products/burger-buns/webp/burger_buns.webp?v=3', fallback: 'images/products/burger-buns/burger_buns.jpeg?v=3', alt: 'Soft sourdough burger buns freshly baked', width: 1600, height: 1200 }
        ],
        ingredients: ['Wheat Flour', 'Salt', 'Water', 'Butter', 'Milk', 'Egg', 'Sugar (2%)'],
        optionalIngredients: ['Sesame Seeds'],
        sizes: [
            { label: '6 pieces', price: 8 }
        ],
        category: 'Sourdough Breads'
    },
    {
        id: 'sandwich-bread',
        name: 'Sourdough Sandwich Bread',
        description: 'Soft-crusted loaf, perfect for sandwiches and toast',
        images: [
            { webp: 'images/products/sandwich-bread/webp/sandwich_bread.webp?v=3', fallback: 'images/products/sandwich-bread/sandwich_bread.jpeg?v=3', alt: 'Soft sourdough sandwich bread loaf', width: 2040, height: 1536 },
            { webp: 'images/products/sandwich-bread/sandwitch-bread-display.webp?v=3', fallback: 'images/products/sandwich-bread/sandwitch-bread-display.jpg?v=3', alt: 'Sliced sourdough sandwich bread display', width: 1134, height: 2016 }
        ],
        ingredients: ['Wheat Flour', 'Water', 'Salt', 'Extra Virgin Olive Oil', 'Milk', 'Sugar (2%)', 'Butter'],
        sizes: [
            { label: '750-770g', price: 12 },
            { label: '400-450g', price: 8 }
        ],
        category: 'Sourdough Breads'
    },
    {
        id: 'pizza-sandwich-bread',
        name: 'Pizza Sandwich Bread',
        description: 'Fresh sourdough pizza crust — ready for your favorite fillings',
        images: [
            { webp: 'images/products/pizza-sandwich-bread/webp/pizza-empty.webp?v=3', fallback: 'images/products/pizza-sandwich-bread/pizza-empty.png?v=3', alt: 'Sourdough pizza sandwich bread base', width: 1026, height: 1026 },
            { webp: 'images/products/pizza-sandwich-bread/webp/packed.webp?v=3', fallback: 'images/products/pizza-sandwich-bread/packed.png?v=3', alt: 'Packed sourdough pizza bread for delivery', width: 1026, height: 1026 }
        ],
        ingredients: ['Water', 'Wheat Flour', 'Salt', 'Extra Virgin Olive Oil'],
        sizes: [
            { label: '3 pieces', price: 12 }
        ],
        category: 'Sourdough Breads'
    },
    {
        id: 'sourdough-inclusion',
        name: 'Sourdough with Inclusion',
        description: 'Level up your sourdough bread with inclusion',
        images: [
            { webp: 'images/products/inclusion/webp/parmesan-olives.webp?v=3', fallback: 'images/products/inclusion/parmesan-olives.jpg?v=3', alt: 'Sourdough with parmesan and olives inclusion', width: 1200, height: 900 },
            { webp: 'images/products/inclusion/webp/butter.webp?v=3', fallback: 'images/products/inclusion/butter.jpg?v=3', alt: 'Sourdough with butter inclusion', width: 1026, height: 1026 }
        ],
        inclusions: ['Parmesan and Olives', 'Croissant Country Bread', 'Double Chocolate Chips', 'Parmesan and Jalapeño'],
        sizes: [
            { label: '900g', price: 20 },
            { label: '450g', price: 12 }
        ],
        category: 'Sourdough Breads'
    },
    {
        id: 'mini-loafs',
        name: 'Mini Loafs',
        description: 'Small sourdough bread with inclusion — perfect for taste tests or gift boxes',
        images: [
            { webp: 'images/products/mini-loafs/webp/mini-loafs.webp?v=3', fallback: 'images/products/mini-loafs/mini-loafs.jpg?v=3', alt: 'Mini sourdough loafs with inclusions for taste testing and gift boxes', width: 1026, height: 1026 }
        ],
        inclusions: ['Parmesan and Olives', 'Croissant Country Bread', 'Double Chocolate Chips', 'Parmesan and Jalapeño'],
        sizes: [
            { label: '~220g', price: 6 }
        ],
        category: 'Sourdough Breads'
    },
    {
        id: 'chocolate-chip-cookies',
        name: 'Chocolate Chip Cookies',
        description: 'Classic chewy cookies with rich chocolate chips',
        images: [
            { webp: 'images/products/chocolate-chip-cookies/webp/coockies_salt.webp?v=3', fallback: 'images/products/chocolate-chip-cookies/coockies_salt.jpg?v=3', alt: 'Chocolate chip cookies with salt', width: 1026, height: 1026 },
            { webp: 'images/products/chocolate-chip-cookies/webp/Chocolate%20chip%20cookies.webp?v=3', fallback: 'images/products/chocolate-chip-cookies/Chocolate%20chip%20cookies.jpg?v=3', alt: 'Chewy chocolate chip cookies homemade', width: 2040, height: 1530 }
        ],
        ingredients: ['Wheat Flour', 'Butter', 'Coconut Sugar', 'Chocolate (contains milk)', 'Egg'],
        optionalIngredients: ['Flaky salt sprinkle'],
        sizes: [
            { label: '250g (10-12 pieces)', price: 10 }
        ],
        category: 'Desserts — Cheat Treats (Not Sourdough)'
    },
    {
        id: 'zebra-butter-cookies',
        name: 'Zebra Butter Cookies',
        description: 'Beautiful buttery marbled cookies with vanilla and chocolate swirls',
        images: [
            { webp: 'images/products/zebra-cookies/webp/Zebra%20cookies.webp?v=3', fallback: 'images/products/zebra-cookies/Zebra%20cookies.jpg?v=3', alt: 'Marbled zebra butter cookies vanilla chocolate', width: 1200, height: 1600 }
        ],
        ingredients: ['Butter', 'Wheat Flour', 'Sugar', 'Cocoa Powder'],
        sizes: [
            { label: '250g (18-22 pieces)', price: 10 }
        ],
        category: 'Desserts — Cheat Treats (Not Sourdough)'
    }
];
