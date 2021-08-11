export interface ValidationRule {
  id: string;
  name: string;
  check: (value: string) => boolean;
}

export type ValidationResult = Omit<ValidationRule, "check"> & {
  valid: boolean;
};

export const validationRules: ValidationRule[] = [
  {
    id: "lowercase",
    name: "Lower-case",
    check: (value: string) => /[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value),
  },
  {
    id: "uppercase",
    name: "Upper-case",
    check: (value: string) => /[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value),
  },
  {
    id: "number",
    name: "Number",
    check: (value: string) => /[0-9]/.test(value),
  },
  {
    id: "minChar",
    name: "More than 7 characters",
    check: (value: string) => value.length >= 8,
  },
];

function ruleToResultMapper(
  rule: ValidationRule,
  password: string
): ValidationResult {
  return { ...rule, valid: rule.check(password) };
}

export function validatePassword(password: string): ValidationResult[] {
  return validationRules.map((rule) => ruleToResultMapper(rule, password));
}

export function allRulesAreValid(validationResults: ValidationResult[]) {
  return validationResults
    .map((result) => result.valid)
    .reduce((valid1, valid2) => valid1 && valid2);
}
