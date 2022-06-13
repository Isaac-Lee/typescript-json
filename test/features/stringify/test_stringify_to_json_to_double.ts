import TSON from "../../../src";
import { IObjectToJsonDouble } from "../../structures/IObjectToJsonDouble";
import { _test_stringify } from "./internal/_test_stringify";

export const test_stringify_to_json_to_object = _test_stringify(
    "twice duplicated toJSON() method type",
    IObjectToJsonDouble.generate(),
    (input) => TSON.stringify(input),
);