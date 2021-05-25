function searchMovie() {
	$('#movie-list').html(''); //mengosongkan hasil sebelum request lagi
	
	//requestnya pake ajax
	$.ajax({
		//alamat yang mau kita kirimkan data
		url: 'http://omdbapi.com?',
		//mengirimkan data pake method apa get/post
		type: 'get',
		//menerima tipe data apa yang diharapkan
		dataType: 'json',
		//data yang ingin dikirm
		data: {
			'apikey' : 'e5deb4a5', //apikeynya
			's' : $('#searchInput').val() //jquery cari elemen dengan id searchInput dan ambil apapun valuenya
		}, 

		success: function(data){ //data ini nanti bentuknya json
			//Response ini udah ada di dalem data, isinya True atau False
			//Jika True maka movie ketemu dan punya data lain namanya Result
			//Kalo False maka punya data lain namanya Error
			if ( data.Response === "True" ) {
				let movies = data.Search;

				//foreach dalam bentuk jquery.
				/*
					$.each([ 52, 97 ], function( index, value ) {
  						alert( index + ": " + value );
					});
				*/
				//hasilnya
				/*
					0: 52
					1: 97
				*/

				$.each(movies, function (i, result) {
					$('#movie-list').append(`
						<div class="col-md-4">
							<div class="card mb-3">
								<img src="`+ result.Poster +`" class="card-img-top" alt="...">
							  	<div class="card-body">
							    	<h5 class="card-title">`+ result.Title +`</h5>
							    	<h6 class="card-subtitle mb-2 text-muted">`+ result.Year +`</h6>
							    	<a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ result.imdbID+`" >See Detail</a>
							  	</div>
							</div>
						</div
					`); //btw di class card-link yang tombol see detail ditambahin kelas see-detail biar bisa diambil ama jquery

				});

				//setelah tertampil resultnya, kosongkan kolom inputnya
				$('#searchInput').val('');

			} else {
				$('#movie-list').html(`
					<div class="col">
					<h1 class="text-center">` + data.Error +  `</h1>
					</div>
				`);
			}
		}
	});
}

$('#searchButton').on('click', function(){
	searchMovie();
});

$('#searchInput').on('keyup', function(keynya){
	if (keynya.keyCode === 13){	
		searchMovie();
	}
});

/*
Kalo yang dicari .see-detail maka gabakal muncul krn pas awal tombol see detail
belum ada. Masalah ini namanya event binding. Untuk mengatasi itu maka kita 
pindahkan elemen yang ingin ditemukan ke elemen parent, yaitu #movie-list. 
Nah untuk fungsi onclicknya tinggal ditambahin satu koma lagi yg berisi
.see-detail. Jadi onclick nanti akan berjalan di see-detail ketika sudah 
terbuat dan bukan di #movie-list. 
*/

$('#movie-list').on('click','.see-detail', function(){
	
	//ambil tombol see-detail yang sedang di klik ini lalu ambil data-id (data('id'))
	//console.log($(this).data('id'));
	
	$.ajax({
		url: 'http://omdbapi.com?',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey' : 'e5deb4a5',
			'i' : $(this).data('id')
		}, 

		success: function(data){
			if ( data.Response === "True" ) {

				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+ data.Poster +`" class="img-fluid">
							</div>
							<div class="col-md-8">
								<ul class="list-group">
									<li class="list-group-item"><h3>`+ data.Title +`</h3></li>
									<li class="list-group-item">Released :`+ data.Released +`</li>
									<li class="list-group-item">Genre :`+ data.Genre +`</li>
									<li class="list-group-item">Director :`+ data.Director +`</li>
									<li class="list-group-item">Actors :`+ data.Actors +`</li>
								</ul>
							</div>
				`);

			}
		}
	});
});