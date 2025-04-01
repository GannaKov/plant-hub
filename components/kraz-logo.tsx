const KrazLogo = () => {
  return (
    <svg
      width="300"
      height="100"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="white"
        strokeWidth="5"
        fill="none"
      />
      <path
        d="M30 50 Q50 20, 70 50 Q50 80, 30 50"
        stroke="white"
        strokeWidth="5"
        fill="none"
      />

      <text
        x="100"
        y="60"
        fontFamily="Arial"
        fontSize="50"
        fontWeight="bold"
        fill="white"
      >
        KRAZ
      </text>
    </svg>
  );
};

export default KrazLogo;
