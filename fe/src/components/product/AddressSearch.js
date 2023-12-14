import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import './AddressSearch.css'
import { AiFillCloseCircle } from "react-icons/ai";


const AddressSearch = ({ updateAddress }) => {
    const [isAddressOpen, setIsAddressOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddressComplete = (data) => {
        updateAddress(data);
        setIsAddressOpen(false);
    };

    const clickCloseButton = () => {
        updateAddress("");
        setIsAddressOpen(false);
    }

    const modalStyle = {
        zIndex: 1000,
        backgroundColor: "white",
        padding: "20px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -70%)",
    };

    const closeButtonStyle = {
        position: "absolute",
        top: "-5px",
        right: "-5px",
        cursor: "pointer",
        zIndex: 1001,
        opacity: isHovered ? 1 : 0.5,  // 마우스 호버 여부에 따라 투명도 조절
        transition: "opacity 0.3s ease-in-out",  // 부드러운 투명도 전환을 위한 트랜지션
    };

    return (
        <div style={modalStyle}>
            {isAddressOpen && (
                <>
                    <div
                        style={closeButtonStyle}
                        title="닫기"
                        onClick={clickCloseButton}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <AiFillCloseCircle
                            size={30}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <DaumPostcode
                        onComplete={handleAddressComplete}
                        autoClose
                        width={480}
                        height={605}
                    />
                </>
            )}
        </div>
    );
};

export default AddressSearch;
