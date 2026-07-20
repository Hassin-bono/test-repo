import Foundation

struct UserService {
    let apiClient: APIClient

    func loadUser(id: String) async throws -> User {
        return try await apiClient.fetchUser(id: id)
    }
}
