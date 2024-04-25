"use cilent";

function Button({ children, type, onClick, customClass, disabled }) {
  const defaultClass =
    "rounded-xl bg-[#2AD5A5] text-white px-4 py-2 md:h-10 font-semibold";
  const buttonClass = customClass
    ? `${defaultClass} ${customClass}`
    : defaultClass;
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
