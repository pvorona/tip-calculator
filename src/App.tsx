import React, { useRef, useState } from "react";
import styles from "./App.module.css";
import classNames from "classnames";
import DollarIcon from "./icon-dollar.svg";
import PersonIcon from "./icon-person.svg";
import LogoIcon from "./logo.svg";
import { RadioButton } from "./RadioButton";

const Defaults = {
  BillAmount: 0,
  NumberOfPeople: 3,
  TipPercent: 10,
  CustomTipPercent: -1,
};

const Ids = {
  Bill: "bill",
  NumberOfPeople: "NumberOfPeople",
};

function selectContent(event: React.FocusEvent<HTMLInputElement, Element>) {
  event.target.select();
}

function App() {
  const [billAmount, setBillAmount] = useState(Defaults.BillAmount);
  const [numberOfPeople, setNumberOfPeople] = useState(Defaults.NumberOfPeople);
  const [fixedTipPercent, setFixedTipPercent] = useState(Defaults.TipPercent);
  const [customTipPercent, setCustomTipPercent] = useState(
    Defaults.CustomTipPercent
  );
  const billRef = useRef<HTMLInputElement>(null);

  function reset() {
    setBillAmount(Defaults.BillAmount);
    setNumberOfPeople(Defaults.NumberOfPeople);
    setFixedTipPercent(Defaults.TipPercent);
    setCustomTipPercent(Defaults.CustomTipPercent);
    billRef.current?.select();
  }

  const isBillAmountValid = billAmount >= 0;
  const isNumberOfPeopleValid =
    numberOfPeople > 0 && Number.isInteger(numberOfPeople);
  const tipPercent =
    customTipPercent === Defaults.CustomTipPercent
      ? fixedTipPercent
      : customTipPercent;
  const isValid = isBillAmountValid && isNumberOfPeopleValid;
  const billPerPerson = isValid
    ? ((billAmount * (1 + tipPercent / 100)) / numberOfPeople).toFixed(2)
    : "N/A";
  const tipPerPerson = isValid
    ? ((billAmount * (tipPercent / 100)) / numberOfPeople).toFixed(2)
    : "N/A";

  return (
    <>
      <div className={styles.LogoContainer}>
        <img src={LogoIcon} alt="" className={styles.Logo} />
      </div>
      <div className={styles.Container}>
        <div className={styles.Controls}>
          <div className={styles.Row}>
            <label
              className={styles.Label}
              htmlFor={Ids.Bill}
              style={{ marginTop: 0 }}
            >
              Bill
            </label>
            {!isBillAmountValid && (
              <div className={classNames(styles.Label, styles.Invalid)}>
                Invalid
              </div>
            )}
          </div>

          <div className={styles.InputContainer}>
            <img src={DollarIcon} className={styles.InputIcon} alt="" />
            <input
              autoFocus
              className={classNames(
                styles.Input,
                styles.WithIcon,
                !isBillAmountValid && styles.Invalid
              )}
              type="number"
              id={Ids.Bill}
              ref={billRef}
              min={0}
              value={billAmount}
              onChange={(e) => {
                setBillAmount(Number(e.target.value));
              }}
              onFocus={selectContent}
            />
          </div>

          <div className={styles.Label}>Select Tip %</div>

          <div className={styles.TipBlock}>
            <RadioButton
              checked={
                customTipPercent === Defaults.CustomTipPercent &&
                fixedTipPercent === 5
              }
              onChange={() => {
                setFixedTipPercent(5);
                setCustomTipPercent(Defaults.CustomTipPercent);
              }}
            >
              5%
            </RadioButton>
            <RadioButton
              checked={
                customTipPercent === Defaults.CustomTipPercent &&
                fixedTipPercent === 10
              }
              onChange={() => {
                setFixedTipPercent(10);
                setCustomTipPercent(Defaults.CustomTipPercent);
              }}
            >
              10%
            </RadioButton>
            <RadioButton
              checked={
                customTipPercent === Defaults.CustomTipPercent &&
                fixedTipPercent === 15
              }
              onChange={() => {
                setFixedTipPercent(15);
                setCustomTipPercent(Defaults.CustomTipPercent);
              }}
            >
              15%
            </RadioButton>
            <RadioButton
              checked={
                customTipPercent === Defaults.CustomTipPercent &&
                fixedTipPercent === 25
              }
              onChange={() => {
                setFixedTipPercent(25);
                setCustomTipPercent(Defaults.CustomTipPercent);
              }}
            >
              25%
            </RadioButton>
            <RadioButton
              checked={
                customTipPercent === Defaults.CustomTipPercent &&
                fixedTipPercent === 50
              }
              onChange={() => {
                setFixedTipPercent(50);
                setCustomTipPercent(Defaults.CustomTipPercent);
              }}
            >
              50%
            </RadioButton>

            <input
              placeholder="Custom"
              type="number"
              className={styles.Input}
              value={
                customTipPercent === Defaults.CustomTipPercent
                  ? ""
                  : customTipPercent
              }
              onChange={(e) =>
                setCustomTipPercent(Math.abs(Number(e.target.value)))
              }
              onFocus={selectContent}
            />
          </div>

          <div className={styles.Row}>
            <label className={styles.Label} htmlFor={Ids.NumberOfPeople}>
              Number of People
            </label>
            {!isNumberOfPeopleValid && (
              <div className={classNames(styles.Label, styles.Invalid)}>
                Invalid
              </div>
            )}
          </div>
          <div className={styles.InputContainer}>
            <img src={PersonIcon} className={styles.InputIcon} alt="" />
            <input
              className={classNames(
                styles.Input,
                styles.WithIcon,
                !isNumberOfPeopleValid && styles.Invalid
              )}
              id={Ids.NumberOfPeople}
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              onFocus={selectContent}
              min={1}
            />
          </div>
        </div>

        <div className={styles.Result}>
          <div className={styles.Row}>
            <div>
              <div className={styles.SmallLabel}>Tip amount</div>
              <div className={styles.MutedLabel}>/ person</div>
            </div>

            <div className={styles.Value}>${tipPerPerson}</div>
          </div>

          <div className={styles.Row}>
            <div>
              <div className={styles.SmallLabel}>Total</div>
              <div className={styles.MutedLabel}>/ person</div>
            </div>

            <div className={styles.Value}>${billPerPerson}</div>
          </div>

          <button className={styles.Reset} onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
