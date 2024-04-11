import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // if(authStatus=== true){
    //     navigate("/")
    // }else if(authStatus===false){
    //     navigate("/login")
    // }

    // let authValue = authStatus === true ? true : false;

    if (authentication && authStatus !== authentication) {
      navigate("/login"); //true && false !== true which is (true && true)
    } else if (!authentication && authStatus !== authentication) {
      navigate("/"); //false && true !== true which is (false && false)
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;
