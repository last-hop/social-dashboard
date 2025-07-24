# 🚀 SocialApp (Expo React Native)

This is a mobile social media application built with **React Native (Expo)**. The app supports user authentication, post creation, editing, and viewing. Navigation is managed via `@react-navigation`, and the backend is integrated via APIs. AI tools were heavily used throughout development to accelerate and debug features.

---

## 📆 Features

- Splash screen on launch
- Login with predefined users
- Bottom tab navigation after login
- Create & edit posts
- Logout with field reset
- Token-based session handling
- Cleaned-up stack navigation

---

## 🧠 AI Development Journal

Throughout this project, multiple AI tools were used to streamline development:

### Tools Used:
- **GitHub Copilot** – for code autocompletion and rapid prototype generation
- **Claude AI & ChatGPT** – for:
  - Structuring optimized controller and service logic
  - Debugging runtime errors (e.g., navigation bugs, token clearing)
  - Validating edge cases and authentication workflows
  - Refactoring screen logic for login, logout, and post creation
  - Designing and reviewing project documentation

### Validation Methods:
- Manually tested UI interactions on physical device (Expo Go)
- Handled edge cases:
  - Empty form fields
  - Invalid emails
  - Malformed passwords
  - Token expiration scenarios
- Added alerts and fallback screens to guide the user
- Verified navigation flow resets correctly on logout
- Ensured user state resets and token storage is secure using `AsyncStorage`

---

## 💠 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/socialapp-expo.git
cd socialapp-expo

2. Install dependencies

npm install
3. Start Expo development server


npx expo start
You can scan the QR code in Expo Go app to view the app on your device.

🔑 Login Instructions
To log in, you can use any predefined email from the mock database. The password must follow a strong format like Aman@123.

✅ Sample Emails:
Sincere@april.biz

Shanna@melissa.tv

Nathan@yesenia.net

Julianne.OConner@kory.org

✅ Password Format:
A valid password example is: Aman@123
(Must include uppercase, lowercase, number, and a special character)

No signup is required — pick any sample email and enter a valid password format.

🧰 Validations and Edge Cases
🔒 Email or password fields left empty trigger user alerts

🚫 Invalid credentials show error messages

✅ Passwords must match a specific format

🔁 Token is cleared on logout, and app resets to login screen

🔐 Screens are protected — if no token exists, navigation is blocked

📁 Folder Structure

src/
│
├── components/
│   ├── createPostScreen.tsx
│   ├── editPostScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SplashScreen.tsx
│   ├── UserScreen.tsx
│   ├── CustomButton.tsx
│   └── PostCard.tsx
│
├── nav/
│   └── BottomTabNavigator.tsx
│
├── screens/
│   ├── splashScreen.tsx
│   └── LoginScreen.tsx
│
├── service/
│   └── apiService.ts
│
├── utils/
│   └── validation.ts

🪩 Future Enhancements
🔐 Add signup screen with proper validations

☁️ Integrate secure JWT-based login

🖼️ Add image upload support for posts

🌐 Connect to live backend with database

👨‍💼 Author
Aman – Solo developer & AI-assisted engineer
Built using Expo, TypeScript, and modern state management best practices.

