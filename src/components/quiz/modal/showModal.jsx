import Modal from "react-bootstrap/Modal";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./showModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrownOpen,
  faFaceLaughSquint,
} from "@fortawesome/free-solid-svg-icons";

const showModalComplited = ({
  score,
  dataQuiz,
  setResetQuiz,
  resetQuiz,
  quizElapsedTime,
  setShowModalEndQuiz,
  setShowTableResult,
}) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    setResetQuiz(!resetQuiz);
    setShowModalEndQuiz(false);
  };
  const handleShowTable = () => {
    setShowTableResult(true);
    setShowModalEndQuiz(false);
  };

  if (score > dataQuiz.length / 2) {
    return (
      <>
        <Modal className="modal-container" show={true} centered>
          <Modal.Body>
            <div style={{ width: "100%" }}>
              <button onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHouse} />
              </button>
            </div>
            <h3>Congratulations!!</h3>
            <FontAwesomeIcon
              style={{ color: "#86bb34", fontSize: "60px" }}
              icon={faFaceLaughSquint}
            />
            <p>You are amazing!!</p>
            <p>
              {score}/{dataQuiz.length} correct answers in {quizElapsedTime}{" "}
              seconds.
            </p>
            <div className="btn-ground">
              <button
                onClick={handleShowTable}
                style={{ backgroundColor: "#46794b" }}
                className="play-again"
              >
                Review Results{" "}
              </button>
              <button className="play-again" onClick={handlePlayAgain}>
                Play Again
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal className="modal-container" show={true} centered>
          <Modal.Body>
            <div style={{ width: "100%" }}>
              <button onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHouse} />
              </button>
            </div>

            <h3>Completed!!</h3>
            <FontAwesomeIcon
              style={{ color: "#8c44ac", fontSize: "60px" }}
              icon={faFaceFrownOpen}
            />

            <p>Better luck next time!!</p>
            <p>
              {score}/{dataQuiz.length} correct answers in {quizElapsedTime}{" "}
              seconds.
            </p>
            <div className="btn-ground">
              <button
                style={{ backgroundColor: "#46794b" }}
                onClick={handleShowTable}
                className="play-again"
              >
                Review Results{" "}
              </button>
              <button className="play-again" onClick={handlePlayAgain}>
                Play Again
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
};
export default showModalComplited;
