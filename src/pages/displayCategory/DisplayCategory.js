import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import ProductItem from "../../components/product/productItem/ProductItem";
import useFetchCollection from "../../customHooks/useFetchCollect";
import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import styles from "./DisplayCategory.module.scss";
import Loader from "../../components/loader/Loader";

const DisplayCategory = () => {
  const [grid, setGrid] = useState(true);
  const { data, isLoading } = useFetchCollection("product");
  const products = useSelector(selectProducts);
  const { id } = useParams();
  const cat = id;

  const dispatch = useDispatch();

  const filteredProducts = products.filter(
    (product) => product.category === cat
  );
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      <div className={styles.upper}>
        <h3>
          Category: <span>{cat}</span>
        </h3>

        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {filteredProducts.map((product) => {
          return (
            <div key={product.id}>
              <ProductItem {...product} grid={grid} product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayCategory;
