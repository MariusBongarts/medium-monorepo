/*
design: https://dribbble.com/shots/7259090-Password-Validation
design by Neven Solidov.
*/

import React, { useEffect, useState } from "react";
import "./PasswordStrength.css";
import {
  validatePassword,
  ValidationResult,
} from "@mariusbongarts/medium-monorepo-shared";

const bg =
  "https://raw.githubusercontent.com/erenesto/interactive-password-validator/d4344fd1a7620393a18d18a17ffb9dcf95f6887f/src/assets/bg.svg";

const lockIcon = {
  open: "0h-3v2h4a2",
  closed: "0v2h1a2",
};

export const PasswordStrength = () => {
  const [lock, setLock] = useState(lockIcon.open);
  const [isLocked, setIsLocked] = useState(false);
  const [validationResults, setValidationResults] = useState<
    ValidationResult[]
  >(validatePassword(""));

  const handleChange = (e: any) => {
    updateValidationResults(e.target.value.trim());
  };

  const updateValidationResults = (value: string) => {
    const validationResults = validatePassword(value);
    setValidationResults(validationResults);
  };

  useEffect(() => {
    const allRulesAreValid = validationResults
      .map((result) => result.valid)
      .reduce((valid1, valid2) => valid1 && valid2);

    setIsLocked(allRulesAreValid);
  }, [validationResults]);

  useEffect(() => {
    if (isLocked) {
      const timeout = setTimeout(() => {
        setLock(lockIcon.closed);
      }, 700);
      return () => clearTimeout(timeout);
    } else {
      setLock(lockIcon.open);
    }
  }, [isLocked]);

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="form-box">
        <ValidationItems validationResults={validationResults} />
        <FormField
          lock={lock}
          handleChange={handleChange}
          isLocked={isLocked}
        />
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

const FormField = ({ lock, handleChange, isLocked }: any) => {
  return (
    <div className="form-field">
      <input
        className="form-input"
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
