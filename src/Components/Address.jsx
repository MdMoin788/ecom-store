import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../API";
import {
  getAddressData,
  getAddressError,
  getAddressLoading,
  getAddressSuccess,
} from "../Redux/Address/action";
import { getCartProductsData } from "../Redux/Cart/action";
import { Footer2 } from "./Footer2";
import Modal from "./Modal";
import { Navbar2 } from "./Navbar2";
import "./Styles/Checkout.css";
import { TotalAmount } from "./TotalAmount";

export const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState();
  const [pincode, setPincode] = useState();
  const [addressField, setAddressField] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { cart_products, quantity, itemQty, cart } = useSelector(
    (state) => state.cart_products
  );
  const { userId, token } = useSelector((state) => state.login);
  const { address } = useSelector((state) => state.address);

  const [oldTotal, setoldTotal] = useState(0);
  const [dis, setdis] = useState(0);

  useEffect(() => {
    dispatch(getAddressData(userId, token));
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    document.title = "Your Address | e-mart shopping platform";
  }, []);

  useEffect(() => {
    let x = 0;
    let d = 0;
    for (let i = 0; i < cart_products.length; i++) {
      x += Number(cart_products[i].oldPrice) * itemQty[i];
      d += Number(cart_products[i].newPrice) * itemQty[i];
    }
    setdis(x - d);
    setoldTotal(x);
  }, []);

  const addressData = {
    userName,
    mobile,
    pincode,
    addressField,
    town,
    state,
    userId,
  };
  const addressSubmit = () => {
    fetch(`${API_URL}/user/address`, {
      method: "POST",
      body: JSON.stringify(addressData),
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(getAddressData(userId, token));
        // navigate("/checkout/payment");
      })

      .catch((error) => console.log(error));
  };

  const removeAddress = () => {
    dispatch(getAddressLoading());

    fetch(`${API_URL}/user/address/delete/${userId}`, {
      
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(getAddressData(userId, token));
        dispatch(getAddressSuccess());
      })
      .catch((error) => dispatch(getAddressError(error)));
  };

  const deleteData = () => {};

  return (
    <div>
      <Navbar2 atc={"#20BD99"} />

      <div className="cart_items_container">
        <div className="checkout_div_left address_container">
          {address.length > 0 ? (
            <div>
              <h3 style={{ fontSize: "2rem" }}>Delivery Address</h3>
              <div className="address_details_div">
                <h2>{address[0].userName}</h2>
                <p>{address[0].addressField}</p>
                <p>
                  {address[0].town} {address[0].state}-{address[0].pincode}
                </p>
                <p>Mobile - {address[0].mobile}</p>

                <div className="remove_edit_btn">
                  <div className="icons">
                    <button className="add_btn" onClick={() => removeAddress()}>
                      REMOVE
                    </button>
                  </div>
                  <div className="icons">
                    <button className="add_btn" onClick={() => setIsOpen(true)}>
                      EDIT
                    </button>

                    {isOpen && (
                      <Modal
                        address={address}
                        token={token}
                        userId={userId}
                        deleteData={deleteData}
                        setIsOpen={setIsOpen}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="address_input ">
              <div className="contact_details input_title">
                <p>CONTACT DETAILS</p>
                <div>
                  <div className="input_wraper">
                    <label for="name" className="input_label">
                      Name*
                    </label>
                    <input
                      value={userName}
                      className="input_input "
                      id="name"
                      type="text"
                      required
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="input_wraper">
                    <label for="mobile" className="input_label">
                      Mobile No*
                    </label>
                    <input
                      value={mobile}
                      className="input_input "
                      id="mobile"
                      type="number"
                      required
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="address_details input_title">
                <p>ADDRESS</p>
                <div>
                  <div className="input_wraper">
                    <label for="pincode" className="input_label">
                      Pin code*
                    </label>
                    <input
                      value={pincode}
                      className="input_input "
                      id="pincode"
                      type="number"
                      required
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <div className="input_wraper">
                    <label for="address" className="input_label">
                      Address (House No, Building, Street, Area)*
                    </label>
                    <input
                      value={addressField}
                      className="input_input "
                      id="address"
                      type="text"
                      required
                      onChange={(e) => setAddressField(e.target.value)}
                    />
                  </div>
                  <div className="input_wraper">
                    <label for="locality" className="input_label">
                      Locality/Town*
                    </label>
                    <input
                      value={town}
                      className="input_input "
                      id="address"
                      type="text"
                      required
                      onChange={(e) => setTown(e.target.value)}
                    />
                  </div>
                  <div className="input_wraper">
                    <label for="state" className="input_label">
                      State*
                    </label>
                    <input
                      value={state}
                      className="input_input "
                      id="state"
                      type="text"
                      required
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <input type="checkbox" />
                <span style={{ fontSize: "14px" }}>
                  {" "}
                  Make this my default address
                </span>
              </div>
              <div className="place_order_btn save_address">
                <button
                  onClick={() => {
                    addressSubmit();
                  }}
                >
                  SAVE ADDRESS
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="checkout_div_right address_price_section">
          <TotalAmount
            totalQty={quantity}
            oldTotal={oldTotal}
            dis={dis}
            btn={address.length > 0 ? true : false}
            redirectLink={"/checkout/payment"}
            btnText={"CONTINUE"}
          />
        </div>
      </div>
      <Footer2 />
    </div>
  );
};
