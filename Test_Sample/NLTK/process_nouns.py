import nltk
from nltk.corpus import gutenberg
from nltk.tokenize import PunktSentenceTokenizer

train_text = gutenberg.raw("austen-emma.txt")
sample_text = gutenberg.raw("austen-sense.txt")

custom_sent_tokenizer = PunktSentenceTokenizer(train_text)

tokenized = custom_sent_tokenizer.tokenize(sample_text)

def process_content():
    try:
        for i in tokenized[:50]:
            words = nltk.word_tokenize(i)
            tagged = nltk.pos_tag(words)
            chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
            chunkParser = nltk.RegexpParser(chunkGram)
            chunked = chunkParser.parse(tagged)
            
            count = 0;
            for j in chunked:
                countNoun = 0
                for item in chunked[count]:
                    if 'NNP' in item:
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
                    countNoun= countNoun+1

                count=count+1
    except Exception as e:
        print(str(e))
def process_content_filter_freqeuncy():
    try:
        for i in tokenized[:50]:
            words = nltk.word_tokenize(i)
            tagged = nltk.pos_tag(words)
            chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
            chunkParser = nltk.RegexpParser(chunkGram)
            chunked = chunkParser.parse(tagged)
            
            count = 0;
            for j in chunked:
                countNoun = 0
                for item in chunked[count]:
                    if 'NNP' in item:
                        # only print nnp
                        currentWord = chunked[count][countNoun][0]
                        currentWordCount = sample_text.count(currentWord)
                        #print("--{}".format(sample_text.count(currentWord)))
                        if countNoun == 0 and currentWordCount > 200:
                        #if countNoun == 0:                    
                            print("{}".format(chunked[count]))

                        # current word = print(chunked[count][countNoun][0])
                        # if it is nnp add to list and get count
                        #print(chunked[count].pos)
                    countNoun= countNoun+1

                count=count+1
    except Exception as e:
        print(str(e))

def process_content_combine_verb():
    try:
        for i in tokenized[:5]:
            words = nltk.word_tokenize(i)
            tagged = nltk.pos_tag(words)
            chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
            chunkParser = nltk.RegexpParser(chunkGram)
            chunked = chunkParser.parse(tagged)
            
            count = 0;
            for j in chunked:
                countNoun = 0
                for item in chunked[count]:
                    if 'NNP' in item:
                        print("{}".format(chunked[count]))
                    if 'VBN' in item or 'VBD' in item or 'VB' in item:
                        print("{}".format(chunked[count]))
                count=count+1
    except Exception as e:
        print(str(e))        
print("\n\n\n")        
print("====get all Noun phrase============")
process_content()
print("\n\n\n")
print("====filter by frequency============")
process_content_filter_freqeuncy()
#print("\n\n\n")
#print("====combine with verb============")
#process_content_combine_verb()