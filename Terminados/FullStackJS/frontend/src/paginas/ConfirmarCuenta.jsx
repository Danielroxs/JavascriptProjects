import { useParams } from "react-router-dom";

const ConfirmarCuenta = () => {
  const params = useParams();

  console.log(params);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Empieza a Administrar{" "}
          <span className="text-black">Tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"></div>
    </>
  );
};

export default ConfirmarCuenta;
