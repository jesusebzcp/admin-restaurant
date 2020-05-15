import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FirebaseContext } from '../../firebase';
import 'firebase/firestore';
import 'firebase/storage';

const Login = () => {
  //Context Firebase
  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    //Agregando validacion
    validationSchema: Yup.object({
      email: Yup.string()
        .email('email invalido')

        .required('El Email es obligarotio'),
      password: Yup.string()
        .required('El password es obligatorio')
        .min(6, 'El password debe ser mayor a 6 caracteres '),
    }),

    onSubmit: async (email, password) => {
      try {
        //Para el que lea esto dure como 2 horas en esto
        //por alguna razon formik me regresa las variables en un arreglo
        const usuario = [email, password];
        const dataUser = usuario[0];

        await firebase.auth.signInWithEmailAndPassword(
          dataUser.email,
          dataUser.password,
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className=" contenedorLogin mt-10">
        <div className="container card p-5">
          <h1>Login</h1>

          <form onSubmit={formik.handleSubmit}>
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

export default Login;
