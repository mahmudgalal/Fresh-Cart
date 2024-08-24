import  { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";

export default function Wishlist() {
  let { wishlist, deleteProductFromWishlist, loading } =
    useContext(WishlistContext);
     let {addProduct} = useContext(CartContext)

  





  return (
    <div className="my-36">
      <h1 className="text-5xl font-semibold py-3 text-center text-main">
        Wishlist
      </h1>{" "}
      {!wishlist?.data ? (
        <div className="shadow-md sm:rounded-lg">
          <div className="flex justify-center items-center w-full h-[400px]">
            <h1 className="text-main text-6xl">There is no Products</h1>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="flex justify-center w-full h-[600px] items-center">
              <Loading />
            </div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  {wishlist?.data.length > 0 ?
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-16 py-3 text-center">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {wishlist?.data.map((product, index) => (
                      <tr className="bg-white" key={index}>
                        <td className="p-4 flex justify-center">
                          <img
                            src={product.imageCover}
                            alt=""
                            className="w-[80px]"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                          {product.title}
                        </td>
                        <td className=" py-4  text-gray-900 text-center">
                          {product.price} EGP
                        </td>
                        <td className=" py-4 text-center">
                          <button
                            className="font-medium inline bg-red-600 text-white px-2 py-3 rounded cursor-pointer me-11"
                            onClick={() =>
                              deleteProductFromWishlist(product.id)
                            }
                          >
                            Remove
                          </button>
                          <button
                            className="font-medium inline bg-main text-white px-2 py-3 rounded cursor-pointer"
                            onClick={() =>
                              addProduct(product.id)
                            }
                          >
                            Add to Cart
                          </button>
                        </td>
                      
                      </tr>))}
                </tbody>
              </table> : (
        <div className="flex justify-center items-center w-full h-[400px]">
          <h1 className="text-main text-6xl">There is no Products</h1>
        </div>
      )}
            </div>
          )}
        </>
       )}
    </div>
  );
}
