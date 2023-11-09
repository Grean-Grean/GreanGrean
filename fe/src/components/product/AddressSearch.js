import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";

const AddressSearch = ({ updateAddress }) => {
    const [isAddressOpen, setIsAddressOpen] = useState(true);

    const handleAddressComplete = (data) => {
        updateAddress(data);
        setIsAddressOpen(false);
    };

    const modalStyle = {
        position: "fixed",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "20px",
    };

    return (
        <div style={modalStyle}>
            {isAddressOpen && (
                <DaumPostcode
                    onComplete={handleAddressComplete}
                    autoClose
                    width={456}
                    height={545}
                />
            )}
        </div>
    );
};

export default AddressSearch;
