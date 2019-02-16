import { schema } from "normalizr";

export const choiceSchema = new schema.Entity(
  "choices",
  {},
  { idAttribute: "uuid" }
);
export const choiceConditionSchema = new schema.Entity(
  "choice_conditions",
  {},
  { idAttribute: "uuid" }
);
export const questionScehma = new schema.Entity(
  "questions",
  {
    choices: [choiceSchema],
    choice_conditions: [choiceConditionSchema]
  },
  { idAttribute: "uuid" }
);
export const groupSchema = new schema.Entity(
  "groups",
  {},
  { idAttribute: "uuid" }
);
export const surveySchema = new schema.Entity(
  "surveys",
  {
    groups: [groupSchema],
    questions: [questionScehma]
  },
  { idAttribute: "uuid" }
);
export const surveyListSchema = [surveySchema];

const responseSchema = new schema.Entity(
  "responses",
  {},
  { idAttribute: "uuid" }
);
export const responseListSchema = [responseSchema];
export const languageSchema = new schema.Entity(
  "languages",
  {},
  { idAttribute: "code" }
);
export const languageListSchema = [languageSchema];
export const companySchema = new schema.Entity(
  "companies",
  {},
  { idAttribute: "uuid" }
);
export const companyListSchema = [companySchema];
export const profileSchema = new schema.Entity(
  "profiles",
  {},
  { idAttribute: "uuid" }
);
export const profileListSchema = [profileSchema];
const currencySchema = new schema.Entity(
  "currencies",
  {},
  { idAttribute: "uuid" }
);
export const currencyListSchema = [currencySchema];
const permissionSchema = new schema.Entity(
  "permissions",
  {},
  { idAttribute: "codename" }
);
export const permissionListSchema = [permissionSchema];
