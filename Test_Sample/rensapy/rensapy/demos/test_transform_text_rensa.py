'''
This example demonstrates how to extract simple Rensa assertions from natural text.
'''

print "Importing libraries..."
import sys
import os
import pprint

memory_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'src'))
sys.path.insert(0, memory_path)
from Brain import *
from ConceptExtractor import *

def main(inputString):
    ''' Extract story assertions. '''
    # Here is an example string.
    string = inputString
    # Extract Rensa assertions with extract_story_concepts().
    
    ## remove this line for speed up process
    #print "I'm reading: " + string + "\n* * * "
    #learned = extract_story_concepts(string)
    learned = extract_story_concepts_no_print(string)
    
    
    learned_separate = extract_story_concepts_separate(string)
    print("\n\n")
    pp = pprint.PrettyPrinter(indent=4)
    #pp.pprint(learned)
    
    key = 'John'
    #'Elinor'
    #'Henry'
    
    if key in learned_separate:
        print("In!")
        #print(str(type(learned_separate[key])))
        #pp.pprint(sum(learned_separate[key],[]))
    #print("\n\n"+str(type(learned_separate[Henry])))
    #print(learned_separate)

    # Store the assertions in a brain.
    #Rensa = make_brain(learned)
    Rensa = make_brain(sum(learned_separate[key],[]))

    # Realize the assertions we learned.
    #print "Here's what I learned:"
    for a in Rensa.get_assertions():
        print " > " + a.realize(Rensa,False)
        #print " > "
        #print str(a.prettyprint())
        #print " > " + str(a)

    print "* * *\nProcess completed."

if __name__ == '__main__':
    #read a text file and separate to sentences
    #for number of sentences
    text_file = open("austen-sense_1.txt", "r")
    #print text_file.read()
    inputString = text_file.read()
    text_file.close()
    main(inputString)