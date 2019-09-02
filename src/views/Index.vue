<template>
        <div class="row">
            <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6" v-for="product in products" :key="product.Id">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent p-0">
                        <img :src="product.rutaCloudinary" style="width:100%;">
                    </div>
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class=" text-muted mb-4">
                            <h2>{{ product.nombreProducto }}</h2>
                            <p>{{ product.descripcionProducto }}</p>
                        </div>
                        <div class="text-right">
                            <!-- <span class="momentDate">{{ (product.created_at) | formatDate }}</span> -->
                            <timeago :datetime="product.created_at" :auto-update="1" locale="es"></timeago>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
/* eslint-disable no-console */
    export default {
        name: 'index',
        data() {
            return {
                products: []
            }
        },
        methods: {            
            getProducts(){          
                this.$store.dispatch("getProducts").then( response => {
                    this.products = response.data;
                })
            },
        },
        mounted() {
            this.getProducts();
        },
                
    }
</script>

<style>
    .momentDate{
        text-transform: capitalize;
    }
</style>