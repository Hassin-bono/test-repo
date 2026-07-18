import db


def get_user(user_id: int):
    query_result = db.fetch(user_id)
    return query_result.get("name") if query_result else None


def main():
    user = get_user(42)
    print(user)


if __name__ == "__main__":
    main()
