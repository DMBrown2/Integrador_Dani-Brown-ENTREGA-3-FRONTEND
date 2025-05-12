import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Admin.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const URL = import.meta.env.VITE_API_URL
const URL_FILES = import.meta.env.VITE_API_URL_FILES;
console.log("🔗 URL_FILES:", URL_FILES); // Esto debería mostrar http://localhost:4000


export default function Admin() {

    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        reset,
        watch,
        formState: { errors },
    } = useForm()


    useEffect(() => {
        loadProducts()
    }, [])

    useEffect(() => {
        console.log("🛠️ editProduct cambió:", editProduct)

        if (editProduct) {
            console.log("📌 editProduct existe:", editProduct.name);
            console.log("🆔 ID del producto:", editProduct._id)

            setValue("image", editProduct.image)
            setValue("name", editProduct.name || "", { shouldValidate: true })
            setValue("genre", editProduct.genre)
            setValue("category", editProduct.category)
            setValue("price", editProduct.price)
            setValue("description", editProduct.description)
        } else {
            console.log("⚠️ editProduct es null o no tiene título")
            reset()
        }

        // Hacer Scroll al formulario
        // document
        //     .getElementById("name")
        //     .scrollIntoView({ behavior: "smooth" });
    }, [editProduct, setValue, reset])

    async function updateProduct(producto) {
        if (!producto || !producto._id) {
            console.error("❌ Error: El producto no tiene un ID válido", producto);
            return;
        }
        console.log("📌 Producto a editar:", producto)
        setEditProduct(producto);
    }

    async function loadProducts() {
        try {
            const response = await axios.get(`${URL}/products`)
            setProducts(response.data.products)
            console.log("📦 Productos cargados:", response.data)

        } catch (error) {
            console.log(error)
        }
    }


    async function onSubmit(data) {

        try {

            const formData = new FormData()

            console.log("📦 Data del formulario:", data);


            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("price", data.price)
            formData.append("category", data.category)
            formData.append("genre", data.genre)
            
            
            if (data.image?.length) {
                formData.append("image", data.image[0])
            }

            for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

            
            if (editProduct) {

               const response = await axios.put(`${URL}/products/${editProduct._id}`, formData, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
                //Actualizar el estado de los productos.
                setProducts((prevProducts) =>
                    prevProducts.map((prod) =>
                        prod._id === editProduct._id ? response.data.product : prod
                    )
                );

                setEditProduct(null);
                reset();


                Swal.fire(
                    "Prod editado",
                    "El prod fue editado correctamente",
                    "success"
                )

            } else {

                const response = await axios.post(`${URL}/products`, formData)

                setProducts([...products, response.data.product])
                reset()

                Swal.fire(
                    "Producto nuevo creado!",
                    "El producto fue creado correctamente",
                    "success"
                );
            }

            setFocus("name")

        } catch (error) {
            console.log(error);
            alert('Error subiendo producto');
        }
    }

    function deleteProduct(id) {
        console.log("Borrar post con id", id);

        try {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "No podrás recuperar este producto!",
                icon: "warning",
                draggable: true,
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sí, borrar!",
                confirmButtonColor: "#F00",
                cancelButtonColor: "#3085d6",
                reverseButtons: true,
                customClass: {
                    cancelButton: "swal-cancel-btn",
                    confirmButton: "swal-confirm-btn",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`${URL}/products/${id}`);

                    const produtcsWithoutDeletedProduct = products.filter(
                        (prod) => prod._id !== id
                    );
                    setProducts(produtcsWithoutDeletedProduct);
                    Swal.fire(
                        "Producto borrado!",
                        "El producto fue borrado correctamente",
                        "success"
                    );
                }
            });

            // }
        } catch (error) {
            console.log(error);
            alert("No se pudo borrar el producto");
        }
    }


    return (
        <div>
            <div className="titulo-descripcion">
                <h1 className="titulo-admin">Administrador</h1>
                <p>Hay un total de {products.length} productos</p>
            </div>

            <div className="admin-form-table">

                <div className="admin-form-section">

                    <form
                        action=""
                        className="admin-form"
                        onSubmit={handleSubmit(onSubmit, (errors) => console.error("❌ Errores:", errors))}>

                        <div className="input-imagen">
                            <label htmlFor="image">Imagen de producto: </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                name="image"
                                {...register("image", { required: editProduct ? false : "La imagen es obligatoria" })}
                            />
                            {errors.image && <span className="input-error">{errors.image.message}</span>}

                        </div>

                        <div className="input-group">
                            <label htmlFor="" id='titulo'>Nombre: </label>
                            <input
                                type="text"
                                {...register("name", { required: "El nombre es obligatorio" })}
                            />
                            {errors.name && <span className="error">{errors.name.message}</span>}

                        </div>

                        <div className="input-group">
                            <label htmlFor="">Género: </label>
                            <input
                                type="text"
                                {...register('genre', {
                                    required: { value: true, message: 'This field is required' },
                                    maxLength: { value: 20, message: 'Max length is 20' },
                                    minLength: { value: 3, message: 'Min length is 3' },
                                })}
                            />
                            {errors.genre && (
                                <span className="input-error">{errors.genre?.message}</span>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="">Categoria: </label>
                            <select
                                value={watch("category") || ""}
                                {...register('category', {
                                    required: "This field is required"
                                })}
                            >
                                <option value="" disabled>
                                    Selecciona una categoria
                                </option>
                                <option value="Nuevo">Nuevo</option>
                                <option value="Best Seller!">Best Seller!</option>
                                <option value="Ninos">Niños</option>
                                <option value="Clasico">Clásico</option>
                            </select>
                            {errors.category && (
                                <span className="input-error">
                                    {errors.category?.message}
                                </span>
                            )}
                        </div>


                        <div className="input-group">
                            <label htmlFor="">Precio: </label>
                            <input
                                type="number"
                                {...register('price', {
                                    required: {
                                        value: true,
                                        message: 'This field is required',
                                    },
                                    max: { value: 20000000, message: 'Max price is 20000000' },
                                    min: { value: 1, message: 'Min price is 1' },
                                })}
                            />
                            {errors.price && (
                                <span className="input-error">{errors.price?.message}</span>
                            )}
                        </div>


                        <div className="input-group">
                            <label htmlFor="">Descripción: </label>
                            <textarea
                                rows={5}
                                {...register('description', {
                                    required: {
                                        value: true,
                                        message: 'This field is required',
                                    },
                                    maxLength: { value: 2000, message: 'Max length is 2000' },
                                    minLength: { value: 5, message: 'Min length is 5' },
                                })}
                            ></textarea>
                            {errors.description && (
                                <span className="input-error">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>

                        <button className='btn-cargar'
                            type="submit">
                            Cargar
                        </button>

                    </form>

                </div>


                <div className="table-responsive">
                    <table border={1} className="admin-table">
                        {/* Cabecera de la tabla */}
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Género</th>
                                <th>Categoria</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Cuerpo de la tabla */}

                            {products.map(producto => {

                                console.log("🖼️ producto.image:", producto.image);

                                return (

                                    <tr key={producto._id}>

                                        <td className="image-cell">
                                           <img src={`${import.meta.env.VITE_API_URL_FILES}/products/${producto.image}`}className="table-image" />

                                        </td>
                                        <td className="name-cell">{producto.name}</td>
                                        <td className="genero-cell">{producto.genre}</td>
                                        <td className="status-cell">{producto.category}</td>
                                        <td className="precio-cell">${producto.price}</td>
                                        <td className="coment-cell">
                                            {producto.description}
                                        </td>
                                        <td className="tools-cell">
                                            <div className="icon-container">
                                                <button onClick={() => updateProduct(producto)} className="btn">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button onClick={() => deleteProduct(producto._id)} className="btn">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )

                            })}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}
