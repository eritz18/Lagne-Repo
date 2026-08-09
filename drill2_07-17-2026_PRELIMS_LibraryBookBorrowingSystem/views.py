from models import books


def show_books():
    print("\nAll Books")

    for index, book in enumerate(books, start=1):
        status = "Borrowed" if book["borrowed"] else "Available"

        print(f"\nBook {index}")
        print(f"Title: {book['title']}")
        print(f"Author: {book['author']}")
        print(f"Status: {status}")

        if book["borrowed"]:
            print(f"Borrowed By: {book['borrowed_by']}")


def borrow_book():
    show_books()

    try:
        choice = int(input("\nEnter book number to borrow: "))

        if choice < 1 or choice > len(books):
            print("Invalid book number.")
            return

        book = books[choice - 1]

        if book["borrowed"]:
            print("Sorry! This book is already borrowed.")
        else:
            student = input("Enter student name: ")
            book["borrowed"] = True
            book["borrowed_by"] = student
            print("Book borrowed successfully!")

    except ValueError:
        print("Please enter a valid number.")


def return_book():
    show_books()

    try:
        choice = int(input("\nEnter book number to return: "))

        if choice < 1 or choice > len(books):
            print("Invalid book number.")
            return

        book = books[choice - 1]

        if not book["borrowed"]:
            print("This book is already available.")
        else:
            book["borrowed"] = False
            book["borrowed_by"] = ""
            print("Book returned successfully!")

    except ValueError:
        print("Please enter a valid number.")


def show_available_books():
    print("\nAvailable Books")

    found = False

    for index, book in enumerate(books, start=1):
        if not book["borrowed"]:
            found = True
            print(f"\nBook {index}")
            print(f"Title: {book['title']}")
            print(f"Author: {book['author']}")

    if not found:
        print("No available books.")


def show_borrowed_books():
    print("\nBorrowed Books")

    found = False

    for index, book in enumerate(books, start=1):
        if book["borrowed"]:
            found = True
            print(f"\nBook {index}")
            print(f"Title: {book['title']}")
            print(f"Author: {book['author']}")
            print(f"Borrowed By: {book['borrowed_by']}")

    if not found:
        print("No borrowed books.")