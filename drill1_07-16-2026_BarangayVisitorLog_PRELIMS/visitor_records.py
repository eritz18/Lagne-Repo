visitors = []

def save_visitor(name, purpose):
    visitors.append([name, purpose])


def display_visitors():
    print("\n===== RECORDED VISITORS =====")

    for visitor in visitors:
        print("Visitor Name:", visitor[0])
        print("Visitor Purpose:", visitor[1])
        print()


def total_visitors():
    return len(visitors)