/* eslint-disable react/prop-types */
export const ScoreContainer = ({ score }) => {
  return (
    <div className="flex font-semibold items-center">
      <h1 className="text-xl text-white mr-2">Puntuación:</h1>
      <div className="rounded-full bg-white text-black text-md  px-4">{score}
      </div>
    </div>
  );
};
