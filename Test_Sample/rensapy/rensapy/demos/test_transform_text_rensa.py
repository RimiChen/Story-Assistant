'''
This example demonstrates how to extract simple Rensa assertions from natural text.
'''

print "Importing libraries..."
import sys
import os
memory_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'src'))
sys.path.insert(0, memory_path)
from Brain import *
from ConceptExtractor import *

def main():
    ''' Extract story assertions. '''
    # Here is an example string.
    string = "The family of Dashwood had long been settled in Sussex.\
            Their estate was large, and their residence was at Norland Park,in the centre of their property, where, for many generations, they had lived in so respectable a manner as to engage the general good opinion of their surrounding acquaintance.\
            The late owner of this estate was a single man, who lived to a very advanced age, and who for many years of his life, had a constant companion and housekeeper in his sister."

    # Extract Rensa assertions with extract_story_concepts().
    print "I'm reading: " + string + "\n* * * "
    learned = extract_story_concepts(string)

    # Store the assertions in a brain.
    Rensa = make_brain(learned)

    # Realize the assertions we learned.
    print "Here's what I learned:"
    for a in Rensa.get_assertions():
        #print " > " + a.realize(Rensa,False)
        print " > "
        print str(a.prettyprint())
        #print " > " + str(a)

    print "* * *\nProcess completed."

if __name__ == '__main__':
    main()
