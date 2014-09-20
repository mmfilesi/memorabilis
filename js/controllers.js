/*===============================================
Controladores del módulo Notas
================================================*/

moduloMemorabilis.controller("notasHeader", function($scope) {
    $scope.showModal = function() {
        var modal = angular.element( document.querySelector( '#js-modalBasico' ) );
        modal.removeClass('oculto');
        setTimeout(function(){modal.removeClass('opacidad')}, 100);
    };
});

moduloMemorabilis.controller("notasLayout", function($scope, fabricaNotas, notasBorradas) {
    
    $scope.notas         = fabricaNotas;
    $scope.notasBorradas = notasBorradas;

    $scope.getClassNota = function(tipoNota) {

        var tipoNota = parseInt(tipoNota);

    	switch(tipoNota) {
		    case 1:
		        return "fondoAmarillo";
		        break;
		    case 2:
		    	return "fondoRojo";		        
		        break;
		    case 3:
		        return "fondoVerde";
		        break;
		    case 4:
		        return "fondoAzul";
		        break;
		   	case 5:
		        return "fondoRosa";
		        break;
		    default:
		        return "fondoAmarillo";
		}

    }; 

    $scope.tipoNota = "";   

    $scope.filterNota = function(obj) {
    	/* var nodoIcono 			 = obj.target.parentElement; */
    	var tipoNotaSeleccionada = obj.target.getAttribute("data-tipoNota");

 		angular.element(document.getElementsByClassName('filtroActivoOn')).removeClass('filtroActivoOn');

    	if ( $scope.tipoNota == tipoNotaSeleccionada ) {    		
    		$scope.tipoNota = "";
    		angular.element(obj.target).removeClass('filtroActivoOn');    		
    	} else {    		
    		$scope.tipoNota = tipoNotaSeleccionada;
    		angular.element(obj.target).addClass('filtroActivoOn');    		   			
    	}    	
  	};

   $scope.deleteNota = function(notaBorrada) {   
        var posicionNota = $scope.notas.indexOf(notaBorrada);
        if ( posicionNota != -1 ) {
            $scope.notas.splice(posicionNota, 1);
            $scope.notasBorradas.push(notaBorrada);
        }
    };

    $scope.showNotasBorradas = function() {
        var modal = angular.element( document.querySelector( '#js-modalRecuperarNotas' ) );
        modal.removeClass('oculto');
        setTimeout(function(){modal.removeClass('opacidad')}, 100);
    };

});


/*
moduloMemorabilis.controller("deleteNota", function($scope, ) {
    $scope.deleteNota = function(notaBorrada) {
   
        var posicionNota = $scope.notas.indexOf(notaBorrada);
        if ( posicionNota != -1 ) {
            $scope.notas.splice(posicionNota, 1);
        }

    };
}; */

moduloMemorabilis.controller("addNota", function($scope, fabricaNotas) {

    var addNotaTipoSeleccionado = '1';

    $scope.hideModal = function() {
        var modal           = angular.element( document.querySelector( '#js-modalBasico' ) );
        var inputTitular    = angular.element( document.querySelector( '#js-addNota-inputTitular' ) );
        var inputDesarrollo = angular.element( document.querySelector( '#js-addNota-inputDesarrollo' ) );

        inputTitular.val('');
        inputDesarrollo.text('');
        tipoNotaSeleccionada = 1

        modal.addClass('opacidad');
        setTimeout(function(){modal.addClass('oculto')}, 100);
    };

    $scope.estilos = function(obj) {
        //var nodoIcono   = obj.target.parentElement;
        var comando     = obj.target.getAttribute('data-type');
        document.execCommand(comando, false, null);
        /* if ( angular.element(nodoIcono).hasClass('botonToolbarActivado') ) {
            angular.element(nodoIcono).removeClass('botonToolbarActivado');
        } else {
            angular.element(nodoIcono).addClass('botonToolbarActivado')
        }  */      
    };

    $scope.tipoNota = function(obj) {
        addNotaTipoSeleccionado = obj.target.getAttribute('data-tipoNota');
        angular.element( document.querySelector( '.adNotaTipoNotaSeleccionada' ) ).removeClass('adNotaTipoNotaSeleccionada');
        angular.element(obj.target).addClass('adNotaTipoNotaSeleccionada');  
    };

    $scope.addNota = function(finalAccion) {

        var inputTitular    = angular.element( document.querySelector( '#js-addNota-inputTitular' ) ).val();
        var inputDesarrollo = angular.element( document.querySelector( '#js-addNota-inputDesarrollo' ) ).text();

        var nuevaNota =  {  titular:inputTitular, 
                            desarrollo:inputDesarrollo, 
                            indexado: Math.round(new Date().getTime() / 1000), 
                            tipo: addNotaTipoSeleccionado 
                        };

        fabricaNotas.push(nuevaNota);

        console.log(fabricaNotas);

        if ( finalAccion === 2 ) {
            $scope.hideModal();
        }
    };

});

moduloMemorabilis.controller("recuperarNotas", function($scope, fabricaNotas, notasBorradas) {

    $scope.notas         = fabricaNotas;
    $scope.notasBorradas = notasBorradas;
    $scope.enunciado     = "Selecciona las notas que quieras recuperar";

    $scope.recuperarNotasBorradas = function(notaBorrada) {
        var posicionNota = $scope.notasBorradas.indexOf(notaBorrada);
        if ( posicionNota != -1 ) {
            $scope.notasBorradas.splice(posicionNota, 1);
            $scope.notas.push(notaBorrada);
        }

    };

    // Habría que hacer todo esto con ng-show
    $scope.hideModalRecuperarNotas = function() {
        var modal = angular.element( document.querySelector( '#js-modalRecuperarNotas' ) );
        modal.addClass('opacidad');
        setTimeout(function(){modal.addClass('oculto')}, 100);
    };

});

// https://thinkster.io/angulartutorial/learn-to-build-realtime-webapps/
// http://carlosazaustre.es/blog/tutorial-ejemplo-de-aplicacion-web-con-angular-js-y-api-rest-con-node/