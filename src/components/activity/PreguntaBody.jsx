/* eslint-disable react/prop-types */
export const PreguntaBody = ({actualQuestion}) => {
  return (
    <div className="py-2 font-semibold text-lg">
      {actualQuestion?.questionText}
    </div>
  );
};
