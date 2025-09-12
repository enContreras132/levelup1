// Validación simple del formulario
    const form = document.getElementById('formLogin');
    const usuario = document.getElementById('usuario');
    const contrasena = document.getElementById('contrasena');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (usuario.value.trim() === '') {
            alert('Por favor, ingresa tu nombre de usuario.');
            usuario.focus();
            return;
        }
        if (contrasena.value.trim() === '') {
            alert('Por favor, ingresa tu contraseña.');
            contrasena.focus();
            return;
        }

        alert('¡Inicio de sesión exitoso! Bienvenido.');
        // Aquí puedes redirigir a otra página, por ejemplo:
        window.location.href = 'index.html';
    });