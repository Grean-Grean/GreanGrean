import Sidebar from "./Sidebar";
import ProductManagementList from "./ProductManagementList";
import styles from "./ProductManagement.module.css";

const ProductManagement = () => {
  return (
    <Sidebar>
      <h2 className={styles.title}>마이페이지 - 상품 관리</h2>
      <hr className={styles.bar} />
      <ProductManagementList />
    </Sidebar>
  );
};

export default ProductManagement;
