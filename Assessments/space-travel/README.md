# 🚀 Space Travel Assessment

A simple project for building and managing spacecraft.

## 📥 Installation Instructions

Clone **only** this project folder (`Assessments/space-travel`) from the larger `Springboard` repository:

1. git clone --depth 1 --filter=blob:none --sparse https://github.com/Sabrisk/Springboard.git
2. cd Springboard
3. git sparse-checkout set Assessments/space-travel
4. cd Assessments/space-travel/
5. npm install
6. npm run dev

## 📸 Image URLs for Spacecraft

You can use these convenient image URLs for testing your spacecraft:

https://cdna.artstation.com/p/assets/covers/images/038/236/150/large/quentin-marcos-quentin-marcos-square-cover.jpg

https://cdnb.artstation.com/p/assets/images/images/090/061/687/smaller_square/vadim-sadovski-qq10.jpg

## 🧑‍💻 Usage

If you need to **reset the application state**, open your browser’s DevTools console and run:

localStorage.clear()

This will clear all saved data for a fresh start. Then just refresh the page and you're good to go.

## 📝 Notes

-   Spacecraft names that are **8 characters or less** work best.

## 🗒️ Notes for Grading

-   The rubric asks for props type validation, but TypeScript comes later in the course so I haven’t learned how to do that yet.

-   I used Vite and Redux Toolkit but the React Testing Library videos didn't really cover how to test with Vite and RTK. It's based on Create React App. I chose not to delay submitting the project and skip building the tests since I'm already a bit behind in the bootcamp. Seems like I need to spend a fair amount of time on my own learning how to do the testing with Redux. If I need to resubmit the assignment though I, I'll try to spend more time to figure it out.

-   I also don't have some of the folders (like context) that the rubric asks for since I tried to adhere to Redux best practices.
