import { ERROR, PossibleErrorCodes } from "./errorCodes";

export const errorMessage: { [key in ERROR]: string } = {
  FORBIDDEN: "Час сесії сплив. Авторизуйтеся будь ласка.",
  UNAUTHORIZED: "Час сесії сплив. Авторизуйтеся будь ласка.",
  INCORRECT_LOGIN_OR_PASSWORD: "Невірний логін або пароль.",
  UNDEFINED: "Невизначена помилка.",
  USER_WITH_SAME_LOGIN_IS_EXISTING:
    "На даний момент в системі вже є користувач з таким логіном. Будь ласка придумайте інший!",
  HAVE_NO_PERMISSIONS: "У вас недостатньо прав для виконання цієї дії.",

  // FRONT_END_ERRORS
  AREA_CREATION_ERROR: "Для створення області спочатку треба вибрати країну",
  DISTRICT_CREATION_ERROR:
    "Для створення району спочатку треба вибрати область",
  POPULATED_AREA_CREATION_ERROR:
    "Для створення міста обо населеного пункту спочатку треба вибрати район",
  LOCATION_IN_POPULATED_AREA_CREATION_ERROR:
    "Для створення місцезнаходження спочатку треба вибрати місто або населений пункт",
  ADDRESS_NUMBER_CREATION_ERROR:
    "Для створення номеру будівлі спочатку треба вибрати місцезнаходження",
};

export const getErrorDescription = (
  currentErrorMessage?: PossibleErrorCodes
): string | null => {
  return currentErrorMessage ? errorMessage[currentErrorMessage] : null;
};

export const getErrorCodeByError = (e: unknown): PossibleErrorCodes => {
  if (e instanceof Error && e.message in ERROR) {
    return e.message as PossibleErrorCodes;
  }

  return ERROR.UNDEFINED;
};
