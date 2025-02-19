import { UserRepository } from "../repositories/user.repository";

export class UserService {
    static async createUser(name: string, email: string) {
        return await UserRepository.createUser(name, email);
    }

    static async getUserById(id: number) {
        return await UserRepository.getUserById(id);
    }

    static async updateUser(id: number, name: string) {
        return await UserRepository.updateUser(id, name);
    }

    static async deleteUser(id: number) {
        return await UserRepository.deleteUser(id);
    }
}
