import React from "react";
import Radio from "material-ui/Radio";
import { FormControlLabel } from "material-ui/Form";
import { valFromLangObj } from "../utils";

function AnswerChooseOne({ choice, textFormat }) {
  const value = valFromLangObj(choice.text);
  if (textFormat) {
    return value;
  }
  return (
    <FormControlLabel
      control={<Radio checked={true} disabled={true} />}
      label={value}
    />
  );
}

export default AnswerChooseOne;
