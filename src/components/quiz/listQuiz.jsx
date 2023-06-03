import { useState, useEffect, useRef, useCallback } from "react";
import "./listQuiz.scss";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ShowModalComplited from "./modal/showModal";
import LoadingScreen from "../loading/loading";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [required, setRequired] = useState(false);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [resetQuiz, setResetQuiz] = useState(false);
  const [showModalEndQuiz, setShowModalEndQuiz] = useState(false);
  const quizElapsedTimeRef = useRef(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [checkIncorrect, setCheckIncorrect] = useState(false);
  const [showTableResult, setShowTableResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const navigate = useNavigate();
  const handleCloseConfirm = () => setShowConfirm(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.results.map((question) => {
          const answers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];

          const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
          return {
            ...question,
            incorrect_answers: shuffledAnswers,
          };
        });
        setDataQuiz(updatedData);
        setCurrentQuestion(0);
        setSelectedOption("");
        setScore(0);
        setDataLoaded(true);
        setUserAnswers([]);
        quizElapsedTimeRef.current = 0;
      });
  }, [resetQuiz]);

  useEffect(() => {
    if (dataLoaded && !quizEnded) {
      const interval = setInterval(() => {
        quizElapsedTimeRef.current += 1;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [quizEnded, dataLoaded]);

  const handleOptionChange = (event) => {
    setRequired(false);
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption) {
      setShowConfirm(true);
    } else {
      setRequired(true);
    }
  };
  const handleConfirmAnswer = () => {
    const correctAnswer = currentQuestionData.correct_answer;
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers.push({
      question: currentQuestionData.question,
      userAnswer: selectedOption,
      correctAnswer: correctAnswer,
    });
    if (selectedOption === correctAnswer) {
      setCheckIncorrect(true);
      setScore(score + 1);
    } else {
      setCheckIncorrect(false);
    }
    setUserAnswers(updatedUserAnswers);
    setCheckAnswer(true);
  };
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption("");
    setShowConfirm(false);
    setCheckAnswer(false);
    if (currentQuestion + 1 === dataQuiz.length) {
      setShowModalEndQuiz(true);
    }
  };

  if (dataQuiz.length === 0) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
  const currentQuestionData = dataQuiz[currentQuestion];

  const handleRenderAnswer = () => {
    if (
      currentQuestionData &&
      currentQuestionData.incorrect_answers.length > 0
    ) {
      return (
        <div className="quiz-container">
          <h3>
            Question {currentQuestion + 1}/{dataQuiz.length}
          </h3>
          <form className="form-quiz" onSubmit={handleSubmit}>
            <h3>{currentQuestionData.question}</h3>
            {currentQuestionData.incorrect_answers.map((answer, index) => {
              return (
                <div
                  onClick={() =>
                    handleOptionChange({ target: { value: answer } })
                  }
                  key={index}
                  className={`input-form ${
                    selectedOption === answer ? "selected" : ""
                  }`}
                >
                  <label htmlFor={`option${index + 1}`}>{answer}</label>
                  <input
                    type="radio"
                    id={`option${index + 1}`}
                    value={answer}
                    checked={selectedOption === answer}
                    onChange={handleOptionChange}
                  />
                </div>
              );
            })}
            {required && (
              <p className="required">
                You must answer the question to move on to the next question !!
              </p>
            )}
            <div className="btn-submit">
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return <LoadingScreen />;
    }
  };

  return (
    <>
      <button className="back-home" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
      {handleRenderAnswer()}
      {showModalEndQuiz && (
        <ShowModalComplited
          backdrop="static"
          quizElapsedTime={quizElapsedTimeRef.current}
          score={score}
          dataQuiz={dataQuiz}
          resetQuiz={resetQuiz}
          setResetQuiz={setResetQuiz}
          setQuizEnded={setQuizEnded}
          setShowModalEndQuiz={setShowModalEndQuiz}
          setShowTableResult={setShowTableResult}
        />
      )}
      <Modal
        backdrop="static"
        className="modal-container"
        centered
        show={showConfirm}
        onHide={handleCloseConfirm}
      >
        {!checkAnswer ? (
          <>
            <Modal.Body>
              <h4>Are you sure you want to choose this answer?</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirm}>
                Close
              </Button>

              <Button variant="primary" onClick={handleConfirmAnswer}>
                Sure!
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Body>
              {checkIncorrect ? (
                <h4>Correct answer!!</h4>
              ) : (
                <>
                  <h4>The answer is not correct</h4>
                  <p>
                    The correct answer is:
                    <strong> {currentQuestionData.correct_answer}</strong>
                  </p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleNextQuestion}>
                Next question
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <Modal backdrop="static" size="xl" show={showTableResult}>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th scope="col">Question</th>
                <th scope="col">Your answer</th>
                <th scope="col">Correct answer</th>
              </tr>
            </thead>
            <tbody>
              {userAnswers.map((answer, index) => (
                <tr key={index}>
                  <td>{answer.question}</td>
                  <td>{answer.userAnswer}</td>
                  <td>{answer.correctAnswer}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go home
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ListQuiz;
