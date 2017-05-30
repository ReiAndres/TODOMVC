init();
$('input').keyup(function(e) {
	var texto1 = $(this).val();

	var tareas= {
		texto: texto1,
		id: 0,
		completo: false
	}
	
	if(tareas.texto && e.keyCode === 13){
		var nombreTarea=tareas.texto;
		$(this).val('');
		save(nombreTarea);
		var myarray=getTodos();
		tareas.id= myarray.indexOf(nombreTarea);

		var data= $('<h4><input class="check" type="checkBox">').append(nombreTarea)
		.append('<span class="span"><input type="button" style="float:right" class="btn btn-danger" value="eliminar" onclick="eliminar('+tareas.id+',1)"></input></span>');

		$('.todo-list').append($('<div>').append(data)).append('<br>');
        console.log(myarray.indexOf(nombreTarea));

	}
});


function save(nombreTarea){
	var todo = getTodos();
	todo.push(nombreTarea)
	localStorage.setItem('todo',JSON.stringify(todo));
}

function getTodos(){
	if(!localStorage.todo)
		return [];

	return JSON.parse(localStorage.todo);
}

function init(){
	var todo = getTodos();
	$('.todo-list').empty();
	$('.Delete').empty();
	$('.Delete').append('<input type="button" class="btn btn-danger" style="float: left" value="Borrar todo" onclick="borrar()">');
	todo.forEach(function(position) {

		var nick = todo.indexOf(position);
		var data= $('<h4><input class="check" type="checkBox">').append(position)
		.append('<span class="span"><input type="button" style="float:right" class="btn btn-danger" value="eliminar" onclick="eliminar('+nick+',1)"></input></span>');
		$('.todo-list').append($('<div>').append(data)).append('<br>');

			});

}


function eliminar(id,cant){
	var aux = getTodos();
	aux.splice(id,1);
	localStorage.todo = JSON.stringify(aux);
	console.log(id);
	init();
}

function borrar(){
 localStorage.todo="";
 init();
}