import { ValidationResult } from "../../../shared/dist";
import { FetchService } from "./http-service";

export class PasswordService extends FetchService {
  constructor() {
    super("http://localhost:8080");
  }
  public async checkPassword(password: string): Promise<ValidationResult[]> {
    const result = await super.post("", { body: JSON.stringify({ password }) });
    return result.json() as unknown as ValidationResult[];
  }
}

export const passwordService = new PasswordService();
