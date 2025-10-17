# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "wedding-gifts")
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)

## 3. Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (`</>`)
4. Enter app nickname (e.g., "wedding-website")
5. Copy the config object

## 4. Update Configuration

Replace the placeholder values in `/src/lib/firebase.ts` with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id",
};
```

## 5. Security Rules (Optional)

For production, update Firestore rules to be more secure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservations/{document} {
      allow read, write: if true; // Allow anyone to read/write reservations
    }
  }
}
```

## 6. Test the Setup

1. Start your development server
2. Try reserving a gift
3. Check Firebase Console > Firestore Database to see the reservation document

## Data Structure

The app will create documents in the `reservations` collection:

```
reservations/
  ├── coffee-machine/
  │   ├── reserved: true
  │   └── timestamp: "2024-01-15T10:30:00Z"
  ├── dinner-set/
  │   ├── reserved: false
  │   └── timestamp: "2024-01-15T11:00:00Z"
  └── ...
```

## Free Tier Limits

Firebase Firestore free tier includes:

- 1GB storage
- 50,000 reads per day
- 20,000 writes per day
- 20,000 deletes per day

This should be more than enough for a wedding website!
