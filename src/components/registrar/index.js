import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FirebaseContext } from '../../firebase';
import 'firebase/firestore';
import 'firebase/storage';

import { useHistory } from 'react-router-dom';

const Registro = () => {
  //Redirecionar DESPUES DE AGREGAR UN PRODUCTO
  const redirecionar = useHistory();

  //Context Firebase
  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: '',
    },
    //Agregando validacion
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, 'El Nombre del producto debe tener por lo menos 3 caracteres')
        .required('El Nombre es obligatorio'),
      email: Yup.string()
        .email('email invalido')

        .required('El Email es obligarotio'),
      password: Yup.string()
        .required('El password es obligatorio')
        .min(6, 'El password debe ser mayor a 6 caracteres '),
    }),

    onSubmit: async (nombre, email, password) => {
      try {
        //Para el que lea esto dure como 2 horas en esto
        //por alguna razon formik me regresa las variables en un arreglo
        const usuario = [nombre, email, password];
        const dataUser = usuario[0];

        const nuevoUsuario = await firebase.auth.createUserWithEmailAndPassword(
          dataUser.email,
          dataUser.password,
        );
        redirecionar.push('/');

        return await nuevoUsuario.user.updateProfile({
          displayName: dataUser.nombre,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <h1>Agregar platillo</h1>
      <div className="flex justify-center mt-10 ">
        <div className=" max-w-3xl w-full">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                aria-describedby="emailHelp"
                placeholder="Nombre adminstrador"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div
                className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                role="alert"
              >
                <p className="font-bold">*Hubo un error</p>
                <p className="font-bold">{formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="email">Email </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="tu email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">*Hubo un error</p>
                  <p className="font-bold">{formik.errors.email}</p>
                </div>
              ) : null}
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div
                className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                role="alert"
              >
                <p className="font-bold">*Hubo un error</p>
                <p className="font-bold">{formik.errors.password}</p>
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registro;
/* <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre del administrdor
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
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email administrador"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">*Hubo un error</p>
                  <p className="font-bold">{formik.errors.email}</p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                password
              </label>
              <input
                className="shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="bg-red-100 border-red-500 text-red-700 p-4 border-l-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">*Hubo un error</p>
                  <p className="font-bold">{formik.errors.password}</p>
                </div>
              ) : null}
            </div>
            <input
              type="submit"
              value="Agregar platillo"
              className=" rounded bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
            />
          </form>*/
