import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
// import { setPosts } from "./store/postSlice";
// import appwriteService from "./appwrite/conf";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));

    // appwriteService.getPosts([]).then((data) => {
    //   if (data) {
    //     dispatch(setPosts(data.documents));
    //   }
    // });
  }, []);

  return (
    <>
      {loading && <div>Loading please wait... </div>}
      <div className="min-h-screen flex flex-wrap content-between bg-gray-600/80">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
        <div className="w-full block">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
