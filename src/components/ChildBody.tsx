import Banner from "./banner";

const ChildBody = () => {
  return (
    <div>
      <Banner name={"Turtlehead Tacos"} />
      <div className="centered-container">
        <div className="section space-y-14 px-10"></div>
      </div>
      <button>Add to cart</button>
    </div>
  );
};

export default ChildBody;
