import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./RadioButton.module.css";

export type RadioButtonProps = PropsWithChildren<
  {} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>;

export function RadioButton({ children, ...props }: RadioButtonProps) {
  return (
    <label
      className={classNames(styles.RadioLabel, props.checked && styles.Checked)}
    >
      {children}

      <input {...props} type="radio" className={styles.RadioInput} />
    </label>
  );
}
