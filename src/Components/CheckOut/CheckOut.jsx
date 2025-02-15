import { Link } from "react-router-dom";

export default function CheckOut() {
  return (
    <>
      <div className="container mt-14 p-4">
        <Link to={"/visacheckout"}>
          <p className="text-2xl hover:text-main">
            <i className="fa-solid fa-circle-arrow-right text-main me-3"></i>
            Check Out With Visa
          </p>
        </Link>
        <Link to={"/cashcheckout"}>
          <p className="text-2xl hover:text-main mt-5">
            <i className="fa-solid fa-circle-arrow-right text-main me-3"></i>
            Check Out Cash
          </p>
        </Link>
      </div>
    </>
  );
}
