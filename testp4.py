# large_app.py
# A deliberately large file where only 1–2 imported functions are actually used.

import db
import logger
import json
import time
import random
from pathlib import Path


# ==========================================================
# Utility Functions
# ==========================================================

def load_config(path: str):
    with open(path, "r") as f:
        return json.load(f)


def save_config(path: str, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2)


def generate_token(length=16):
    chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    return "".join(random.choice(chars) for _ in range(length))


def current_timestamp():
    return int(time.time())


def ensure_directory(path):
    Path(path).mkdir(parents=True, exist_ok=True)


def normalize_email(email):
    return email.strip().lower()


def validate_username(username):
    return len(username) >= 3


def validate_password(password):
    return len(password) >= 8


# ==========================================================
# Logging Helpers
# ==========================================================

def log_info(msg):
    logger.info(msg)


def log_error(msg):
    logger.error(msg)


def log_warning(msg):
    logger.warning(msg)


# ==========================================================
# Formatting
# ==========================================================

def format_user(user):
    return f"{user['id']} - {user['name']}"


def format_date(ts):
    return time.strftime("%Y-%m-%d", time.localtime(ts))


def pretty_print(obj):
    print(json.dumps(obj, indent=2))


# ==========================================================
# Analytics
# ==========================================================

def average(values):
    return sum(values) / len(values)


def maximum(values):
    return max(values)


def minimum(values):
    return min(values)


def median(values):
    values = sorted(values)
    mid = len(values) // 2
    return values[mid]


def summarize(values):
    return {
        "avg": average(values),
        "min": minimum(values),
        "max": maximum(values),
    }


# ==========================================================
# File Helpers
# ==========================================================

def read_text(path):
    return Path(path).read_text()


def write_text(path, content):
    Path(path).write_text(content)


def file_exists(path):
    return Path(path).exists()


# ==========================================================
# Miscellaneous
# ==========================================================

def random_delay():
    time.sleep(random.uniform(0.1, 0.5))


def retry(operation, attempts=3):
    for _ in range(attempts):
        try:
            return operation()
        except Exception:
            pass
    raise RuntimeError("Operation failed")


def health_check():
    return {"status": "ok"}


def cleanup():
    pass


# ==========================================================
# Business Logic
# ==========================================================

def fetch_user_profile(user_id):
    """
    One of the ONLY functions that references an imported module.
    If a diff only contains this function, db.fetch() appears
    without the import being shown.
    """
    return db.fetch(user_id)


def update_last_seen(user_id):
    """
    Second imported call.
    """
    db.update_last_seen(user_id)


# ==========================================================
# Application Entry
# ==========================================================

def main():
    user = fetch_user_profile(42)
    update_last_seen(42)

    print("User:")
    pretty_print(user)


if __name__ == "__main__":
    main()
