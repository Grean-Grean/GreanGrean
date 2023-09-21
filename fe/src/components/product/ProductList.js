import ProductItem from './ProductItem'

const ProductList = ({ productList }) => {

    return (
        <div style={{ border: '1px solid black' }}>
            <h4>ProductList입니다.</h4>
            <h4>{productList.length}개의 꽃이 판매되고 있습니다.</h4>
            <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                {productList.map((item) => (
                    <ProductItem key={item.id} {...item} />
                ))}
            </div>
        </div >
    )
}
export default ProductList