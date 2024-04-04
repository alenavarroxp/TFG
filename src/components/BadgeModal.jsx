/* eslint-disable react/prop-types */
export const BadgeModal = ({ count, kind, style }) => {
  return (
    <div className={`stat flex items-center justify-center ${style} max-h-9  mr-4 rounded-full`}>
      <div className="stat-value text-2xl">{count}</div>
      <div className={`stat-title font-bold ${style}`}>{kind}</div>
    </div>
  );
};
