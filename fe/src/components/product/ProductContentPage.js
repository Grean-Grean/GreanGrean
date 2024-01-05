import "./ProductContentPage.css"

const ProductContentPage = ({ productContent }) => {

    return (
        <div className="ProductContentPage">
            <h2 className="Text">{productContent}</h2>
        </div>
    )

}

export default ProductContentPage