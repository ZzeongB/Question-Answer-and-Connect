# Question-Answer-and-Connect

## Demo
Run the following commands for demo: 
```
json-server [database] # import data
yarn start # run application
```

In the `[database]`, we provde you with three simple datasets: `db.json`, `QA_chat.json` and `output.json`. 

## TODO
### Step 1. Implement API @Taehyun
First, look at `onChatSubmit` function in `src/ChattingScreen.js`(line 47~).
It calls `handleRequest()` function(line 51~), which is in `src/api/generate.js`.

Then, go to `src/api/generate.js`. It defines `handleRequest()` function, which calls openAI API. Please fill this part. 

The ouput should be in `response`. Please save the output in appropriate format. 

Then @ZzeongB will handle the response afterward. 

### Step 2. Handle API result
API result will be used to save the new chat to server, link with keyword, and connect with questions. This will be done after Taehyun finishes Step 1. 