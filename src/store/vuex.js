/*eslint-disable no-unused-vars*/
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'https://crud-manejo-archivos.herokuapp.com/'

export default new Vuex.Store({
    state: {
        
    },
    getters:{
    //   logueado(state){
    //     return new Promise((resolve,reject) => {
    //       axios.post('/model/functions/validate_token.php',{
    //         jwt: state.token
    //       }).then(response => {
    //         resolve(response.data)
    //       }).catch(error => {
    //         console.log(error)
    //         reject(error)
    //       })
    //     })
    //   }
    },
    mutations: {
    //   recuperarToken(state, token){
    //     state.token = token
    //   }
    },
    actions: {
        getProducts(){
            return new Promise( (resolve, reject) => {
                axios.get('/products').then( response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getCategorias(){
            return new Promise( (resolve,reject) => {
                axios.get('/categorias').then( response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteProduct(context, id){
            return new Promise( (resolve, reject) => {
                axios.delete('/products/'+ id).then( response => {
                    resolve(response.data)
                }).catch( error => {
                    reject(error)
                })
            })
        }
    //   recuperarToken(context, credentials){
    //     return new Promise((resolve,reject) => {
    //       axios.post('/controller/login.php',{
    //         username: credentials.username,
    //         password: credentials.password
    //       }).then(response => {
    //         if(response.data.success == true){
    //           let token = response.data.jwt
    //           localStorage.setItem("TKbGciOAiUbG1NiJ9iJIV1I",token)
    //           context.commit("recuperarToken",token)
    //           resolve(response.data)
    //         }else{
    //           resolve(response.data)
    //         }
    //       }).catch(error => {
    //         console.log(error)
    //         reject(error)
    //       })
    //     })
    //   }
    }
})