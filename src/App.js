import React, { Component } from 'react';
import firestore from './firestore'

class App extends Component {

    constructor() {
        super()
        this.state = {
            nroPlaca: '',
            marca: '',
            modelo: '',
            fechaCompra: '',
            precio: '',
            id: '',
            vehicles: []
        }
    }

    //Método para capturar los caracteres de cada dato
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addVehicle = e => {

        e.preventDefault()
        const db = firestore.firestore()
        db.collection('vehiculo').add({
            nroPlaca: this.state.nroPlaca,
            marca: this.state.marca,
            modelo: this.state.modelo,
            fechaCompra: this.state.fechaCompra,
            precio: this.state.precio
        })

        //Borrar info de los inputs
        this.setState({
            nroPlaca: '',
            marca: '',
            modelo: '',
            fechaCompra: '',
            precio: ''
        })
    }

    searchVehicle = e => {
        e.preventDefault()
        const db = firestore.firestore()
        db.collection('vehiculo')
        .where("nroPlaca", "==", this.state.nroPlaca)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data())
                this.setState({
                    marca: doc.data().marca,
                    modelo: doc.data().modelo,
                    fechaCompra: doc.data().fechaCompra,
                    precio: doc.data().precio,
                    id: doc.id,
                })
            })
        })
        .catch(error => {
            console.log("Error al recuperar el registro", error)
        })
    }

    updateVehicle = e => {
        e.preventDefault()
        const db = firestore.firestore()
        let vehicleRefV = db.collection('vehiculo')
            .doc(this.state.id)
        return vehicleRefV.update({
            nroPlaca: this.state.nroPlaca,
            marca: this.state.marca,
            modelo: this.state.modelo,
            fechaCompra: this.state.fechaCompra,
            precio: this.state.precio
        })
        .then(() => {
            console.log("Vehículo actualizado")
        })
        .catch(error => {
            console.log("Error al actualizar el registro", error)
        })
    }

    deleteVehicle = e => {
        e.preventDefault()
        const db = firestore.firestore()
        db.collection('vehiculo')
        .doc(this.state.id)
        .delete()
        .then(() => {
            console.log("Vehículo elimminado")
        })
        .catch(error => {
            console.log("Error al eliminar el registro", error)
        })
    }

    listVehicles = e => {
        e.preventDefault()
        let listVehicles = []
        const db = firestore.firestore()
        db.collection('vehiculo')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                let id = doc.id
                let nroPlaca = doc.data().nroPlaca
                let marca = doc.data().marca
                let modelo = doc.data().modelo
                let fechaCompra = doc.data().fechaCompra
                let precio = doc.data().precio
                let vehicle = {id, nroPlaca, marca, modelo, fechaCompra, precio}
                listVehicles.push(vehicle)
            })
            this.setState({
                vehicles: listVehicles
            })
            console.log(this.state.vehicles)
        })
    }

    render() {

        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 bg-secondary">
                        <h2 className="mt-3 text-center text-light">Concesionaria de Vehículos</h2>
                            <form onSubmit={this.addVehicle}>
                                <div className="mb-3">
                                    <label className="text-light">Número de Placa:</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        name="nroPlaca"
                                        onChange={this.handleChange}
                                        value={this.state.nroPlaca}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-light">Marca:</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        name="marca"
                                        onChange={this.handleChange}
                                        value={this.state.marca}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-light">Modelo:</label>
                                    <input 
                                        className="form-control" 
                                        type="number" 
                                        name="modelo"
                                        onChange={this.handleChange}
                                        value={this.state.modelo}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-light">Fecha de compra:</label>
                                    <input 
                                        className="form-control" 
                                        type="datetime-local" 
                                        name="fechaCompra"
                                        onChange={this.handleChange}
                                        value={this.state.fechaCompra}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-light">Precio:</label>
                                    <input 
                                        className="form-control" 
                                        type="number" 
                                        name="precio"
                                        onChange={this.handleChange}
                                        value={this.state.precio}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mb-2" style={{float:'left'}}>Guardar</button>
                            </form>
                            <form onSubmit={this.searchVehicle}>
                                <button type="submit" className="btn btn-success mb-2" style={{float:'left', 'marginLeft':'10px'}}>Buscar</button>
                            </form>
                            <form onSubmit={this.updateVehicle}>
                                <button type="submit" className="btn btn-warning mb-2" style={{float:'left', 'marginLeft':'10px'}}>Actualizar</button>
                            </form>
                            <form onSubmit={this.deleteVehicle}>
                                <button type="submit" className="btn btn-danger mb-2" style={{float:'left', 'marginLeft':'10px'}}>Eliminar</button>
                            </form>
                            <form onSubmit={this.listVehicles}>
                                <button type="submit" className="btn btn-info mb-3" style={{float:'left', 'marginLeft':'10px'}} data-bs-toggle="modal" data-bs-target="#exampleModal">Listar</button>
                            </form>

                            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header bg-secondary">
                                            <h5 className="modal-title text-light" id="exampleModalLabel">Listado de Vehículos</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                    <th>Placa</th>
                                                    <th>Marca</th>
                                                    <th>Modelo</th>
                                                    <th>Fecha de compra</th>
                                                    <th>Precio</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.vehicles.map(vehicle => (
                                                            <tr key={vehicle.id}>
                                                                <td>{vehicle.nroPlaca}</td>
                                                                <td>{vehicle.marca}</td>
                                                                <td>{vehicle.modelo}</td>
                                                                <td>{vehicle.fechaCompra}</td>
                                                                <td>${vehicle.precio}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>                
            </div>
        )
    }
}

export default App;
