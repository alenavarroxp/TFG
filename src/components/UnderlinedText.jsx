/* eslint-disable react/prop-types */
export const UnderlinedText = ({ text, style }) => {
    return (
      <div
        className={`text-white ml-5 font-semibold justify-center items-center border-b-2 w-fit flex flex-row ${style}`}
      >
        {text}
      </div>
    );
  };
  