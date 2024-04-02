# STEPS ON BUILDING THE BACK END

---

## Initialise repository

---

- npm init
- git init, add, commit push to remote repository

## Install initial dependencies

---

- npm i express mongoose multer cloudinary

## Create index.js page

## Alter package.json - use modules instead

---

- "type": "module",

## add script to package.json file

---

```
    "start": "node index.js"
```

## Import dotenv

- npm i dotenv

## Create dotenv file

- PORT=....

## Create .gitignore to ignore node modules and .env file

---

## Create starting set up server

---

```
    import express from "express";
    import dotenv from "dotenv";
    dotenv.config();

    const app = express();

    app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello There" });
    });

    app.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
    });


```

## run `npm run start` in the terminal and go to the localhost

---

- it should show

```

    {
    "message": "Hello There"
    }
```
