import nltk
from nltk.corpus import gutenberg
from nltk.tokenize import PunktSentenceTokenizer

train_text = gutenberg.raw("austen-emma.txt")
sample_text = gutenberg.raw("austen-sense.txt")

custom_sent_tokenizer = PunktSentenceTokenizer(train_text)

tokenized = custom_sent_tokenizer.tokenize(sample_text)

def process_content():
    try:
        for i in tokenized[:1]:
            words = nltk.word_tokenize(i)
            tagged = nltk.pos_tag(words)
            chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
            chunkParser = nltk.RegexpParser(chunkGram)
            chunked = chunkParser.parse(tagged)
            
            count = 0;
            print(type(chunked))
            for j in chunked:
                if count<=10:
                    for item in chunked[count]:
                        if 'NNP' in item:
                            print(chunked[count])
                    count=count+1
                else:
                    count = 0;
          #  print(chunked)
          #  print(chunked[2].label())
    except Exception as e:
        print(str(e))


process_content()