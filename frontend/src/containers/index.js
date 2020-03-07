import FeedsPage from "./FeedsPage";
import { asField } from "./Form";
import { TextInput as TI, Select as S, TextArea as TA } from "../components";

const FormFields = {
  TextInput: asField(TI),
  Select: asField(S),
  TextArea: asField(TA)
};

export { FeedsPage, FormFields };
