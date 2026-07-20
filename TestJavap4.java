import com.example.database.DatabaseClient;

public class UserService {

    private final DatabaseClient db;

    public UserService(DatabaseClient db) {
        this.db = db;
    }

    public String getUserName(String userId) {
        return db.fetchUser(userId).getName();
    }
}
