import React from "react";
import Typography from "material-ui/Typography";
import Input from "material-ui/Input";
import _isObject from "lodash/isObject";
import { valFromLangObj } from "../utils";
import AnswerMap from "./AnswerMap";
import AnswerChooseOneContainer from "../containers/AnswerChooseOneContainer";
import AnswerChooseManyContainer from "../containers/AnswerChooseManyContainer";

function AnswerText({ value: valueProp, textFormat }) {
  const value = _isObject(valueProp) ? valFromLangObj(valueProp) : valueProp;
  if (textFormat) {
    return value;
  }
  return <Input disabled={true} value={value} />;
}

function AnswerCurrency({ value, textFormat }) {
  const answerVal = `${value.currency} ${value.amount}`;
  if (textFormat) return answerVal;
  return <Input disabled={true} value={answerVal} />;
}

function AnswerImage({ imgFile }) {
  const BASE_URL = "http://collect.ahadootec.info";
  return <img src={`${BASE_URL}${imgFile}`} alt="Image answer" />;
}

function AnswerValue({ question, value, textFormat = false }) {
  switch (question.type) {
    case "text":
    case "number":
    case "number-range":
      return <AnswerText textFormat={textFormat} value={value} />;
    case "currency":
      return <AnswerCurrency textFormat={textFormat} value={value} />;
    case "location":
      return <AnswerMap lat={value[0]} lng={value[1]} />;
    case "image":
      return <AnswerImage imgFile={value} />;
    case "choose-one":
      return <AnswerChooseOneContainer textFormat={textFormat} value={value} />;
    case "choose-any":
      return (
        <AnswerChooseManyContainer textFormat={textFormat} values={value} />
      );
    default:
      return <Typography type="caption">Answer is not available</Typography>;
  }
}

export default AnswerValue;
