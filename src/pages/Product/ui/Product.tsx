import { useParams } from "react-router-dom";

export const Product = () => {
  const { productId } = useParams();

  return <div>{productId}</div>;
};
