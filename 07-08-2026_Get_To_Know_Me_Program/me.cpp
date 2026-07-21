#include <iostream>
#include <string>
#include <chrono>
#include <thread>

std::string fullName = "Jehni Eritz H. Lagne";
std::string nickName = "Jen, Emem";
std::string birthDate = "05/18/2005";
std::string homeAddress = "Santa Barbara, Iloilo";
std::string favoriteTrack = "You're So Vain by Carly Simon";
std::string academicDrive = "I keep pushing myself because growth happens outside my comfort zone.";
std::string supportSystem = "Having my parents' support, understanding professors, and a cup of hot coffee during busy days would make this semester much easier.";

void runningCompilation();
void displayDogProfile();

int main() 
{
    runningCompilation();
    displayDogProfile();
    return 0;
}

void runningCompilation() 
{
    for (int i = 0; i < 3; i++) {
        std::cout << ".";
        std::flush(std::cout);
        std::this_thread::sleep_for(std::chrono::milliseconds(400));
    }
    std::cout << "\n[Success] Profile Loaded Successfully!\n\n";
}

void displayDogProfile() 
{
    std::cout << "************************************************************\n";
    std::cout << "* MY PROFILE                                               *\n";
    std::cout << "************************************************************\n";
    std::cout << "I'm a dog person! 🐾\n\n";

    std::cout << "      __                  __                  __\n";
    std::cout << "  o-''|\\_____/)       o-''|\\_____/)       o-''|\\_____/)\n";
    std::cout << "   \\_/|_)     )        \\_/|_)     )        \\_/|_)     )\n";
    std::cout << "      \\  __  /            \\  __  /            \\  __  /\n";
    std::cout << "      (_/ (_/  arf!       (_/ (_/  arf!       (_/ (_/  arf!\n\n";

    std::cout << "Name        : " << fullName << "\n";
    std::cout << "Nickname    : " << nickName << "\n";
    std::cout << "Birthday    : " << birthDate << "\n";
    std::cout << "Address     : " << homeAddress << "\n";
    std::cout << "Fav Song    : " << favoriteTrack << "\n";
    std::cout << "Motivation  : " << academicDrive << "\n";
    std::cout << "Support     : " << supportSystem << "\n\n";

    std::cout << "************************************************************\n";
    std::cout << "* PROGRAM ENDED SUCCESSFULLY                *\n";
    std::cout << "* Good luck this semester! 🐶               *\n";
    std::cout << "************************************************************\n";
}