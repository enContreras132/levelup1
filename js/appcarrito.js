// Lista de productos disponibles
    const productosData = [
      {
        id: 1,
        nombre: "Mouse Gamer Monster RGB",
        precio: 7590,
        imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/477efa0d/711248-Mouse_B1.png"
      },
      {
        id: 2,
        nombre: "Audifonos Gamer Monster",
        precio: 5990,
        imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/424c2d92/710300-1_%283%29.png"
      },
      {
        id: 3,
        nombre: "Mouse Razer Cobra Pro HyperSpeed",
        precio: 124640,
        imagen: "https://www.winpy.cl/files/w38389_razer_cobra_pro_hyperspeed_00.jpg"
      },
      {
        id: 4,
        nombre: "Gamer Nitro V15 RTX 2050",
        precio: 699990,
        imagen: "https://www.acerstore.cl/cdn/shop/files/1_ANV15-51-53W1-1.png?v=1753392522&width=533"
      }
    ];

    let carrito = [];

    // Referencias DOM
    const productosDiv = document.getElementById('productos');
    const carritoDiv = document.getElementById('carrito');
    const resumenDiv = document.getElementById('resumen');
    const vaciarBtn = document.getElementById('vaciarCarrito');
    const btnPagar = document.getElementById('btnPagar');

    function mostrarProductos() {
      productosDiv.innerHTML = '';
      productosData.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card p-4 flex flex-col items-center space-y-3';

        card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}" class="rounded-lg shadow-md" />
          <h3 class="text-xl font-semibold">${producto.nombre}</h3>
          <p class="text-lg">$${producto.precio.toFixed(0)}</p>
          <button class="btn-neon px-4 py-2 rounded-lg" data-id="${producto.id}">Agregar al carrito</button>
        `;

        productosDiv.appendChild(card);
      });

      // Agregar evento a botones
      productosDiv.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          agregarAlCarrito(id);
        });
      });
    }

    function agregarAlCarrito(id) {
      const productoEnCarrito = carrito.find(item => item.id === id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
      } else {
        carrito.push({ id, cantidad: 1 });
      }
      actualizarCarrito();
    }

    function eliminarDelCarrito(id) {
      carrito = carrito.filter(item => item.id !== id);
      actualizarCarrito();
    }

    function cambiarCantidad(id, cantidad) {
      if (cantidad < 1) return;
      const producto = carrito.find(item => item.id === id);
      if (producto) {
        producto.cantidad = cantidad;
        actualizarCarrito();
      }
    }

    vaciarBtn.addEventListener('click', () => {
      carrito = [];
      actualizarCarrito();
    });

    btnPagar.addEventListener('click', () => {
      if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
      }
      alert('Gracias por tu compra. ¡Pago realizado con éxito!');
      carrito = [];
      actualizarCarrito();
    });

    function actualizarCarrito() {
      carritoDiv.innerHTML = '';
      if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p class="text-gray-400">Tu carrito está vacío.</p>';
        resumenDiv.textContent = '';
        vaciarBtn.style.display = 'none';
        btnPagar.style.display = 'none';
        return;
      }

      vaciarBtn.style.display = 'inline-block';
      btnPagar.style.display = 'inline-block';

      carrito.forEach(item => {
        const producto = productosData.find(p => p.id === item.id);
        const subtotal = producto.precio * item.cantidad;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex items-center justify-between bg-gray-900 bg-opacity-50 p-3 rounded-lg';

        itemDiv.innerHTML = `
          <div class="flex items-center space-x-4">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="w-16 h-12 rounded" />
            <div>
              <p class="font-semibold">${producto.nombre}</p>
              <p class="text-sm text-gray-400">Precio unitario: $${producto.precio.toFixed(0)}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <input type="number" min="1" value="${item.cantidad}" class="w-16 text-black rounded px-2 py-1" data-id="${item.id}" />
            <p class="w-20 text-right font-semibold">$${subtotal.toFixed(0)}</p>
            <button class="text-red-500 font-bold text-xl" data-id="${item.id}" title="Eliminar">&times;</button>
          </div>
        `;

        carritoDiv.appendChild(itemDiv);
      });

      // Eventos inputs cantidad
      carritoDiv.querySelectorAll('input[type=number]').forEach(input => {
        input.addEventListener('change', (e) => {
          const id = parseInt(e.target.getAttribute('data-id'));
          let cantidad = parseInt(e.target.value);
          if (isNaN(cantidad) || cantidad < 1) {
            cantidad = 1;
            e.target.value = 1;
          }
          cambiarCantidad(id, cantidad);
        });
      });

      // Eventos botones eliminar
      carritoDiv.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          eliminarDelCarrito(id);
        });
      });

      // Calcular total
      const total = carrito.reduce((acc, item) => {
        const producto = productosData.find(p => p.id === item.id);
        return acc + producto.precio * item.cantidad;
      }, 0);

      resumenDiv.textContent = `Total: $${total.toFixed(0)}`;
    }

    // Inicializar
    mostrarProductos();
    actualizarCarrito();