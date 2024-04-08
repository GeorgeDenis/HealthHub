const CircleProgress = ({
  calories,
  carbsProcent,
  proteinProcent,
  fatProcent,
}) => {
  const strokeWidth = 10;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const percentColors = {
    carbsProcent,
    proteinProcent,
    fatProcent,
  };

  const offsetForCarbs =
    ((100 - percentColors.carbsProcent) / 100) * circumference;
  const offsetForProtein =
    offsetForCarbs +
    ((100 - percentColors.proteinProcent) / 100) * circumference;
  const offsetForFat =
    offsetForProtein + ((100 - percentColors.fatProcent) / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#DDD"
          strokeWidth={strokeWidth - 2}
        />

        {/* Fat (Orange) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#FF5F1F"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetForFat}
        />

        {/* Protein (Purple) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#7d12ff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetForProtein}
        />

        {/* Carbs (Teal) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#66b2b2"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetForCarbs}
        />
      </svg>
      <span className="absolute text-lg font-semibold text-white">
        {calories} cal
      </span>
    </div>
  );
};
export default CircleProgress;
