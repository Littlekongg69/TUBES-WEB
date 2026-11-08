import { IAuthRepository } from "../../core/domain/repositories/interfaces";
import { AuthUser } from "../../core/domain/entities/AuthUser";
import { AuthLocalDataSource } from "../datasources/AuthDataSource";

export class AuthRepositoryImpl extends IAuthRepository {
  constructor(localDataSource = new AuthLocalDataSource()) {
    super();
    this.localDataSource = localDataSource;
  }

  getDemoAccounts() {
    return this.localDataSource
      .getDemoAccounts()
      .map((account) => new AuthUser(account));
  }

  saveSession(user) {
    return this.localDataSource.saveActiveSession(user);
  }
}

