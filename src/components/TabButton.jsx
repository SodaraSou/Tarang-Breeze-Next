function TabButton({ svg, label }) {
  return (
    <button className="p-2 border border-black flex items-center gap-2 rounded-full">
      {svg}
      <div className="hidden md:block">{label}</div>
    </button>
  );
}

export default TabButton;
