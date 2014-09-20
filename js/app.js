/* Declaramos el módulo. Sus controladores están en controller-main.js */
var moduloMemorabilis = angular.module('appMemorabilis', []);

moduloMemorabilis.factory('fabricaNotas', function() {
	/* Aquí recuperamos el json en cordova */
    var notas = [
                    { titular:'Londres', desarrollo:'Encontrar un sitio para dormir', indexado: 'a', tipo:'1' },
                    { titular:'Impuestos', desarrollo:'Hay que pagar el trimestre ya!', indexado: 'b', tipo:'1' },
                    { titular:'Fiestuki', desarrollo:'El viernes, cena en el wang wang', indexado: 'c', tipo:'2' },
                    { titular:'Dieta', desarrollo:'Comenzar una dieta a base de acelgas y espinacas', indexado: 'f', tipo:'3' },
                    { titular:'Música', desarrollo:'Bajarse la discografía de Cesaria Evoria', indexado: 'd', tipo:'1' }                    
                ];
    return notas;
});

moduloMemorabilis.factory('notasBorradas', function() {    
    var notasBorradas = [];
    return notasBorradas;
});