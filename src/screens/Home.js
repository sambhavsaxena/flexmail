import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import Mail from "./Mail";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import GitHubButton from "react-github-btn";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";
import { FaCheckCircle } from 'react-icons/fa';

toast.configure();

const Home = () => {
  const [domains, setDomains] = useState([]);
  const [identifier, setIdentifier] = useState("");
  const [domain, setDomain] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const divRef = useRef(null);

  const handleCopy = () => {
    if (divRef.current) {
      navigator.clipboard.writeText(divRef.current.textContent)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  const handleKeyDown = (ev) => {
    //Send on enter:
    if (ev.keyCode === 13) {
      if (!!identifier && !identifier.includes(" ")) {
        fetch();
      } else {
        toast.error(`Invalid identifier`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://www.1secmail.com/api/v1/?action=getDomainList")
      .then((res) => {
        setDomains(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const changed = (ev) => {
    setIdentifier(document.getElementById("identifier").value);
    setDomain(document.getElementById("domain").value);
  };
  const fetch = () => {
    setIdentifier(document.getElementById("identifier").value);
    setDomain(document.getElementById("domain").value);
    axios
      .get(
        `https://www.1secmail.com/api/v1/?action=getMessages&login=${identifier}&domain=${domain}`
      )
      .then((res) => {
        setData(res.data);
        const dataf = JSON.stringify(res.data);
        if (dataf === "[]") {
          toast.error(`No new mails!`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast(`Loading new mails`, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {
        <div style={{ minHeight: "92vh" }}>
          <div
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "80px",
              flexDirection: "column",
            }}
          >
            <h3>Flexmail</h3>
            <h5>A customizable temporary email generator</h5>
            <div style={{ marginBottom: "80px", marginTop: "10px" }}>
              <GitHubButton
                href="https://github.com/sambhavsaxena/flexmail"
                data-icon="octicon-star"
                data-show-count="true"
                aria-label="Star sambhavsaxena/flexmail on GitHub"
              >
                Star
              </GitHubButton>{" "}
              <GitHubButton
                href="https://github.com/sambhavsaxena/flexmail/fork"
                data-icon="octicon-repo-forked"
                data-show-count="true"
                aria-label="Fork sambhavsaxena/flexmail on GitHub"
              >
                Fork
              </GitHubButton>
            </div>
            <div className="text-center">
              Enter your identifier and select your domain to fetch mails.
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "60px",
              }}
            >
              <div
                className="div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Row onChange={changed} className="g-2 mx-2">
                  <Col md>
                    <FloatingLabel label="Identifier">
                      <Form.Control
                        type="text"
                        id="identifier"
                        placeholder="Specify your identifier"
                        autoFocus
                        maxLength={"25"}
                        onKeyDown={handleKeyDown}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel label="Domain">
                      <Form.Select
                        id="domain"
                        aria-label="Floating label select example"
                      >
                        {domains.map((domain, index) => {
                          return <option key={index}>{domain}</option>;
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
                {identifier && !identifier.includes(" ") ? (
                  <Button
                    className="btn"
                    onClick={fetch}
                    variant="outline-dark"
                  >
                    Refresh
                  </Button>
                ) : (
                  <Button
                    className="btn"
                    onClick={fetch}
                    variant="outline-dark"
                    disabled
                  >
                    Refresh
                  </Button>
                )}
              </div>
            </div>
          )}
          <div
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
            {identifier && !identifier.includes(" ") && (
              <p style={{ margin: "10px", overflow: "auto", display: "flex", flexDirection: "row" }}>
                Your temporary email is:
                <div ref={divRef} onClick={handleCopy} style={{ cursor: 'pointer', paddingLeft: "5px"}}>
                {identifier}@{domain}
                {isCopied && 
                  <FaCheckCircle style={{ color: 'green', marginLeft: '10px' }} />
                }
                </div>
              </p>
            )}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              Total count: {data.length}
            </div>
          </div>
          <div>
            {data &&
              data.map((data) => (
                <Mail
                  key={data.id}
                  identifier={identifier}
                  domain={domain}
                  id={data.id}
                />
              ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Home;
