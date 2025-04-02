import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Admin.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const URL = import.meta.env.VITE_API_URL

export default function Admin() {

    const [products, setProducts] = useState([]);
    const [ editProduct, setEditProduct] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        reset,
        formState: { errors, isValid },
    } = useForm()


    useEffect(() => {
        loadProducts()
    }, [])

    useEffect (() => {
        if(editProduct) {
            setValue("image", editProduct.image)
            setValue("title", editProduct.title)
            setValue("genre", editProduct.genre)
            setValue("category", editProduct.category)
            setValue("price", editProduct.price)
            setValue("description", editProduct.description) 
        } else {
            reset()
        }

    // Hacer Scroll al formulario
    document
      .getElementById("titulo")
      .scrollIntoView({ behavior: "smooth" });
  }, [editProduct, setValue, reset])

  async function updateProduct(producto) {
    if (!producto || !producto.id) {
        console.error("❌ Error: El producto no tiene un ID válido", producto);
        return;
    } 
    setEditProduct(producto);
  }

    async function loadProducts() {
        try {
            const response = await axios.get(`${URL}/products`)
            setProducts(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(data) {
        try {

            if (editProduct && editProduct.id) {
                
                const id = editProduct.id;

                // if (!editProduct || !editProduct.id) {
                //     console.error("❌ Error: editProduct no tiene un ID válido", editProduct);
                //     return;
                // }

                const productToUpdate = {
                    image: data.image,
                    title: data.title,
                    genre: data.genre,
                    category: data.category,
                    price: data.price,
                    description: data.description,
                }


                const response = await axios.put(`${URL}/products/${id}`, productToUpdate)
                console.log(response.data)

                //Actualizar el estado de los productos.
                const productsCopy = [...products]
                const index = productsCopy.findIndex((prod) => prod.id === id)
                productsCopy[index] = response.data

                setProducts(productsCopy)
                setEditProduct(null)

                Swal.fire(
                    "Prod editado",
                    "El prod fue editado correctamente",
                    "success"
                )

            } else {
                const newProduct = {
                    image: data.image,
                    title: data.title,
                    genre: data.genre,
                    category: data.category,
                    price: data.price,
                    description: data.description,
                    createdAt: new Date().toISOString(),
                }
          

                const response = await axios.post(`${URL}/products`, newProduct)

                console.log(response)

                setProducts([...products, response.data])
                reset()

                Swal.fire(
                    "Producto nuevo creado!",
                    "El producto fue creado correctamente",
                    "success"
                  );
                }

                setFocus("title")

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
                cancelButtonColor: "#DDD",
                reverseButtons: true,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await axios.delete(`${URL}/products/${id}`);

                  const produtcsWithoutDeletedProduct = products.filter(
                    (prod) => prod.id !== id
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
                    <p>Hay un total de X productos</p>
                </div>

                <div className="admin-form-table">

                    <div className="admin-form-section">

                        <form
                            action=""
                            className="admin-form"
                            onSubmit={handleSubmit(onSubmit)}>

                            <div className="input-imagen">
                                <label htmlFor="image">Imagen de producto: </label>
                                <input type="file" id="image" name="image" accept="image/*" />
                            </div>

                            <div className="input-group">
                                <label htmlFor="" id='titulo'>Título: </label>
                                <input
                                    type="text"
                                    {...register('title', {
                                        required: { value: true, message: 'This field is required' },
                                        maxLength: { value: 20, message: 'Max length is 20' },
                                        minLength: { value: 3, message: 'Min length is 3' },
                                    })}
                                />
                                {errors.name && (
                                    <span className="input-error">{errors.title?.message}</span>
                                )}
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
                                {errors.name && (
                                    <span className="input-error">{errors.genre?.message}</span>
                                )}
                            </div>

                            <div className="input-group">
                                <label htmlFor="">Categoria: </label>
                                <select
                                    defaultValue={''}
                                    {...register('category', {
                                        required: {
                                            value: true,
                                            message: 'This field is required',
                                        },
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
                                        maxLength: { value: 500, message: 'Max length is 500' },
                                        minLength: { value: 5, message: 'Min length is 5' },
                                    })}
                                ></textarea>
                                {errors.description && (
                                    <span className="input-error">
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={!isValid}
                            >
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
                                    <th>Título</th>
                                    <th>Género</th>
                                    <th>Categoria</th>
                                    <th>Precio</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Cuerpo de la tabla */}
                                
                                {products.map (producto => (


                               
                                <tr key={producto.id}>
                                    <td className="image-cell">
                                        <img
                                        src={producto.image}
                                            className="table-image"
                                        />
                                    </td>
                                    <td className="name-cell">{producto.title}</td>
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
                                            <button onClick={() => deleteProduct(producto.id)} className="btn">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
 ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
        
    }
