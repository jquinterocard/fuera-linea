export class Articulo {

    constructor(
        public id:Number,
        public nombre:String,
        public codigo:String,
        public valor:Number,
        public id_impuesto:Number,
        public id_unidad_medida:Number,
        public control_inventario:Boolean,
        public estado:String,
        
    ){}

}