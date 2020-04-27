import React from 'react';

const NuevoPlatillo = () => {
  return (
    <>
      <h1>Agregar platillo</h1>
      <div className="flex justify-center mt-10">
        <div className=" max-w-3xl w-full">
          <form>
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
              />
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
              />
            </div>
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
              >
                <option value="">--Seleciones una categoria</option>
                <option value="desayuno">desayuno</option>
                <option value="Bebida">Bebida</option>
                <option value="cena">cena</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <input
                className="shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                id="imagen"
                type="file"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  text-sm font-bold mb-2"
                htmlFor="Descripcion"
              >
                Descripcion
              </label>
              <textarea
                className="h-40 shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                id="Descripcion"
                placeholder="Descripcion"
              ></textarea>
            </div>
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

export default NuevoPlatillo;
