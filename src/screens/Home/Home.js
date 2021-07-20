import React from 'react'
import Navbar from '../../components/Navbar'
import { Flash } from '../../components/Flash/flash'
import { useMediaQuery } from "react-responsive";
import { MdHome } from "react-icons/md";
import { MdLink } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdShare } from "react-icons/md";

const Home = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  let main = {};
  let grow = {};
  let big = {};
  let shortlinks = {};
  let icon = {};
  let p = {};

  if (isDesktop) {
    main = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    };

    grow = {
      width: "100%",
    };

    big = {
      fontSize: "75px",
      textAlign: "left",
    };

    shortlinks = {
      display: "flex",
    };

    icon = {
      width: "32",
      height: "32",
    };

    p = {
      fontSize: "1rem",
    };
  }
  return (
    <>
      <Navbar />
      <Flash />
      <main>
        <div className="home_main-content">

          <div className="heading_n_form-layout">

            <div className="heading-area">
            <h1 className="lg-heading">Shorten Links Using Your Own Domain</h1>
            </div>

            <div className="form-area">
              <form className="link-form">
                <div className="input-group">
                  <label>TITLE: Behance Link</label>
                <input
                type="text"
                className="input-link"
                placeholder="Input link"
              />
                </div>
              <div className="buttons-container">
              <button className="save-btn">Save</button>
              <button className="delete-btn">Delete</button>
            </div>
              </form>
            </div>
       
          </div>


          <div className="green-nav">
            <div className="short-links" style={shortlinks}>
              SHORTLINKS
            </div>

            <div>
              <a href="#">
                <div className="green-item">
                  <MdHome className="icon" style={icon} />
                  <p style={p}>DASHBOARD</p>
                </div>
              </a>
            </div>

            <div>
              <a href="#">
                <div className="green-item">
                  <MdLink className="icon" style={icon} />
                  <p style={p}>MY URLS</p>
                </div>
              </a>
            </div>

            <div>
              <a href="#">
                <div className="green-item">
                  <MdEdit className="icon" style={icon} />
                  <p style={p}>EDIT</p>
                </div>
              </a>
            </div>

            <div>
              <a href="#">
                <div className="green-item">
                  <MdShare className="icon" style={icon} />
                  <p style={p}>SHARE</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}

export default Home
