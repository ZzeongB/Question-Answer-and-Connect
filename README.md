# 🎯 Question-Answer-and-Connect
## 📚 Introduction
This repository contains the implementation of a Human-Computer Interaction course project, Question-Answer-and-Connect. This prototype runs in the Web browser. It is implemented using React with Javascript language. 

## 🧩 What does this application do?
This app Connects Questions and Answers. 🗣️💬

At first glance, it may look like a regular chat window, but do you see the keywords above the input field? When you select a keyword, it gathers related Questions, and when you select a Question, it allows you to see related Answers and follow-up questions.

If you enter a new chat, it will be classified under a keyword in a short time, or a new keyword will be added.

<p float="left">
    <img src="./demo1.png" width="30%" />
    <img src="./demo2.png" width="30%" /> 
    <img src="./demo3.png" width="30%" />
</p>

## 🚀 Run it yourself!
If it is your first time, run the command below to install requirements:
```bash
yarn install

You need to run two commands in two terminals, one in each.
Run the following commands for demo:
```bash
yarn json-server <database> # to import data

# open a new terminal, and
yarn start # to run application
```

We provde you with example dataset: `shimsugi_final.json`. You can use it by running:
```bash
yarn json-server shimsugi_final.json # import data

# open a new terminal, and
yarn start # to run application
```
You can use the example we provided, or create your own dataset. 📊
