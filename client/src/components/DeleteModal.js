const Loader = ({ handleConfirm }) => {
  return (
    <div className="bg-slate-500 bg-opacity-20  w-full h-full z-50 fixed top-0 left-0  ">
      <div className="bg-white p-2 rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96   ">
        <div>
          <div className="max-w-md mx-auto bg-white p-2 rounded-lg shadow-md">
            <h2 className="text-lg   mb-4">
              Do you want to delete this project?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-rose-500 py-1 px-2 m-1 rounded flex justify-center items-center gap-2"
                onClick={() => handleConfirm("true")}
              >
                <h2 className="font-semibold text-white">Confirm </h2>
              </button>
              <button
                className="bg-slate-500 py-1 px-2 m-1 rounded flex justify-center items-center gap-2"
                onClick={() => handleConfirm("false")}
              >
                <h2 className="font-semibold text-white">Cancel </h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
