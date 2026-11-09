/**
 * Domain Use Cases: Authentication (Frontend-Only Validation)
 */
import { AuthUser } from "../entities/AuthUser";

export class LoginUseCase {
  validate(credentials) {
    return AuthUser.validateLogin(credentials);
  }

  execute(credentials) {
    const validation = AuthUser.validateLogin(credentials);
    if (!validation.isValid) {
      return {
        isValid: false,
        errors: validation.errors,
        user: null,
      };
    }

    const identifier = credentials.identifier.trim();
    return {
      isValid: true,
      errors: {},
      user: new AuthUser({
        id: 1,
        name: identifier.includes("@") ? identifier.split("@")[0] : identifier,
        username: identifier.replace(/^@/, ""),
        email: identifier.includes("@")
          ? identifier
          : `${identifier}@example.com`,
      }),
    };
  }
}

export class RegisterUseCase {
  validate(payload) {
    return AuthUser.validateRegister(payload);
  }

  execute(payload) {
    const validation = AuthUser.validateRegister(payload);
    if (!validation.isValid) {
      return {
        isValid: false,
        errors: validation.errors,
        user: null,
      };
    }

    return {
      isValid: true,
      errors: {},
      user: new AuthUser({
        id: 1,
        name: payload.name.trim(),
        username: payload.username.trim().replace(/^@/, ""),
        email: payload.email.trim(),
      }),
    };
  }
}
