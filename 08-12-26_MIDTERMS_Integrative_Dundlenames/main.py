from weather.rainy import skip_school
from weather.clear import go_school

print("=== SCHOOL WEATHER CHECKER ===")

while True:

    answer = input("Is it raining? (yes/no/exit): ")

    if answer == "yes":
        skip_school()

    elif answer == "no":
        go_school()

    elif answer == "exit":
        print("Goodbye!")
        break

    else:
        print("Please type yes, no, or exit.")