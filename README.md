# CMS

> A Simple CMS using Vue

In order to use this CMS, you'll need a few things.

* A [Firebase Account](https://firebase.google.com) with a new firebase project. Firebase is a database service from Google. We will use this to provide storage for our website information, and authentication. 
* Access to your Firebase's Google Cloud service so you can allow your images to be hosted publicly. Don't worry, we will go through how to do this.

## Setting up Firebase

* Created a Firebase account, if you have not done so already.
* Press the Add Project button in the [console](https://console.firebase.google.com).
* Give the project name a descriptive name, so you know what the project is for later.
* Choose the region closest to your users.
* Create your project.
* You shuold now have a project created, and you should have been directed to the overview page. There should be three large buttons in the center of the overview. Press Add Firebase to your web app.
* Copy the script on your screen into a text editor for later. We will use the config section to set up the CMS later.

## Authentication

* In order for you to be able to edit content on your website, you will need to be able to log in. Select the Authentication section in Firebase, and choose the Set Up Sign-In Method button in the center of the screen.
* For now, let's setup Email/Password. Click Email/Password, and choose Enable.

## Setting up the Database

* Firebase have recently added Cloud Firestore to their service, but for now we want to use the realtime database. Click the Get Started button for Realtime Database
* You should have been taken to a visual representation of your database, which is currently empty. That's fine. But for now, we want to set up permissions on the database, so our users can fill it with data. Click the rules tab.
* Copy the following rules into the rules section. An explanation of the rules follows.

```
{
	"rules": {
		"contentType": {
			".read": "true",
			".write": "auth != null"
		},
    "data": {
      ".read": "true",
      ".write": "auth != null"
    },
  	"images": {
			".read": "true",
			".write": "auth != null"
		}
  }
}
```

The rules here are pretty simple. We have three different areas of our database, contentTypes, data, and images. Each of them will be able to be read by the public, but we want to stop the whole world from writing to the database. Now, only people that have authenticated with our app can write to the database.

## Setup Images (Part 1)

In the previous section, we had an images part of the database. Unfortunately for us, however, we cannot store actual images into our database, only a reference to them. We'll user Google Cloud Storage to host the images, but we need to make sure that they can be accessed by the public. There is no point of us having images that people cannot see.

* Go to the storage section of Firebase. Firebase will ask if you are ok with some default rules for storing files. Accept them, we will be changing them now anyway.
* Go to the rules section for storage, and copy the following rules.

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
    	allow write: if request.auth != null;
    }
  }
}
```

Once again, we are allowing anyone to view anything in our storage, but we are only allowing authenticaed users to edit or delete them. Needless to say, don't store anything you want keeping private in this storage, as not only Google have access to it, but so does the whole internet if they figure out your links. Congratulations, you can now store files in Firebase. Unfortunately, although you can store files, you don't have an easy way of getting links to the files yet, so we need to open up your storage a little bit further. The following instructions are from [Google's documentation](https://cloud.google.com/storage/docs/access-control/making-data-public). 

* Go to [Google Cloud Storage's Console](https://console.cloud.google.com/storage/browser). Although we use firebase to upload our files to google, they are stored here.
* On the right hand side of the buckets in the list, there is a three circled settings icon. Choose the icon for the bucket that shares the same name as the firebase app. Do not choose the staging one, we will not be using it.
* Choose Edit bucket permissions
* In the Add members field, add `allUsers`.
* In the manage roles dropdown, choose Storage Object Viewer.

Now you should be able to get a url for your files that is viewable to the public! :D

## Build Setup

``` bash
# install dependencies
npm install

# Using your Firebase config, serve with hot reload at localhost:8080
npm run dev FIREBASE_API_KEY='YourApiKey' FIREBASE_AUTH_DOMAIN='auth-domain.firebaseapp.com' FIREBASE_DATABASE_URL='https://database-url.firebaseio.com' FIREBASE_PROJECT_ID='project-id' FIREBASE_STORAGE_BUCKET='storage-bucket-url.appspot.com' FIREBASE_MESSAGING_SENDER_ID='0123456789'

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run tests once
npm run test

# Run rests constantly so they run when you make changes
npm run test-watch
