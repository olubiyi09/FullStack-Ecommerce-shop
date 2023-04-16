import React from "react";
// import { AiFillDownCircle } from "react-icons/ai";
import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollect";
import { useEffect } from "react";
import Charts from "../../chart/Charts";

// Icons
const earningIcon = <AiFillDollarCircle size={30} color="#1f93ff" />;
const productIcon = <BsCart4 size={30} color="#b624ff" />;
const orderIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  const product = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("product");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );

    dispatch(STORE_ORDERS(data));

    dispatch(CALC_TOTAL_ORDER_AMOUNT({}));
  }, [dispatch, data, fbProducts]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          className={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          className={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={product.length}
          icon={productIcon}
        />
        <InfoBox
          className={`${styles.card} ${styles.card1}`}
          title={"Orders"}
          count={orders.length}
          icon={orderIcon}
        />
      </div>

      <div>
        <Charts />
      </div>
    </div>
  );
};

export default Home;
