<template>
    <div>
        <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">MyEVN STACK</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto"> -->
                    <!-- ENLACES -->
                <!-- </ul>
                <div class="form-inline my-2 my-lg-0">
                </div>
            </div>
        </nav> -->

        <div class="container col">
            <div class="col d-flex flex-row justify-content-end">
                <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#configProduct"
                @click="configModal('add',null)">
                    Agregar Producto
                </button>
            </div>
            <div class="col pt-4">            
                <div class="row" v-if="products.length != 0">
                    <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-auto" v-for="p in arrayProducts" :key="p.id">
                        <div class="card">
                            <img :src="p.rutaCloudinary" class="card-img-top" :alt="p.nombreProducto">
                            <div class="card-body">
                                <h2 class="card-title text-capitalize">{{ p.nombreProducto }}</h2>
                                <div class="module line-clamp">
                                    <p class="card-text">{{ p.descripcionProducto }}</p>
                                </div>
                            </div>
                            <div class="card-body pb-3 pt-0 d-flex justify-content-end">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button @click="configModal('edit',p.Id)" data-toggle="modal" data-target="#configProduct" class="btn btn-primary">Editar</button>
                                    <button @click="configModal('delete',p.Id)" data-toggle="modal" data-target="#configProduct" class="btn btn-danger">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center" v-else>                
                    <h1 class="text-muted">No hay registros por el momento</h1>
                </div>
            </div>
        </div>        

        <!-- Modal -->
        <div class="modal fade" id="configProduct" tabindex="-1" role="dialog" 
        aria-labelledby="configProductTitle" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title" id="configProductTitle">{{ modal.title }}</h2>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="cerrar-modal" @click="cerrarModal()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body pt-0">    
                        <div class="card">
                            <div class="card-body">
                                <form @submit.prevent="configProduct(modal.operacion)" v-if="modal.operacion != 'deleteProduct'">
                                    <input type="hidden" v-if="modal.operacion != 'addProduct'" class="form-control" v-model="product.Id">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Inserta un nuevo Producto" 
                                        v-model="product.nombre" required>
                                    </div>
                                    <div class="form-group">
                                        <textarea cols="2" rows="5" class="form-control" placeholder="Descripción del Producto"
                                        v-model="product.descripcion" required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <v-select :options="categorias" v-model="product.categoria" class="bg-white" style="width:100%;" placeholder="Seleccione Categoria" @input="cambioCategoria" :reduce="Descripcion => Descripcion.Id" label="Descripcion">
                                            <template #search="{attributes, events}">
                                                <input 
                                                :required="!product.categoria"
                                                class="vs__search"
                                                v-bind="attributes"
                                                v-on="events">
                                            </template>
                                        </v-select>
                                    </div>
                                    <div class="form-group">
                                        <img :src="product.imagen" :alt="product.nombre" 
                                        v-if="modal.operacion != 'addProduct'" class="card-img-top">
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="custom-file">
                                            <input type="file" ref="files" required class="custom-file-input" id="inputGroupFile02" @change="onFileSelected">
                                            <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{{ title }}</label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block">
                                        Enviar
                                    </button>
                                </form>
                                <form @submit.prevent="configProduct(modal.operacion)" v-else>                                    
                                    <h2 class="text-center">¿Desea Eliminar Este Producto?</h2>
                                    <input type="hidden" v-if="modal.operacion != 'addProduct'" class="form-control" v-model="product.Id">
                                    <div class="btn-group" role="group" aria-label="Basic example" style="width:100%;">
                                        <button type="submit" class="btn btn-success">Si</button>
                                        <button data-dismiss="modal" class="btn btn-danger">No</button>
                                    </div>
                                </form>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-console */
    import axios from 'axios';
import { setTimeout } from 'timers';

axios.defaults.timeout = 60000;

    class Product{
        constructor(Id,nombre,descripcion,imagen,estado,categoria){
            this.Id = Id;
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.estado = estado;
            this.categoria = categoria;
            this.imagen = imagen;
        }
    }

    export default {
        name: 'products',
        data() {
            return {
                product: new Product(),
                title: 'Elige una Imagen',
                files: [],
                modal: {
                    title: 'Agregar un Nuevo Producto',
                    operacion: 'addProduct'
                },
                products: [],
                categorias: [],
                message: []
            }
        },
        methods: {
            getProducts(){          
                this.$store.dispatch("getProducts").then( response => {
                    this.products = response.data;
                })
            },
            getCategorias(){       
                this.$store.dispatch("getCategorias").then( response => {
                    this.categorias = response.data;
                })
            },
            onFileSelected(){
                let uploadedFiles = this.$refs.files.files[0];
                this.files = uploadedFiles;
                this.title = uploadedFiles.name;
            },
            configModal(config, id){
                if(config == 'add'){
                    this.modal.title = 'Agregar un Nuevo Producto';
                    this.modal.operacion = 'addProduct';
                }else if(config == 'edit'){
                    this.modal.title = 'Editar un Producto';
                    this.modal.operacion = 'editProduct';
                    this.products.forEach(element => {
                        if(element.Id == id){
                            this.product.imagen = element.rutaCloudinary;
                            this.product.categoria = element.IdCategoria;
                            this.product.nombre = element.nombreProducto;
                            this.product.descripcion = element.descripcionProducto;
                            this.product.Id = id;
                            this.product.estado = element.IdEstado;
                            this.title = element.nombreArchivo;
                        }
                    });
                }else if(config == 'delete'){
                    this.modal.title = 'Eliminar este Producto';
                    this.modal.operacion = 'deleteProduct';
                    this.products.forEach(element => {
                        if(element.Id == id){
                            this.product.imagen = element.nombreArchivo;
                            this.product.categoria = element.IdCategoria;
                            this.product.nombre = element.nombreProducto;
                            this.product.descripcion = element.descripcionProducto;
                            this.product.Id = id;
                            this.product.estado = element.IdEstado;
                            this.title = element.nombreArchivo;
                        }
                    });
                }
            },
            cerrarModal(){
                setTimeout(() => {                    
                    this.product = new Product();
                    this.title = 'Elige una Imagen';
                    this.files = [];
                    this.modal.operacion = 'addProduct';
                }, 500);
            },
            configProduct(operacion){
                if(operacion == 'addProduct'){
                    this.addProduct();
                }else if(operacion == 'editProduct'){
                    this.editProduct();
                }else{
                    this.deleteProduct()
                }
            },
            cambioCategoria(param){
                this.product.categoria = param;
            },
            addProduct(){                
                let formData = new FormData();
                let _this = this;
                formData.append('imagen',this.files);
                formData.append('nombreProducto',this.product.nombre);
                formData.append('descripcionProducto',this.product.descripcion);
                formData.append('IdCategoria',this.product.categoria);

                axios.post("/products", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( response => {
                    _this.getProducts();
                    let modal = document.getElementById("cerrar-modal");
                    _this.message = response.data.data.message;
                    _this.product = new Product();
                    _this.title = 'Elige un Imagen';
                    modal.click();
                }).catch( error => {
                    _this.getProducts();
                    let modal = document.getElementById("cerrar-modal");
                    _this.message = error;
                    _this.product = new Product();
                    _this.title = 'Elige un Imagen';
                    modal.click();
                    console.log(error);
                })
            },
            editProduct(){

            },
            deleteProduct(){
                const id = this.product.Id;
                let _this = this;
                this.$store.dispatch("deleteProduct", id ).then( response => {
                    _this.getProducts();
                    let modal = document.getElementById("cerrar-modal");
                    _this.message = response.message;
                    _this.product = new Product();
                    _this.title = 'Elige un Imagen';
                    modal.click();
                }).catch( error => {
                    console.log(error);
                })
            }
        },
        beforeMount(){
            this.getProducts();
            this.getCategorias();
        },
        mounted() {
            let modal = document.getElementById("configProduct");
            modal.addEventListener('hidden.bs.modal', function (e) {
                console.log(e)
                console.log("modal-cerrado");
            })    
        },
        computed: {
            arrayProducts(){
                let array = [];
                this.products.forEach(element => {
                    if(element.IdEstado == 1){
                        array.push(element);
                    }
                }); 
                return array;
            }
        }
    }

</script>

<style>
    
</style>