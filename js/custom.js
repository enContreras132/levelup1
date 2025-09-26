window.addEventListener('load', ()=>{
// isotope js
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// nice select
$(document).ready(function() {
    $('select').niceSelect();
  });


// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

const form = document.getElementById('formulario')
const nombre = document.getElementById('nombre')
const telefono = document.getElementById('telefono')
const mail = document.getElementById('mail')
const rut = document.getElementById('rut')
const nacimiento = document.getElementById('nacimiento')
const direccion = document.getElementById('direccion')

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    validacionCampos()
})

const validacionCampos = ()=>{
    const nombreValor = nombre.value.trim()
    const telefonoValor = telefono.value.trim()
    const mailValor = mail.value.trim()
    const rutValor = rut.value.trim()
    const nacimientoValor = nacimiento.value.trim()
    const direccionValor = direccion.value.trim()
    
    if (nombreValor === ''){
        validaFalla(nombre, 'campo vacio')
    } else {
        validaBien(nombre)        
    }

    if (telefonoValor === ''){
        validaFalla(telefono, 'campo vacio')
    } else {
        validaBien(telefono)        
    }  
    
}

const validaFalla = (input, msg)=>{
    const formControlador = input.parentElement
    const aviso =formControlador.querySelector('p')
    aviso.innerText = msg

    formControlador.className = 'form-controlador falla'
}

const validaBien = (input)=>{
    const formControlador = input.parentElement

    formControlador.className = 'form-controlador bien'
}
});