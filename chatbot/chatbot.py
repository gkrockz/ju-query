import streamlit as st
import nltk
from nltk.tokenize import TreebankWordTokenizer
from nltk.corpus import stopwords
import numpy as np
import json
import tensorflow as tf
import random
nltk.download('stopwords')
nltk.download('punkt')
st.set_page_config(
    page_title="JU ChatBott",
    page_icon=":robot:"
)
st.image("./jain-logo.png")
tokenizer=TreebankWordTokenizer()
#Loading the intent file
with open("./intent.json") as file:
    data=json.load(file)
    
#List to hold all the different words from the patterns
words=[]
#List to hold the matching pattern/question
pat_match=[]
#List to hold the matching tags
tag_match=[]
#List to hold all the lables
label=[]

for intents in data["intent"]:
    for pattern in intents["patterns"]:
        
        #Tokenizing the patterns/question using the TreeBankWordTokenizer
        word=tokenizer.tokenize(pattern)
        
        #Adding the tokinized words in a list
        words.extend(word)
        
        #Adding data to the 2 lists with each pattern corresponding to their tags
        pat_match.append(pattern)
        tag_match.append(intents["tag"])
        
    #Creating a list of tags    
    if intents["tag"] not in label:
        label.append(intents["tag"]) 
        
#Pre-processing the list of words
words=[w.lower() for w in words if w != "?"]
stop_words=stopwords.words('english')
words=[w for w in words if not w in stop_words]
words=sorted(list(set(words)))

#model=tf.keras.models.load_model("modeldense.h5")
model=tf.keras.models.load_model("./modellstm.h5")

#Function to pre-process the input and convert it to a vector with respect to the BOW list created
def makeword(inp,words):
    bag=[0 for i in range(len(words))]
    inp_w=tokenizer.tokenize(inp) 
    inp_w=[w.lower() for w in inp_w if w != "?"]
    for w in inp_w:
        for index,p in enumerate(words):
            if p==w:
                bag[index]=1
    bag=np.array(bag)
    d=np.expand_dims(bag,0)
    return d

def chat():
        #User input variable
        m=st.text_input("User Input")
        #Sending the input to the makeword function and getting the vector form of input 
        #and sending it to the model for prediciton
        predict=model.predict(makeword(m,words))[0]
        #Taking the index with the highest probability
        result=np.argmax(predict) 
        #Getting the tag with the highest probability
        tag=label[result]
        
        #Checking the confidence value of the highest probability tag
        if (np.max(predict[result])>0.5):
            #Getting the response from the intent file
            for t in data['intent']:
                if t['tag']==tag:
                    response=t['answer']
            #Generating random response for a list of response
            botinp=random.choice(response)
            st.write("BOT: "+botinp+"\n")   
        
        #If the confidence value is low then we ask the user to rephrase the question
        else:
            st.write("BOT: Enter a question")

chat()

