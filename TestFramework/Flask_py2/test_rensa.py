import sys
import os
import pprint
sys.path.append(os.path.join(os.path.dirname(__file__), '.', 'src'))
from Brain import *
from ConceptExtractor import *
from small_functions import *

def rensa_test(input_file):
    print("\nPrepare to process "+input_file)
    text_file = open(input_file, "r")
    #print text_file.read()
    inputString = text_file.read()
    text_file.close()
    main(inputString)
    
def main(inputString):
    ''' Extract story assertions. '''
    # Here is an example string.
    string = inputString
    # Extract Rensa assertions with extract_story_concepts().
    
    ## remove this line for speed up process
    #print "I'm reading: " + string + "\n* * * "
    #learned = extract_story_concepts(string)
    #learned = extract_story_concepts_no_print(string)
    
    
    learned_separate = extract_story_concepts_separate(string)
    print("\n\n")
    pp = pprint.PrettyPrinter(indent=4)
    #pp.pprint(learned)
    
    #key = 'John'
    #'Elinor'
    #'Henry'
    current_assertion_list = {};
    json_data=open("austen-sense.json")
    jdata = json.load(json_data)
    
    record_story = [];
    
    for key in jdata.items():
        actor_key = str(key[0])
        #print(actor_key+"!")
    
        if actor_key in learned_separate:
            print("Actor: " +actor_key)

            ## brain
            Rensa = make_brain(sum(learned_separate[actor_key],[]))
            current_assertion_list = get_actor_assertions(actor_key, Rensa)
            #new_list = delete_assertion(current_assertion_list, Rensa)
            new_list = current_assertion_list
            file_name =actor_key+"_out.txt"
            target = open(file_name, 'w')
            for a in new_list:
                #assertion_index_dict[str(list_count)]
                target.write(json.dumps(a.realize(Rensa,False)))
                #print(str(a.prettyprint())+",  "+type(a.prettyprint()))
                target.write("\n")
                target.write(str(a.to_dict()['storypoints'][0]))
                #target.write("\n")
                #target.write(str(type(a.to_dict()['storypoints'][0]['at'])))                
                target.write("\n")
                temp_dict = {}
                temp_dict['at'] = a.to_dict()['storypoints'][0]['at']
                temp_dict['realize']=a.realize(Rensa,False)
                record_story.append(dict(temp_dict));
                
            target.close()
            #print(record_story)
            actor_json = open(actor_key+".json", 'w')
            actor_json.write(json.dumps([{"at": str(item['at']), "realize": item['realize']} for item in record_story]))
        #Rensa = make_brain(sum(learned_separate[key],[]))
    #print "* * *\nProcess completed."
    
def delete_assertion(old_list, Rensa):
    # this function keep reading user input to delete assertion_index_dict

    text = ""
    while text != "END" and len(old_list) > 0:
        print_asseartions(old_list, Rensa)
        print("\n enter numbers: ")
        text = raw_input()
        if text != "END":
            try:
                val = int(text)
                old_list.pop(int(text))
            except ValueError:
                print("That's not an int!")
        else:
            print("return new assertions!")

    new_list = old_list
    print_asseartions(new_list, Rensa)
    
    return new_list
    
def print_asseartions(current_list, Rensa):
    for i, j in enumerate(current_list):
        print("["+str(i)+"]: "+j.realize(Rensa,False))
        
def get_actor_assertions(actor_key, Rensa):


    # Realize the assertions we learned.
    #print "Here's what I learned:"
    file_name = actor_key+"_out.txt"
    #target = open(file_name, 'w')
    #for a in Rensa.get_assertions():
        #assertion_index_dict[str(list_count)]
        #target.write(json.dumps(a.realize(Rensa,False)))
        #target.write("\n")
        
    #target.close()
        
        #print " > " + a.realize(Rensa,False)
        #print " > "
        #print str(a.prettyprint())
        #print " > " + str(a)
    return Rensa.get_assertions()
    
    
if __name__ == '__main__':
    rensa_test("./Text_sample/austen-sense_1.txt")