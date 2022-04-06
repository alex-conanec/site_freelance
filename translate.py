#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys 
import json
from tracemalloc import stop
import requests
import getopt
import copy
import os


def main(content, target, output_file, lang_initial="fr", lang_to_trans="en"):
    """ Main program """
    
    data = copy.deepcopy(content)
    for key in target:
        data = data[key]

    
    _, result = translate(data, n = counter(data), j = 0, lang_initial=lang_initial, lang_to_trans=lang_to_trans)
    print("\n")

    if not lang_to_trans in content:
        content[lang_to_trans] = copy.deepcopy(content[lang_initial]) 
    
    if len(target) > 1:
        pointer_ini = content[lang_initial.lower()]
        pointer_new = content[lang_to_trans.lower()]

        for key in target[1:-1]:
            if not key in pointer_new:
                pointer_new[key] = pointer_ini[key]
            
            pointer_new = pointer_new[key]
            pointer_ini = pointer_ini[key]

        pointer_new[target[-1]] = result
    else:
        content[lang_to_trans] = result


    with open(output_file, 'w') as outfile:
        outfile.write(json.dumps(content, indent=4, ensure_ascii=False))


def translate(data, n, j, lang_initial="fr", lang_to_trans="en"):
    if isinstance(data, str):
        r = requests.get('https://api-free.deepl.com/v2/translate', data={"auth_key":deepl_key, "text":data, "target_lang": lang_to_trans.upper() })
        
        j+=1
        m = os.get_terminal_size()[0]-8
        if j/n*m < m-1:
            print(str(round(100*j/n)) + "% " + "#"*int(m*j/n) + ">" + " "*(m - 1 - int(m*j/n)) + "|", end="\r")
        else:
            print(str(round(100*j/n)) + "% " + "#"*m + "|", end="\r")
        
        if r.status_code == 200:
            return j, json.loads(r.content)["translations"][0]["text"]
        else:
            return j, "deepl request failed"


        # return j, data + " ### translated ### "

    elif isinstance(data, dict):
        for key in data.keys():
            if not key.upper() == key:
                j, data[key] = translate(data[key], n, j)
            
    elif isinstance(data, list):
        for i, elt in enumerate(data):
            j, data[i] = translate(elt, n, j)
    else:
        print("type inconnu : " + str(type(data)))

    return j, data


def counter(data, n = 0):
    
    if isinstance(data, str):
        return n + 1

    elif isinstance(data, dict):
        for key in data.keys():
            if not key.upper() == key:
                n = counter(data = data[key], n=n)
            
    elif isinstance(data, list):
        for i, elt in enumerate(data):
            n = counter(data = elt, n=n)
    else:
        print("type inconnu : " + str(type(data)))

    return n

if __name__ == "__main__":

    try:
        opts, args = getopt.getopt(sys.argv[1:], "f:o:T:", ["file=", "target"]) 
    except getopt.GetoptError:
        print("incorrect flag")
        sys.exit(2) 

    output_file = None
    for opt, arg in opts:                
        if opt in ("-f", "--file"):      
            filename = arg   
            print(filename)
        elif opt == "-o":      
            output_file = arg   
            print(output_file)
        elif opt in ("-T", "--target"):
            target = arg.split(" ")   
            for i, elt in enumerate(target):
                try:
                    target[i] = int(elt)
                except ValueError:
                    pass
         
        else:
            print("connais pas ton flag gros !")
            print(opt)
            sys.exit()

    
    try:
        if output_file is None:
            output_file = filename
    except NameError:
        raise NameError("filename must be enter with '-f <filepath>' or '--file=<filepath>'")


    with open(filename, 'r') as f:
        content = json.load(f)

    with open('src/.credentials.json', 'r') as f:
        deepl_key = json.load(f)["deepl_api_key"]


    main(content, target, output_file)