import notFound from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <img src={notFound} alt="not found" className="block mt-28 mx-auto" />
    </>
  );
}
