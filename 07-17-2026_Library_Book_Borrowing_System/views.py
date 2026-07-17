from models import books


def show_books():
    print("\nAll Books")

    for i, book in enumerate(books, 1):

        if book["borrowed"]:
            status = "Borrowed"
        else:
            status = "Available"

        print(f"\nBook {i}")
        print("Title:", book["title"])
        print("Author:", book["author"])
        print("Status:", status)

        if book["borrowed"]:
            print("Student:", book["student"])


def available_books():
    print("\nAvailable Books")

    found = False

    for i, book in enumerate(books, 1):
        if not book["borrowed"]:
            print(f"{i}. {book['title']} by {book['author']}")
            found = True

    if not found:
        print("No available books.")


def borrowed_books():
    print("\nBorrowed Books")

    found = False

    for i, book in enumerate(books, 1):
        if book["borrowed"]:
            print(f"{i}. {book['title']} - {book['student']}")
            found = True

    if not found:
        print("No borrowed books.")


def borrow_book():
    available_books()

    num = int(input("\nEnter book number: "))

    if num < 1 or num > len(books):
        print("Invalid book number.")
        return

    book = books[num - 1]

    if book["borrowed"]:
        print("Book is already borrowed.")
    else:
        name = input("Enter student name: ")
        book["borrowed"] = True
        book["student"] = name
        print("Book borrowed successfully.")


def return_book():
    borrowed_books()

    num = int(input("\nEnter book number: "))

    if num < 1 or num > len(books):
        print("Invalid book number.")
        return

    book = books[num - 1]

    if not book["borrowed"]:
        print("Book is already available.")
    else:
        book["borrowed"] = False
        book["student"] = ""
        print("Book returned successfully.")


def menu():

    while True:

        print("\nLibrary Book Borrowing System")
        print("1. Show All Books")
        print("2. Borrow a Book")
        print("3. Return a Book")
        print("4. Show Available Books")
        print("5. Show Borrowed Books")
        print("6. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            show_books()

        elif choice == "2":
            borrow_book()

        elif choice == "3":
            return_book()

        elif choice == "4":
            available_books()

        elif choice == "5":
            borrowed_books()

        elif choice == "6":
            print("Thank you!")
            break

        else:
            print("Invalid choice.")


if __name__ == "__main__":
    menu()