/*
design: https://dribbble.com/shots/7259090-Password-Validation
design by Neven Solidov.
*/

import { useEffect, useState } from "react";
import "./PasswordStrength.css";
import {
  validatePassword,
  ValidationResult,
  allRulesAreValid,
} from "@mariusbongarts/medium-monorepo-shared";
import { passwordService } from "../services/password-service";
import { LoadingSpinner } from "./LoadingSpinner";

const lockIcon = {
  open: "0h-3v2h4a2",
  closed: "0v2h1a2",
};

const ANIMATION_TIMEOUT_MILLIS = 700;

export const PasswordStrength = () => {
  const [lock, setLock] = useState(lockIcon.open);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [validationResults, setValidationResults] = useState<
    ValidationResult[]
  >(validatePassword(password));
  const [serverValidationResults, setServerValidationResults] =
    useState<ValidationResult[]>();

  const handleChange = (e: any) => {
    setPassword(e.target.value.trim());
  };

  useEffect(() => {
    const buttonElement = document.querySelector(".submit-btn");
    buttonElement?.addEventListener("click", async () => {
      await submit();
    });
  }, []);

  useEffect(() => {
    updateValidationResults(password);
  }, [password]);

  const updateValidationResults = (value: string) => {
    const validationResults = validatePassword(value);
    setValidationResults(validationResults);
  };

  useEffect(() => {
    setIsLocked(allRulesAreValid(validationResults));
  }, [validationResults]);

  const submit = async () => {
    setServerValidationResults(undefined);
    setLoading(true);
    const validationResults = await passwordService.checkPassword(password);
    // Add a timeout for some loading animation
    setTimeout(() => {
      setLoading(false);
      setServerValidationResults(validationResults);
    }, ANIMATION_TIMEOUT_MILLIS);
  };

  useEffect(() => {
    if (isLocked) {
      const timeout = setTimeout(() => {
        setLock(lockIcon.closed);
      }, ANIMATION_TIMEOUT_MILLIS);
      return () => clearTimeout(timeout);
    } else {
      setServerValidationResults(undefined);
      setLock(lockIcon.open);
    }
  }, [isLocked]);

  return (
    <div className="App">
      <div className="form-box">
        <ValidationItems validationResults={validationResults} />
        <FormField
          lock={lock}
          handleChange={handleChange}
          isLocked={isLocked}
          value={password}
        />
        <button className="submit-btn" disabled={!isLocked} onClick={submit}>
          Submit
        </button>
        {loading && (
          <div className="validation-box loading-spinner-wrapper">
            <LoadingSpinner />
          </div>
        )}
        {serverValidationResults && (
          <ValidationItems validationResults={serverValidationResults} />
        )}
      </div>
      <a
        className="github-button"
        href="https://github.com/erenesto/interactive-password-validator"
        target="_blank"
        rel="noreferrer"
      >
        ★ on Github
      </a>
    </div>
  );
};

interface ValidationIconProps {
  isDone: boolean;
}

const ValidationIcon = ({ isDone }: ValidationIconProps) => {
  return isDone ? (
    <svg width="14" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        className="check"
        points="1,7 5,11 13,1"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2px"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6A6 6 0 110 6a6 6 0 0112 0z" fill="#5B9A78" />
    </svg>
  );
};

const ValidationItems = ({
  validationResults,
}: {
  validationResults: ValidationResult[];
}) => (
  <ul className="validation-box">
    {validationResults.map((item) => (
      <li
        className={item.valid ? `done validation-item` : "validation-item"}
        key={item.id}
      >
        <span className="validation-icon">
          <ValidationIcon isDone={item.valid} />
        </span>
        {item.name}
      </li>
    ))}
  </ul>
);

const FormField = ({ lock, handleChange, isLocked, value }: any) => {
  return (
    <div className="form-field">
      <input
        className={`form-input ${value?.length ? "filled" : ""}`}
        id="password"
        type="password"
        onChange={handleChange}
      />
      <label className="form-label" htmlFor="password">
        Password
      </label>
      <div className="form-input-lock">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`lock-icon ${isLocked && `locked`}`}
          width="20"
          height="20"
        >
          <path
            d={`M4 8V6a6 6 0 1112 ${lock} 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 10-2.009-.005L9 14.73zM7 6v2h6V6a3 3 0 10-6 0z`}
          />
        </svg>
      </div>
    </div>
  );
};
