import nltk
import math
import json
import sys
from nltk.corpus import gutenberg
from nltk.tokenize import PunktSentenceTokenizer

def preprocessing_text_file(input_file):
    train_text = gutenberg.raw(input_file)
    sample_text = gutenberg.raw(input_file)

    custom_sent_tokenizer = PunktSentenceTokenizer(train_text)

    tokenized = custom_sent_tokenizer.tokenize(sample_text)
    
    print("\n\n\n")
    print("====combine with verb============")
    name_list = process_content_find_verb(10, tokenized, sample_text)
    process_json(10, name_list, input_file)
    

def process_content(tokenized, sample_text):
    try:
        for i in tokenized[:2]:
            words = nltk.word_tokenize(i)
            tagged = nltk.pos_tag(words)
            chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
            chunkParser = nltk.RegexpParser(chunkGram)
            chunked = chunkParser.parse(tagged)
            
            count = 0;
            for j in chunked:
                countNoun = 0
                for item in chunked[count]:
                    if 'NNP' in item or 'NN' in item:
                        # only print nnp
                        currentWord = chunked[count][countNoun][0]
                        currentWordCount = sample_text.count(currentWord)
                        #print("--{}".format(sample_text.count(currentWord)))
                        #if countNoun == 0 and currentWordCount > 100:
                        if countNoun == 0:                    
                            print("{}".format(chunked[count]))

                        # current word = print(chunked[count][countNoun][0])
                        # if it is nnp add to list and get count
                        #print(chunked[count].pos)
                    #else:
                    #    print("{}".format(chunked[count]))
                    
                    countNoun= countNoun+1

                count=count+1
    except Exception as e:
        print(str(e))
def process_content_filter_freqeuncy(tokenized, sample_text):
    try:
        #how many words in this range
        # create a dictionary to filter out duplicate things
        constant = 10
        print("frequency {}".format(noun_frequency(constant, len(tokenized))))
        for i in tokenized[:50]:
            words = nltk.word_tokenize(i)
            tagged = nltk.pos_tag(words)
            chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
            chunkParser = nltk.RegexpParser(chunkGram)
            chunked = chunkParser.parse(tagged)
            
            count = 0;
            for j in chunked:
                countNoun = 0
                currentChunk = ""
                targetString = ""
                for item in chunked[count]:
                    if 'NNP' in item or 'NN' in item:
                        # only print nnp
                        currentWord = chunked[count][countNoun][0]
                        currentWordCount = sample_text.count(currentWord)
                        #print("--{}".format(sample_text.count(currentWord)))
                        if currentWordCount > noun_frequency(constant, len(tokenized)):
                        #if countNoun == 0:                    
                            if countNoun == 0:
                                #print("{}".format(chunked[count]))
                                currentChunk = chunked[count]
                            if len(currentWord) >2:
                                targetString = targetString+" "+currentWord
                                #print("--{}".format(currentWord))
                            
                        #current_word = chunked[count][countNoun][0]
                        # if it is nnp add to list and get count
                        #print(chunked[count].pos)
                        
                        if len(currentWord) >2 and targetString != "" and countNoun != 0:
                            targetString = targetString+" "+currentWord
                        
                    countNoun= countNoun+1
                
                if currentChunk != "":
                    print("-------------")
                    print("Chunk: {}".format(currentChunk))
                    print("String: {}".format(targetString))
                    # save the target string
                    
                
                count=count+1
                
    except Exception as e:
        print(str(e))

        
        
def noun_frequency(constant, storyLength):
    # frequency = c log(storyLength)
    frequency = math.floor( constant * math.log10(storyLength))
    return frequency
def process_content_find_verb(json_length, tokenized, sample_text):
    try:
        #how many words in this range
        # create a dictionary to filter out duplicate things
        constant = 10
        dictionary_verb = {};
        print("frequency {}".format(noun_frequency(constant, len(tokenized))))
        for i in tokenized[:1500]:
            words = nltk.word_tokenize(i)
            tagged = nltk.pos_tag(words)
            chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
            chunkParser = nltk.RegexpParser(chunkGram)
            chunked = chunkParser.parse(tagged)
            
            shouldGetVerb = False;
            count = 0;
            targetVerb = ""
            targetString = ""
            for j in chunked:
                countNoun = 0
                currentChunk = ""
                #targetString = ""
                for item in chunked[count]:
                    if 'NNP' in item or 'NN' in item:
                        # only print nnp
                        
                        currentWord = chunked[count][countNoun][0]
                        currentWordCount = sample_text.count(currentWord)
                        targetWordCount = sample_text.count(targetString)
                        if shouldGetVerb == True:
                            test = str(targetWordCount);
							
                            dictionary_verb.setdefault(targetString,[test]).append(targetVerb);
                            #print(dictionary_verb);
                            #print("\"{}\": [\"{}\",\"{}\"],".format(targetString, targetVerb, targetWordCount))
                            shouldGetVerb = False
                            targetVerb = ""
                            targetString = ""
                        #print("Stop get action {}".format(targetString))
                        

                        if currentWordCount > noun_frequency(constant, len(tokenized)):
                            if countNoun == 0:
                                currentChunk = chunked[count]
                                if len(currentWord) >2:
                                    targetString = currentWord
                        
                        if len(currentWord) >2 and targetString != "" and countNoun != 0:
                            targetString = targetString+" "+currentWord
                        
                    countNoun= countNoun+1
                
                if currentChunk != "":
                    #print("-------------")
                    #print("Chunk: {}".format(currentChunk))
                    #print("String: {}".format(targetString))
                    
                    ## we get a noun now, and want to find its verb = action
                    shouldGetVerb = True

                    #print("Need to get action for {}".format(targetString))
                    # save the target string
                count=count+1
                
                if count < 3:
                    if shouldGetVerb == True:
                        if 'VB' in chunked[count] or 'VBD' in chunked[count] or 'VBG' in chunked[count] or\
                        'VBN' in chunked[count] or 'VBN' in chunked[count]:
                            #print("Verb: {}".format(chunked[count]))
                            targetVerb = targetVerb+" "+chunked[count][0]
                            #print("action pair: ({}, {})".format(targetString, chunked[count][0]))
        
        #print(dictionary_verb);
        control_json_limit = 0;
        print(type(dictionary_verb))
        for x in dictionary_verb:
        
            if control_json_limit < json_length:
                print(repr(x),":",dictionary_verb[x], ",")
                control_json_limit = control_json_limit +1
        
    except Exception as e:
        print(str(e))    


    return dictionary_verb

def process_json(print_limit, noun_list, file_name):
    new_json_file = "./Static/text_sample/"+str(file_name).replace(".txt","")+".json"
    
    #print ( sys.argv[1])
    target = open(new_json_file, 'w')
    target.write(json.dumps(noun_list, sort_keys=False, indent=4, separators=(',', ': ')))
    #print (new_json_file)
    #print ()
    
    
#print("\n\n\n")        
#print("====get all Noun phrase============")
#process_content()
#print("\n\n\n")
#print("====filter by frequency============")
#process_content_filter_freqeuncy()
#print("\n\n\n")
#print("====combine with verb============")
#name_list = process_content_find_verb(10)
#process_json(10, name_list)