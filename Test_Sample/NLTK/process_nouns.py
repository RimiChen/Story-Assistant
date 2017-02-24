import nltk
import math
from nltk.corpus import gutenberg
from nltk.tokenize import PunktSentenceTokenizer

train_text = gutenberg.raw("austen-emma.txt")
sample_text = gutenberg.raw("austen-sense.txt")

custom_sent_tokenizer = PunktSentenceTokenizer(train_text)

tokenized = custom_sent_tokenizer.tokenize(sample_text)

def process_content():
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
                    else:
                        print("{}".format(chunked[count]))
                    
                    countNoun= countNoun+1

                count=count+1
    except Exception as e:
        print(str(e))
def process_content_filter_freqeuncy():
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
def process_content_find_verb():
    try:
        #how many words in this range
        # create a dictionary to filter out duplicate things
        constant = 10
        print("frequency {}".format(noun_frequency(constant, len(tokenized))))
        for i in tokenized[:10]:
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
                        
                        if shouldGetVerb == True:
                            print("action {}, {}:".format(targetString, targetVerb))
                            shouldGetVerb = False
                            targetVerb = ""
                            targetString = ""
                        #print("Stop get action {}".format(targetString))
                        
                        currentWord = chunked[count][countNoun][0]
                        currentWordCount = sample_text.count(currentWord)
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
                
                #if count < len(tokenized):
                if shouldGetVerb == True:
                    if 'VB' in chunked[count] or 'VBD' in chunked[count] or 'VBG' in chunked[count] or\
                    'VBN' in chunked[count] or 'VBN' in chunked[count]:
                        #print("Verb: {}".format(chunked[count]))
                        targetVerb = targetVerb+" "+chunked[count][0]
                        #print("action pair: ({}, {})".format(targetString, chunked[count][0]))
                
    except Exception as e:
        print(str(e))    



        
#print("\n\n\n")        
#print("====get all Noun phrase============")
#process_content()
#print("\n\n\n")
#print("====filter by frequency============")
#process_content_filter_freqeuncy()
print("\n\n\n")
print("====combine with verb============")
process_content_find_verb()