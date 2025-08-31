# WEB103 Prework - Creatorverse

Submitted by: **Venkatesh Kelam**

## About this web app
Creatorverse is a full-stack React + Supabase app that allows users to share their favorite content creators. It supports full CRUD functionality (Create, Read, Update, Delete), enabling you to add, view, edit, and remove creators. Each creator includes a name, description, link to their channel/page, and an image.

**Time spent:** ~5 hours 

---

## ✅ Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via fetch() (via Supabase client)**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

---

## 🌟 Stretch Features

The following **optional** features are implemented:

- [ ] Picocss is used to style HTML elements  
  *(Instead, I implemented a custom CSS theme for a polished UI.)*
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

---

## ✨ Additional Features

- [x] Modern responsive grid layout for cards  
- [x] Custom global styling with gradients, hover animations, and a clean theme  
- [x] Placeholder images supported for missing `imageURL`  
- [x] Navigation bar with brand + quick links  

---

## 🎥 Video Walkthrough

Here’s a walkthrough of the implemented required features:

👉🏿 <img src="https://www.loom.com/share/930e11172e5b45d1adb2cc69dfd3cddd" title="Video Walkthrough" width="" alt="Video Walkthrough" />


GIF created with 👉🏿 **[Loom]**

---

## 📝 Notes

Challenges I faced while building this app:
- Handling database errors when IDs were duplicated or `imageURL` was set to required in Supabase.  
- Fixing React warnings about duplicate keys.  
- Ensuring smooth navigation between pages with `useParams` and `useNavigate`.  
- Polishing the UI to look professional and responsive without using an external library like PicoCSS.  

---

## 📜 License

Copyright © 2025 **Venkatesh Kelam**

Licensed under the Apache License, Version 2.0.  
You may not use this file except in compliance with the License.  

http://www.apache.org/licenses/LICENSE-2.0
