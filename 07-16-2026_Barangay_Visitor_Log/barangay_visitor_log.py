import visitor_records

while True:

    name = input("Enter visitor name: ")

    purpose = input("Enter visitor purpose: ")

    visitor_records.save_visitor(name, purpose)

    answer = input("Add another visitor? (YES/NO): ")

    if answer.upper() != "YES":
        break


visitor_records.display_visitors()

print("Total number of visitors recorded:", visitor_records.total_visitors())