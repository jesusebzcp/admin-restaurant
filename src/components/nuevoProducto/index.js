import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FirebaseContext } from '../../firebase';
import 'firebase/firestore';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

import { useHistory } from 'react-router-dom';

const NuevoProducto = () => {
  //state para las imagenes
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [url, setUrl] = useState();

  //Redirecionar DESPUES DE AGREGAR UN PRODUCTO
  const redirecionar = useHistory();

  //Context Firebase
  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
    },
    //Agregando validacion
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, 'El Nombre del producto debe tener por lo menos 3 caracteres')
        .required('El Nombre es obligatorio'),
      precio: Yup.number()
        .min(1, 'Debes agregar un Precio ')
        .required('El Precio es obligatorio'),
      categoria: Yup.string().required('La categoria es obligatoria'),
      descripcion: Yup.string()
        .min(10, 'La Descripcion debe tener almenos 10 caracteres')
        .required('La Descripcion es obligatorio'),
    }),

    onSubmit: (producto) => {
      try {
        producto.existencia = true;
        producto.imagen = url;
        firebase.db.collection('productos').add(producto);
        redirecionar.push('/menu');
      } catch (error) {
        console.log(error);
      }
    },
  });
  //Manejando el Unpload de las imagenes
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };
  const handleUploadError = (error) => {
    setSubiendo(false);
    console.log(error);
  };
  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setSubiendo(false);
    //guardar url de destino
    const url = await firebase.storage
      .ref('productos')
      .child(nombre)
      .getDownloadURL();
    console.log(url);
    setUrl(url);
  };
  const handleProgress = (progreso) => {
    setProgreso(progreso);
    console.log(progreso);
  };

  return (
    <>
      <h1>Agregar platillo</h1>
      <div className="flex justify-center mt-10 ">
        <div className=" max-w-3xl w-full">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre del producto
              </label>
              <input
                className="shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre del producto"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                <div
                  className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">*Hubo un error</p>
                  <p className="font-bold">{formik.errors.nombre}</p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio del Producto
              </label>
              <input
                className="shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                min="0"
                placeholder="Precio del producto"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                role="alert"
              >
                <p className="font-bold">*Hubo un error</p>
                <p className="font-bold">{formik.errors.precio}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="categoria"
              >
                Categoria
              </label>
              <select
                className="shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">--Seleciones una categoria</option>
                <option value="desayuno">desayuno</option>
                <option value="Bebida">Bebida</option>
                <option value="cena">cena</option>
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div
                className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                role="alert"
              >
                <p className="font-bold">*Hubo un error</p>
                <p className="font-bold">{formik.errors.categoria}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref('productos')}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
              {subiendo && (
                <div className="h-12 relative w-full border mt-4">
                  <div
                    className="bg-green-500 ansolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                    style={{ width: `${progreso}%` }}
                  >
                    {`${progreso}%`}
                  </div>
                </div>
              )}
              {setUrl && (
                <p className="bg-green-500 text-white p-3 text-center my-5">
                  La imagen se subi correctamente
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="descripcion"
              >
                Descripcion
              </label>
              <textarea
                className="h-40 shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                id="descripcion"
                placeholder="Descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                role="alert"
              >
                <p className="font-bold">*Hubo un error</p>
                <p className="font-bold">{formik.errors.descripcion}</p>
              </div>
            ) : null}
            <input
              type="submit"
              value="Agregar platillo"
              className=" rounded bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoProducto;
