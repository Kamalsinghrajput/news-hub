import "./loader.styles.css";

const Loader = () => {
  return (
    <div className="loader absolute left-1/2 top-1/2 -translate-x-[48px] -translate-y-[48px] rotate-45">
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
    </div>
  );
};

export default Loader;
