import React, { useCallback, useEffect, useState } from "react";
import classes from "./Main.module.scss";
import IconDollar from "../../images/icon-dollar.svg";
import IconPerson from "../../images/icon-person.svg";

const Main = () => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [amountIsInValid, setAmountIsInValid] = useState(false);
  const [enteredPourcent, setEnteredPourcent] = useState("");
  const [pourcentIsInValid, setPourcentIsInValid] = useState(false);
  const [chosenPourcent, setChosenPourcent] = useState(null);
  const [enteredPeople, setEnteredPeople] = useState("");
  const [peopleIsInValid, setPeopleIsInValid] = useState(false);
  const [tipResult, setTipResult] = useState(null);
  const [totalResult, setTotalResult] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const amountChangeHandler = (e) => {
    if (e.target.value === "" || isNaN(e.target.value)) {
      setAmountIsInValid(true);
    } else {
      setAmountIsInValid(false);
    }
    setEnteredAmount(e.target.value);
    console.log(e.target.value);
    console.log(enteredAmount);
    // calculateTipHandler();
  };
  const peopleChangeHandler = (e) => {
    if (e.target.value === "" || isNaN(e.target.value)) {
      setPeopleIsInValid(true);
    } else {
      setPeopleIsInValid(false);
    }
    setEnteredPeople(e.target.value);
    // calculateTipHandler();
  };
  const pourcentChangeHandler = (e) => {
    if (isNaN(e.target.value)) {
      setPourcentIsInValid(true);
    } else {
      setPourcentIsInValid(false);
    }
    setChosenPourcent(null);
    setEnteredPourcent(e.target.value);
    // calculateTipHandler();
  };
  const fivePourcentHandler = (e) => {
    e.preventDefault();
    setChosenPourcent(5);
    setEnteredPourcent("");
    // calculateTipHandler();
  };
  const tenPourcentHandler = (e) => {
    e.preventDefault();
    setChosenPourcent(10);
    setEnteredPourcent("");
    // calculateTipHandler();
  };
  const fifteenPourcentHandler = (e) => {
    e.preventDefault();
    console.log("Chosen Pourcent: ", chosenPourcent);
    setChosenPourcent(15);
    setEnteredPourcent("");
    // calculateTipHandler();
  };
  const twentyFivePourcentHandler = (e) => {
    e.preventDefault();
    setChosenPourcent(25);
    setEnteredPourcent("");
    // calculateTipHandler();
  };
  const fiftyPourcentHandler = (e) => {
    e.preventDefault();
    setChosenPourcent(50);
    setEnteredPourcent("");
    // calculateTipHandler();
  };
  const calculateTipHandler = useCallback(() => {
    console.log("Entered Pourcent: ", enteredPourcent);
    console.log("Entered Amount: ", enteredAmount);
    console.log("Entered People: ", enteredPeople);
    if (
      amountIsInValid ||
      enteredAmount === "" ||
      peopleIsInValid ||
      enteredPeople === "" ||
      pourcentIsInValid ||
      (enteredPourcent === "" && chosenPourcent === null)
    ) {
      return;
    }

    const pourcent =
      chosenPourcent === null ? +enteredPourcent : chosenPourcent;
    const tip = (enteredAmount * pourcent) / 100 / enteredPeople;
    const total = (enteredAmount * (100 + pourcent)) / 100 / enteredPeople;
    setTipResult(tip.toFixed(2));
    setTotalResult(total.toFixed(2));
    setIsDisabled(false);
  }, [
    amountIsInValid,
    chosenPourcent,
    enteredAmount,
    enteredPeople,
    enteredPourcent,
    peopleIsInValid,
  ]);
  useEffect(() => {
    calculateTipHandler();
  }, [calculateTipHandler]);
  const resetHandler = () => {
    setEnteredAmount("");
    setAmountIsInValid(false);
    setEnteredPourcent("");
    setPourcentIsInValid(false);
    setChosenPourcent(null);
    setEnteredPeople("");
    setPeopleIsInValid(false);
    setTipResult(null);
    setTotalResult(null);
    setIsDisabled(true);
  };
  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <label className={classes.form__label}>Bill</label>
        <div className={classes.form__group}>
          <img
            src={IconDollar}
            alt="Icon of a dollar"
            className={classes.form__icon}
          />
          <input
            className={`${classes.form__input} ${classes["mb-small"]} ${
              amountIsInValid ? classes.form__error : "`"
            }`}
            placeholder="0"
            dir="rtl"
            value={enteredAmount}
            onChange={amountChangeHandler}
            onBlur={amountChangeHandler}
          />
          {amountIsInValid && enteredAmount === "" && (
            <p className={classes["form__error--text"]}>Can't be zero</p>
          )}
          {amountIsInValid && enteredAmount && enteredAmount !== "" && (
            <p className={classes["form__error--text"]}>Must be a number</p>
          )}
        </div>
        <label className={classes.form__label}>Select Tip %</label>
        <div className={`${classes.form__selection} ${classes["mb-small"]}`}>
          <button
            className={`${classes.form__button} ${
              chosenPourcent === 5 ? classes.active : ""
            }`}
            onClick={fivePourcentHandler}
          >
            5%
          </button>
          <button
            className={`${classes.form__button} ${
              chosenPourcent === 10 ? classes.active : ""
            }`}
            onClick={tenPourcentHandler}
          >
            10%
          </button>
          <button
            className={`${classes.form__button} ${
              chosenPourcent === 15 ? classes.active : ""
            }`}
            onClick={fifteenPourcentHandler}
          >
            15%
          </button>
          <button
            className={`${classes.form__button} ${
              chosenPourcent === 25 ? classes.active : ""
            }`}
            onClick={twentyFivePourcentHandler}
          >
            25%
          </button>
          <button
            className={`${classes.form__button} ${
              chosenPourcent === 50 ? classes.active : ""
            }`}
            onClick={fiftyPourcentHandler}
          >
            50%
          </button>
          <input
            className={`${classes.form__input} ${
              classes["form__input--small"]
            } ${pourcentIsInValid ? classes.form__error : ""}`}
            placeholder="Custom"
            dir="rtl"
            value={enteredPourcent}
            onChange={pourcentChangeHandler}
          />
        </div>
        <label className={classes.form__label}>Number of People</label>
        <div className={classes.form__group}>
          <img
            src={IconPerson}
            alt="Icon of a person"
            className={classes.form__icon}
          />
          <input
            className={`${classes.form__input} ${
              peopleIsInValid ? classes.form__error : ""
            }`}
            placeholder="0"
            dir="rtl"
            value={enteredPeople}
            onChange={peopleChangeHandler}
            onBlur={peopleChangeHandler}
          />
          {peopleIsInValid && enteredPeople === "" && (
            <p className={classes["form__error--text"]}>Can't be zero</p>
          )}
          {(peopleIsInValid && enteredPeople !== "") ||
            (pourcentIsInValid && (
              <p className={classes["form__error--text"]}>Must be a number</p>
            ))}
        </div>
      </form>
      <div className={classes.result}>
        <div>
          <div className={classes.result__row}>
            <div className={classes.result__column}>
              <p className={classes.result__text}>Tip Amount</p>
              <p className={classes.result__subtext}>/ person</p>
            </div>
            <p className={classes.result__amount}>
              ${tipResult === null ? "0.00" : tipResult}
            </p>
          </div>
          <div className={classes.result__row}>
            <div className={classes.result__column}>
              <p className={classes.result__text}>Total</p>
              <p className={classes.result__subtext}>/ person</p>
            </div>
            <p className={classes.result__amount}>
              ${totalResult === null ? "0.00" : totalResult}
            </p>
          </div>
        </div>
        <button
          className={classes.result__button}
          disabled={isDisabled}
          onClick={resetHandler}
        >
          Reset
        </button>
      </div>
    </main>
  );
};

export default Main;
