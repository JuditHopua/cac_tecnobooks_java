function trendsPagination(result, actualPage, booksPerPage) {
    // obtengo listado de libros para la página
    const initialBookOfPage = (actualPage - 1) * booksPerPage;
    var books = result.slice(initialBookOfPage, initialBookOfPage + booksPerPage);

    //creo la galeria de trends
    const trendsGallery = document.createElement('div');
    trendsGallery.classList.add('trendsGallery');
    
    // agrego el listado de libros
    for(let bookPosition=0; bookPosition<books.length; bookPosition++){
        const bookCard = createBookCard(books[bookPosition]);// Itero sobre 12 libros para la primera página
        trendsGallery.appendChild(bookCard);// Añado la tarjeta del libro al contenedor
    };
        
    // muestro los libros obtenidos
     return trendsGallery;
}

// función para crear una tarjeta de libro
function createBookCard(book){
	//creo la tarjeta
    const cardLink = document.createElement('a');
    cardLink.href = './pages/detail.html'
	const cardInner = document.createElement('div');
    cardInner.classList.add('books')
	// creo la imagen de la tarjeta
	const cardImg = document.createElement('img');
	cardImg.src = book.bookImage;
    cardImg.alt = book.bookTitle;
	cardImg.loading = 'lazy';
    cardImg.classList.add('imgTrends');
   	// creo el cuerpo del titulo de la tarjeta
	const cardBodyTitle = document.createElement('div');
    cardBodyTitle.classList.add('bookTitle');
	//creo el titulo de la tarjeta
	const cardTitle = document.createElement('h4');
	cardTitle.textContent = book.bookTitle;

	 // Añado elementos a la tarjeta del libro
	cardBodyTitle.appendChild(cardTitle);
    cardInner.appendChild(cardImg);
	cardInner.appendChild(cardBodyTitle)
	
	//enlazo la tarjeta al detalle
    cardLink.appendChild(cardInner);

	return cardLink;
}


// cargo la sección de tendencias
function chargeTrendsSection(result, actualPage){
    // obtengo la sección
    const booksSection = document.getElementById('trends');
    //limpio la sección
    booksSection.innerHTML = '';

    // creo el titulo de la sección
    const titleSection = document.createElement('h2');
    titleSection.textContent = 'Las tendencias de hoy';
    titleSection.classList.add('titleSection');

    //agrego el titulo de la sección
    booksSection.appendChild(titleSection);

    //agrego el listado de libros de la página actual
    const booksPerPage = 12;
    booksSection.appendChild(trendsPagination(result, actualPage, booksPerPage));

    // variables
    const totalBooks = result.length;
    let noOfPages = totalBooks / booksPerPage;
    if(totalBooks % booksPerPage){
        noOfPages = Math.trunc(noOfPages + 1);
    }

    //creo botones de paginación
    const backButton = document.createElement('button');
    backButton.textContent = 'Anterior';
    backButton.classList.add('btn');
    const forwardButton = document.createElement('button');
    forwardButton.textContent = 'Siguiente';
    forwardButton.classList.add('btn');

    buttonControl(backButton, forwardButton, actualPage, noOfPages);

    backButton.addEventListener('click', () => {
        actualPage--;
        chargeTrendsSection(result, actualPage);
        //booksSection.appendChild(trendsPagination(result, actualPage, booksPerPage));
    });
    forwardButton.addEventListener('click', () => {
        actualPage++;
        chargeTrendsSection(result, actualPage);
        //booksSection.appendChild(trendsPagination(result, actualPage, booksPerPage));
    });

    // agrego los botones de paginación
    booksSection.appendChild(backButton);
    booksSection.appendChild(forwardButton);
};

function buttonControl(backButton, forwardButton, actualPage, noOfPages) {
    if (actualPage == 1) {
        backButton.disabled = true;
    } else {
        backButton.disabled = false;
    }
    if(actualPage == noOfPages) {
        forwardButton.disabled = true;
    } else {
        forwardButton.disabled = false;
    }
}

// datos de la API 
const apiUrl = 'https://all-books-api.p.rapidapi.com/getBooks';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fa3580441amshd8a2a6911ba83c1p1d5758jsnb698487fb670',
		'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com'
	}
};

// función para cargar los libros a Las tendencias de hoy
const showTrends = async function showTrends(){
	try {
		const response = await fetch(apiUrl, options);
		const result = await response.json();
        var actualPage = 1;
		
        /*const techBooks = [];
        result.forEach(book => {
           if(book.bookTitle.includes('TECH')) {
            techBooks.push(book);
            console.log(book);
           }
        });
        chargeTrendsSection(techBooks);
        // La API no tiene libros relacionados con "tech", "comput", "manual", "tutor"*/

        chargeTrendsSection(result, actualPage);
	}
	catch (error) {
		console.error(error);
	}
}

// Llamar a la función para agregar las tarjetas de libros cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {showTrends()});