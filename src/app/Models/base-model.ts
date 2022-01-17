import { Dictionary } from "../ui/model-list/basic-types";

export class Document {
  location: string;
}

export abstract class BaseModel extends Document {
  static modelName: string;
  static modelFriendlyName: string;
  static modelPluralName: string;
  id: string;
}

export class SaveError extends Document {
  errors: Dictionary<any>;
  innerErrors?: Dictionary<SaveError>;
}

export class LoadError {
  message: string;
}


