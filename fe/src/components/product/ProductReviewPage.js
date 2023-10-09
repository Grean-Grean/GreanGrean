import ProductReviewItem from "./ProductReviewItem"
import React from "react"

const ProductReviewPage = ({ prductReview }) => {

    // console.log(prductReview)

    return (
        <div>
            <h2>{prductReview.length}개의 리뷰입니다.</h2>
            <div >
                {prductReview.map((item) =>
                    < ProductReviewItem key={item.id} {...item} />
                )}
            </div>
        </div>
    )

}

export default ProductReviewPage